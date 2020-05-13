import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen/imagen.service';
import { ProductoService } from '../../services/producto/producto.service';
import { ActivatedRoute,Router } from '@angular/router';

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

  constructor(
    private imagenService: ImagenService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductoService
  ) { 
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




}
