import { style } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/model/servicio.model';
import { LoginService } from 'src/app/service/login.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {
  isLoggedIn: boolean
  loggedInUser:any
  constructor(
    private loginService:LoginService,
    private router:Router,
    private usuarioService:UsuariosService
  ) { }

  ngOnInit(){
    this.loginService.getAuth().subscribe(auth=>{
      if(auth && auth.email){
        this.loginService.usuarioId = auth.email
        this.isLoggedIn=true
        //this.loggedInUser=auth.email
        this.usuarioService.getUsuarios().subscribe(e=>{
          this.loggedInUser = `${e[0].nombre} ${e[0].apellido}`
          this.usuarioService.usuario = e[0]
        })
      }
      else{this.isLoggedIn=false}
    })
  }
  logout(){
    this.loginService.logout()
    this.isLoggedIn=false
    this.router.navigate(['/login'])
  }
  cerrarNavbar(){
    /*let ocultar:HTMLElement = document.getElementById("offcanvasNavbar") as HTMLElement
    ocultar.classList.remove('show')*/
    let cerrarNavbar:HTMLElement = document.getElementById("cerrarNavBar") as HTMLElement
    cerrarNavbar.click()
    let ocultarBody:HTMLElement = document.body as HTMLElement
    //ocultarBody.style ='' 
    

  }

}
