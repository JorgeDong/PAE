import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from '../../services/user/user.service';
import { SubastaService } from '../../services/subasta/subasta.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  subastasCreadas = 0;
  objetosVendidos = 0;
  algomas = 0;

  image; 
  image1;
  image2;  
  src;
  src1;
  src2;

  idActual;

  constructor(private userService: UserService, private subastaService: SubastaService, private productsService: ProductoService, private http: HttpClient) { 
    this.init()
  }

  ngOnInit(): void {
  }

  init(){
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (data) => {
        this.user = data;
        this.subastaService.countByUserId(this.user.id).subscribe(
          (data) => {
            this.subastasCreadas = data;
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        )
        this.productsService.countSoldProductsByUserId(this.user.id).subscribe(
          (data) => {
            this.objetosVendidos = data;
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        )
      },
      (err) => {
        console.log(err);
      }
    )
  }

  obtenerImage(event,id){
    if(id == 1){
      this.image = event.target.files[0];
      let reader = new FileReader();
      reader.onloadend = ()=>{
        this.src = reader.result;
      }
      reader.readAsDataURL(this.image);
      let formData = new FormData();
      formData.append("image",this.image);
      formData.append("idProducto_fk",this.idActual);
      formData.append("descripcion","Descripcion");

    this.http.post('http://localhost:3000/api/imagen',formData)
    .subscribe((res)=> console.log(res));

    }else if(id == 2){
      this.image1 = event.target.files[0];
      let reader = new FileReader();
      reader.onloadend = ()=>{
        this.src1 = reader.result;
      }
      reader.readAsDataURL(this.image1);
      let formData = new FormData();
      formData.append("image",this.image1);
      formData.append("idProducto_fk",this.idActual);
      formData.append("descripcion","Descripcion");

    this.http.post('http://localhost:3000/api/imagen',formData)
    .subscribe((res)=> console.log(res));
    }else{
      this.image2 = event.target.files[0];
      let reader = new FileReader();
      reader.onloadend = ()=>{
        this.src2 = reader.result;
      }
      reader.readAsDataURL(this.image2);
      let formData = new FormData();
      formData.append("image",this.image2);
      formData.append("idProducto_fk",this.idActual);
      formData.append("descripcion","Descripcion");

    this.http.post('http://localhost:3000/api/imagen',formData)
    .subscribe((res)=> console.log(res));
    }


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

}
