import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Servicio } from 'src/app/model/servicio.model';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {
  servicio: Servicio={
    fecha:"",
    descripcion:"",
    valorServicio:0,
    porcentaje:0,
    saldo:0
  }
  id:string

  constructor(
    private servicioService:ServicioService,
    private flashMessages:FlashMessagesService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id']
    this.servicioService.getServicio(this.id).subscribe(servicio=>{
      this.servicio=servicio
    })
  }
  guardar({value,valid}:{value:Servicio, valid:Boolean}){
    if(!valid){
      this.flashMessages.show('por favor llenar el formulario correctamente',{
        cssClass: "alert-danger", timeout:2000
      })
    }
    else{
      //let servicioCompleto = `${this.servicio.descripcion,this.servicio.fecha,this.servicio.id,this.servicio.porcentaje,this.servicio.valorServicio,this.servicio.saldo}`
      value.id= this.servicio.id
      this.servicioService.modificar(value)
      console.log(value)
      this.router.navigate(['/'])
    }
  }
  eliminar(){
    if(confirm('seguro que de desea eliminar el cliente?')){
      this.servicioService.eliminarServicio(this.servicio)
      this.router.navigate(['/'])
    }

  }
}
