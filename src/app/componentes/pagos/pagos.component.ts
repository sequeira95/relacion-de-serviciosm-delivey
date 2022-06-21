import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Pagos } from 'src/app/model/pagos.model';
import { PagoService } from 'src/app/service/pago.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  pageSize:number=5
  desde:number=0
  hasta:number=5
  length:number = 0
  pagosFiltrados:Pagos[]
  pagos:Pagos[]
  pago:Pagos={
  fecha:"",
  descripcion:"",
  saldo:0
  }
  @Output() pagosTotal = new EventEmitter<number>()


  @ViewChild('pagoForm') pagoForm:NgForm
  @ViewChild('cerrarPago') cerrarPago:ElementRef
  @ViewChild('table') table:ElementRef


  constructor(
    private pagoService:PagoService,
    private flashMessages:FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.pagoService.getPagos().subscribe(
      pagos=>{
        this.pagos=pagos
        const pagosDelMes = pagos.filter(saldo=>(new Date(saldo.fecha ||" ")).getMonth()===(new Date()).getMonth()) 
        this.length = pagosDelMes.length
        this.pagosFiltrados= pagosDelMes
        this.getPagoTotales()
      }
    )
  }
  getPagoTotales(){
    let pagosTotal:number=0
    if(this.pagos){
      this.pagos.forEach(pago=>{
        pagosTotal+=Number(pago.saldo)
      })
    }
    this.pagosTotal.emit(pagosTotal)
    return pagosTotal
  }
  agregar({value,valid}:{value:Pagos, valid:Boolean}){
    if(!valid){
      this.flashMessages.show('por favor llenar el formulario correctamente',{
        cssClass: "alert-danger", timeout:2000
      })
    }
    else{
      this.pagoService.agregarPagos(value)
      this.pagoForm.resetForm()
      this.cerrarPagoModal()
    }
}
private cerrarPagoModal(){
  this.cerrarPago.nativeElement.click()
}
cambiar(pagina:PageEvent){
  this.desde= pagina.pageIndex * pagina.pageSize
  this.hasta= this.desde + pagina.pageSize

}
filtro(event:any){
  const pagosDelMes = this.pagos.filter(
    saldo=>{
      const pagosFiltradosDelMes = ((new Date(`${event.target.value}-02`)).getMonth())
      return (new Date(saldo.fecha ||" ")).getMonth()===(pagosFiltradosDelMes)
    }
  )
  this.length= pagosDelMes.length
  this.pagosFiltrados = pagosDelMes 
}
exportToTable(){
  const table: XLSX.WorkSheet =XLSX.utils.table_to_sheet(this.table.nativeElement)
  const book: XLSX.WorkBook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(book, table,"servicios")
  XLSX.writeFile(book,"Servicios.xlsx")
}
}
