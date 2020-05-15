import { Component, OnInit } from '@angular/core';
import { SubastaService } from '../../services/subasta/subasta.service';
import { ProductoService } from '../../services/producto/producto.service';
import { ImagenService } from '../../services/imagen/imagen.service';

@Component({
  selector: 'app-buscar-subasta',
  templateUrl: './buscar-subasta.component.html',
  styleUrls: ['./buscar-subasta.component.css']
})
export class BuscarSubastaComponent implements OnInit {

  productos = [];
  filtrados = [];

  busqueda = '';

  ruta;
  

  constructor(
    private subastaService: SubastaService,
    private  productoService: ProductoService,
    private imagenService: ImagenService
  ) {
      this.filtrados = [];
      this.productos = this.productoService.productos;
      
      this.ruta = this.imagenService.URL_API;
   }

  ngOnInit(): void {
    this.filtrados = this.productos.slice();
    this.search();
  }

  search(){
    console.log("ENTRE A BUSCAR");
    this.filtrados = this.productos.filter((product) => {
        return product.nombre.toUpperCase().includes(this.busqueda.toUpperCase()) ||
               product.marca.toUpperCase().includes(this.busqueda.toUpperCase()) ||
               product.descripcion.toUpperCase().includes(this.busqueda.toUpperCase())
      });
  }


  acomodarObjetos(){
    console.log('entro a acomodar')
    let objetosTotal = [];
    let objImagenes = [];
    // Ob
    this.subastaService.prodcutos.forEach(element => {
        let idProducto = element.idProducto;
        this.subastaService.imagenes.forEach(element => {
          if(idProducto == element.idProducto_fk){
            objImagenes.push(element);
            objetosTotal.push(element);
          }
        });
    });

    console.log(objImagenes);

    let objSubastas = [];
    this.subastaService.prodcutos.forEach(element => {
      console.log(element)
      let idProducto = element.idSubasta;
      this.subastaService.subastas.forEach(element => {
        if(idProducto == element.idProducto_fk) {
          console.log(element)
          objSubastas.push(element);
          objetosTotal.push(element);
        }
      });
    });

    console.log(objSubastas);

    let objPujas = [];
    this.subastaService.subastas.forEach(element => {
      console.log(element)
      let idSubasta = element.idSubasta;
      this.subastaService.pujas.forEach(element => {
        if(idSubasta == element.idSubasta_fk) {
          console.log(element)
          objPujas.push(element);
          objetosTotal.push(element);
        }
      });
    });

    console.log(objetosTotal);
  }


  regresarImagenesdeProductoId(id){
    let arr = [];
    this.subastaService.imagenes.forEach(element => {
        if(element.idProducto_fk == id){
          arr.push(element);
        }
      });
    return  arr;
  }

  regresarPujasdeSubastaId(id){
    let arr = [];
    this.subastaService.pujas.forEach(element => {
        if(element.idSubasta_fk == id){
          arr.push(element);
        }
      });
    return  arr;
  }

  regresarSubastadeProducto(id){
    let arr = [];
    this.subastaService.pujas.forEach(element => {
        if(element.idSubasta_fk == id){
          arr.push(element);
        }
      });
    return  arr;
  }









}
