import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';
import { Servicio } from 'src/app/model/servicio.model';
import { ServicioService } from 'src/app/service/servicio.service';
import { UsuariosService } from 'src/app/service/usuarios.service';


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  pageSize:number=5
  desde:number=0
  hasta:number=5
  servicios:Servicio[]
  serviciosFiltrados:Servicio[]
  length:number = 0
  servicio: Servicio={
    fecha:"",
    descripcion:"",
    valorServicio:null,
    porcentaje:0,
    saldo: 0
  }
  @Output() saldoTotal = new EventEmitter<number>()

  @ViewChild('servicioForm') servicioForm:NgForm
  @ViewChild('botonCerrar') botonCerrar:ElementRef

  constructor(
    private servicioService:ServicioService,
    private flashMessages:FlashMessagesService,
    private usaurioService:UsuariosService
  ) {}
  

  ngOnInit(): void {
    this.servicioService.getServicios().subscribe(
      servicios=>{
        this.servicios=servicios
        const serviciosDelMes = servicios.filter(s=>(new Date(s.fecha || "" )).getMonth()=== (new Date()).getMonth())
        this.length = serviciosDelMes.length
        this.serviciosFiltrados=serviciosDelMes
        this.getServiciosTotales()
        this.servicio.porcentaje = this.usaurioService.usuario.usuarioPorcentaje || 70
      }
      )
  }
  getServiciosTotales(){
    let saldoTotal:number=0
    if(this.servicios){
      this.servicios.forEach(servicio=>{
        saldoTotal+=Number(servicio.saldo)
      })
    }
    this.saldoTotal.emit(saldoTotal)
    return saldoTotal
  }
    agregar({value,valid}:{value:Servicio, valid:Boolean}){
      if(!valid){
        this.flashMessages.show('por favor llenar el formulario correctamente',{
          cssClass: "alert-danger", timeout:2000
        })
      }
      else{
        this.servicioService.agregarServicio(value)
        this.servicioForm.resetForm({
          fecha:"",
          descripcion:"",
          valorServicio:null,
          porcentaje:this.usaurioService.usuario.usuarioPorcentaje || 70,
          saldo: 0
        })
        this.cerrarModal()

      }
      
  }
  private cerrarModal(){
    this.botonCerrar.nativeElement.click()
  }
  cambiar(pagina:PageEvent){
    this.desde= pagina.pageIndex * pagina.pageSize
    this.hasta= this.desde + pagina.pageSize

  }
  filtro(event:any){
    const serviciosDelMes = this.servicios.filter(
      s=>
      {
        const fechaMesdeFiltro = ((new Date(`${event.target.value}-02`)).getMonth() ) 
        return (new Date(s.fecha || "" )).getMonth() === (fechaMesdeFiltro)
      }
      )
    this.length = serviciosDelMes.length
    this.serviciosFiltrados=serviciosDelMes
    
  }
}


