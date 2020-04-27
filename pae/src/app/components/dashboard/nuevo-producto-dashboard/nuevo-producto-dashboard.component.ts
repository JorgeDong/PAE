import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-producto-dashboard',
  templateUrl: './nuevo-producto-dashboard.component.html',
  styleUrls: ['./nuevo-producto-dashboard.component.css']
})
export class NuevoProductoDashboardComponent implements OnInit {

  image; 
  image1;
  image2;  
  src;
  src1;
  src2;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
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
      formData.append("idProducto_fk","1");
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
      formData.append("idProducto_fk","1");
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
      formData.append("idProducto_fk","1");
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


  uploadImage(form: NgForm){

    let formData = new FormData();
    formData.append("image",this.image);
    formData.append("image1",this.image1);
    formData.append("image2",this.image2);
    formData.append("desc",form.value.desc);
    console.log(formData);
    //this.http.post('http://localhost:3000/upload',formData)
    //.subscribe((res)=> console.log(res));
  }




}
