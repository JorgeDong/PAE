import { Component, OnInit } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen/imagen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productos = [];
  ruta;

  constructor(private imagenService: ImagenService, private router: Router, private route: ActivatedRoute, private productService: ProductoService) { 
    this.productos = this.productService.productos;
    this.ruta = this.imagenService.URL_API;
  }

  ngOnInit(): void {
  }

}
