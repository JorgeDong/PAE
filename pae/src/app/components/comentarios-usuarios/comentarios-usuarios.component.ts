import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { User } from '../../models/User';
import {UserService} from '../../services/user/user.service'
import {ComentarioService} from '../../services/comentario/comentario.service'
import { NgForm } from '@angular/forms';
import { Comentario } from '../../models/Comentario'
0
@Component({
  selector: 'app-comentarios-usuarios',
  templateUrl: './comentarios-usuarios.component.html',
  styleUrls: ['./comentarios-usuarios.component.css']
})
export class ComentariosUsuariosComponent implements OnInit {

  usuarioComentarios;

  comentarios = [];

  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private comentarioService: ComentarioService,
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

    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.usuarioComentarios = this.userService.getUserbyID(id).subscribe((res:any)=>{
      console.log(res[0])
      this.usuarioComentarios = res[0];
      let id = res[0].id;
      this.comentarioService.obtenerComentariosPorIdUsuario(id).subscribe((res:any)=>{
        res.forEach(element => {
          console.log(element)
          this.comentarios.push(element);
        });
      })


      // res.forEach(element => {
      //   console.log(element)
      //   this.usuarioComentarios = element;
      // });
    });
  }

  ngOnInit(): void {
  }


  subirComentario(form: NgForm){

    console.log(form.value);

    let newComentario = new Comentario(
      this.user.id,
      this.usuarioComentarios.id,
      0,
      form.value.comentario,
      "1",
      this.user.name
    );

    // this.ultimaPuja = form.value.CantidadPuja;

    this.comentarioService.subirComentario(newComentario).subscribe((res:any)=>{
      this.obtenerPujas(res.comentario.idUsuarioDestino_fk);
    })
    // this.pujaService.subirPuja(newPuja).subscribe((res:any)=>{
    //   console.log(res.puja.idSubasta_fk);
    //   console.log(res.puja.idSubasta_fk);
    //   this.obtenerPujas(res.puja.idSubasta_fk);
    // });


    // <input type="number" name="CantidadPuja" class=""  ngModel>
    // <input type="hidden" id="custId"  ngModel name="idSubasta_fk" value="{{productoActual.idProducto}}">
    // <input type="hidden" id="custId"  ngModel name="idUsuario_fk" value="{{user.id}}">
    // <input type="hidden" id="custId"  ngModel name="Usuario" value="{{user.name}}">


  }

  obtenerPujas(id){
    this.comentarios = [];
    this.comentarioService.obtenerComentariosPorIdUsuario(id).subscribe((res:any)=>{
      console.log(res)
      this.comentarios = res;
      // res.forEach(element => {
      //   console.log(element)
      //   this.pujas.push(element);
      // });
    });
  }

}
