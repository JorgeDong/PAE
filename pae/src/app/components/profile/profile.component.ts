import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from '../../services/user/user.service';
import { SubastaService } from '../../services/subasta/subasta.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Subasta } from 'src/app/models/Subasta';
import { Producto } from 'src/app/models/Producto';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  router: string;
  user: User;
  subastasCreadas = 0;
  subastasCreadasArr: Subasta[];
  productosVendidos = 0;
  productosVendidosArr: Producto[];
  isEdit = false;

  inputName = '';
  inputDireccion = '';
  inputCity = '';
  inputCountry = '';

  isGoogleAccount: boolean;
  alertEmptyValues = true;

  image;
  image1;
  image2;
  src;
  src1;
  src2;

  idActual;

  constructor(private userService: UserService,
              private subastaService: SubastaService,
              private productsService: ProductoService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private _ROUTER: Router,
              private authService: AuthService) {
    this.init();
    this.router = _ROUTER.url;
    if (this.router.includes('edit')) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  ngOnInit(): void {
  }

  init() {
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (data) => {
        this.user = data;

        this.inputName = this.user.name;
        this.inputDireccion = this.user.direccion;
        this.inputCity = this.user.city;
        this.inputCountry = this.user.country;

        if (this.user.imageUrl === '') {
          this.isGoogleAccount = false;
        } else {
          this.isGoogleAccount = true;
        }

        localStorage.setItem('token', this.user.token);

        this.subastaService.countByUserId(this.user.id).subscribe(
          dataCreadas => this.subastasCreadas = dataCreadas,
          err => console.log(err)
        );
        this.productsService.countSoldProductsByUserId(this.user.id).subscribe(
          dataVendidos => this.productosVendidos = dataVendidos,
          err => console.log(err)
        );
        this.productsService.SoldProductsByUserId(this.user.id).subscribe(
          dataProductos => this.productosVendidosArr = dataProductos,
          err => console.log(err)
        );
        this.subastaService.getByUserId(this.user.id).subscribe(
          dataSubastas => this.subastasCreadasArr = dataSubastas,
          err => console.log(err)
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  obtenerImage(event) {
      this.image1 = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.src1 = reader.result;
      };
      reader.readAsDataURL(this.image1);
      const formData = new FormData();
      formData.append('image', this.image1);
      formData.append('idProducto_fk', '' + this.user.id);
      formData.append('descripcion', 'profile');

      this.http.post('http://localhost:3000/api/imagen', formData).subscribe(
        (res) => console.log(res)
      );

    // this.image = event.target.files[0];
    // console.log(event.target.files);
    // console.log(this.image);

    // let reader = new FileReader();
    // reader.onloadend = ()=>{
    //   if(id == 1){
    //     this.src = reader.result;
    //   }else if(id == 2){
    //     this.src1 = reader.result;
    //   }else{
    //     this.src2 = reader.result;
    //   }
    // }
    // reader.readAsDataURL(this.image);
  }

  submitChanges(form: NgForm) {
    if (form.valid) {
      console.log(this.user.token === localStorage.getItem('token'));
      this.userService.updateUser(
                this.user.email,
                this.inputName,
                this.inputDireccion,
                this.inputCity,
                this.inputCountry,
                this.user.token).subscribe(
          (data) => this._ROUTER.navigate(['profile']),
          (err) => console.log(err)
      );
    } else {
      this.alertEmptyValues = false;
    }
  }

  redirectEditarPerfil() {
    this._ROUTER.navigate(['profile/edit']);
  }
  redirectChangePass() {
    localStorage.setItem('redirectFromLogin', 'false');
    this._ROUTER.navigate(['profile/change-pass']);
  }
  redirectLogOut() {
    this.authService.logOut();
  }

  close() {
    this.alertEmptyValues = true;
  }

}
