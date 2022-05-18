import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  serviciosTotal:number
  pagosTotal:number
  totalSaldo:number
  constructor() { }

  ngOnInit(): void {
  }
  getSaldo(saldo:number){
    this.serviciosTotal = saldo
  }
  getPagos(saldo:number){
    this.pagosTotal=saldo
    
  }
  getSaldoTotal(){
    return this.serviciosTotal-this.pagosTotal
    
  }
}
