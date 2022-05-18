import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Usuario } from 'src/app/model/registro.model';
import { LoginService } from 'src/app/service/login.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuarios:Usuario[]
  usuario:Usuario={
    usuario:"",
    nombre:"",
    apellido:"",
    email:"",
    password:"",
    uid:"",

  }
  constructor(
    private router:Router,
    private flashmessages:FlashMessagesService,
    private loginService:LoginService,
    private usuarioService:UsuariosService
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.router.navigate(['/'])
      }
    })
    this.usuarioService.getUsuarios().subscribe(
      usuarios=>{this.usuarios=usuarios}
    )
  }
  registro(){
    this.loginService.registrarse(this.usuario)
    .then((res:any)=>{
      if(res){
        const usuario:Usuario = {
          ...this.usuario,
          uid:res.user.uid,
          
        } 
        this.usuarioService.agregarUsuario(usuario)
      }
      //this.router.navigate(['/'])
      
    })
    
    .catch(error=>{
      this.flashmessages.show(error.messages,{
        cssClass: 'alert-danger', timeout:2000
      })
    })
  }
  }

