import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Subasta } from 'src/app/models/Subasta';
import { Producto } from 'src/app/models/Producto';
import { UserService } from 'src/app/services/user/user.service';
import { SubastaService } from 'src/app/services/subasta/subasta.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { HttpClient } from '@angular/common/http';
import { CreditoService } from 'src/app/services/credito/credito.service';
import { Credito } from 'src/app/models/Credito';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-panel-dashboard',
  templateUrl: './panel-dashboard.component.html',
  styleUrls: ['./panel-dashboard.component.css']
})
export class PanelDashboardComponent implements OnInit {
  user: User;
  userCreditInfo: Credito;
  subastasCreadas = 0;
  subastasCreadasArr: Subasta[];
  productosVendidos = 0;
  productosVendidosArr: Producto[];
  creditos = 0;
  inputCreditos = 0;
  
  constructor(private userService: UserService, private subastaService: SubastaService,
    private productsService: ProductoService, private creditoService: CreditoService, private http: HttpClient) {
    this.init();
  }

  ngOnInit(): void {
  }

  init() {
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (data) => {
        this.user = data;

        localStorage.setItem('token', this.user.token);

        this.creditoService.getCreditoByID(this.user.id).subscribe(
          (data: Credito) => {
            this.userCreditInfo = data;
            this.creditos = data.CantidadCredito;
          },
          (err) => {
            console.log(err);
          }
        )
        this.subastaService.countByUserId(this.user.id).subscribe(
          (data) => {
            this.subastasCreadas = data;
          },
          (err) => {
            console.log(err);
          }
        )
        this.productsService.countSoldProductsByUserId(this.user.id).subscribe(
          (data) => {
            this.productosVendidos = data;
          },
          (err) => {
            console.log(err);
          }
        )
        this.productsService.SoldProductsByUserId(this.user.id).subscribe(
          (data) => {
            this.productosVendidosArr = data;
          },
          (err) => {
            console.log(err);
          }
        )
        this.subastaService.getByUserId(this.user.id).subscribe(
          (data) => {
            this.subastasCreadasArr = data;
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

  updateCredit(form: NgForm) {
    const finalAmount = +this.userCreditInfo.CantidadCredito + +this.inputCreditos;
    this.creditoService.updateCreditoV2(this.userCreditInfo.idCredito, finalAmount)
    .subscribe(
      (data: Credito) => {
        this.creditos = finalAmount;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  misSubastas(){

  }

}
