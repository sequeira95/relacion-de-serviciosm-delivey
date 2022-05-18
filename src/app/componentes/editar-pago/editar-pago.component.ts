import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Pagos } from 'src/app/model/pagos.model';
import { PagoService } from 'src/app/service/pago.service';

@Component({
  selector: 'app-editar-pago',
  templateUrl: './editar-pago.component.html',
  styleUrls: ['./editar-pago.component.css']
})
export class EditarPagoComponent implements OnInit {
  pago:Pagos={
    fecha:"",
    descripcion:"",
    saldo:0
  }
  id:string
  
  constructor(
    private pagoService:PagoService,
    private flashMessages:FlashMessagesService,
    private router:Router,
    private route:ActivatedRoute
) { }

ngOnInit(): void {
  this.id=this.route.snapshot.params['id']
  this.pagoService.getpago(this.id).subscribe(pago=>{
    this.pago=pago
  })
}
guardar({value,valid}:{value:Pagos, valid:Boolean}){
  if(!valid){
    this.flashMessages.show('por favor llenar el formulario correctamente',{
      cssClass: "alert-danger", timeout:2000
    })
  }
  else{
    value.id=this.id
    //modificar clientes
    this.pagoService.modificar(value)
    this.router.navigate(['/'])
  }
}
eliminar(){
  if(confirm('seguro que de desea eliminar el cliente?')){
    this.pagoService.eliminarPago(this.pago)
    this.router.navigate(['/'])
  }

}


}
