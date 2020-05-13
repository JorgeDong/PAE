import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen/imagen.service';
import { ProductoService } from '../../services/producto/producto.service';
import { ActivatedRoute,Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service'
import { NgForm } from '@angular/forms';
import { Puja } from '../../models/Puja';
import {PujaService } from '../../services/puja/puja.service';

@Component({
  selector: 'app-subasta-detalle',
  templateUrl: './subasta-detalle.component.html',
  styleUrls: ['./subasta-detalle.component.css']
})
export class SubastaDetalleComponent implements OnInit {

  imagenes = [];
  ruta;
  primeraImagen;

  productoActual;

  user: User;
  pujas = [];

  ultimaPuja = "";

  constructor(
    private imagenService: ImagenService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductoService,
    private userService: UserService,
    private pujaService: PujaService
  ) {

    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user)
      },
      (err) => {
        console.log(err);
      }
    )

    this.ruta = this.imagenService.URL_API;
    console.log(this.router.url)
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.imagenService.obtenerImagenesIdProducto(id).subscribe((res:any)=>{
      console.log(res);
        res.forEach(element => {
          console.log(element)
          this.imagenes.push(element);
        });
        this.primeraImagen = this.imagenes[0];
    });

    this.productService.obtenerProductoId(id).subscribe((res:any)=>{
      console.log(res);
      this.productoActual = res.pop();
    });

    this.obtenerPujas(id);
    // let pujaTemp = this.pujas.pop();
    // this.ultimaPuja = pujaTemp.CantidadPuja;
    // this.pujas.push(pujaTemp);
  }

  ngOnInit(): void {
    //this.startTimer();
  }

  timeLeft: number = 60;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }


  subirPuja(form: NgForm){
    console.log(form.value);
    let newPuja = new Puja(
      this.productoActual.idProducto,
      this.user.id,
      form.value.CantidadPuja,
      this.user.name
    );

    this.ultimaPuja = form.value.CantidadPuja;

    this.pujaService.subirPuja(newPuja).subscribe((res:any)=>{
      console.log(res.puja.idSubasta_fk);
      console.log(res.puja.idSubasta_fk);
      this.obtenerPujas(res.puja.idSubasta_fk);
    });


    // <input type="number" name="CantidadPuja" class=""  ngModel>
    // <input type="hidden" id="custId"  ngModel name="idSubasta_fk" value="{{productoActual.idProducto}}">
    // <input type="hidden" id="custId"  ngModel name="idUsuario_fk" value="{{user.id}}">
    // <input type="hidden" id="custId"  ngModel name="Usuario" value="{{user.name}}">


  }

  obtenerPujas(id){
    this.pujas = [];
    this.pujaService.obtenerPujasPorIdProducto(id).subscribe((res:any)=>{
      console.log(res)
      this.pujas = res;
      // res.forEach(element => {
      //   console.log(element)
      //   this.pujas.push(element);
      // });
    });
  }



}
