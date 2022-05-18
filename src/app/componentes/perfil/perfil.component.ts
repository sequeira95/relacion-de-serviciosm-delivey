import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/registro.model';
import { LoginService } from 'src/app/service/login.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    datosUsuario:Usuario={
      nombre:"",
      apellido:"",
      email:"",
      usuario:"",
      password:"",
      uid:""
    }

    constructor(
    private router:Router,
    private usuarioService:UsuariosService,
    private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth && auth.email){
        this.loginService.usuarioId = auth.email
        this.usuarioService.getUsuarios().subscribe(e=>{
          this.usuarioService.usuario = e[0]
          this.datosUsuario= this.usuarioService.usuario
      })
    

  }})}
}