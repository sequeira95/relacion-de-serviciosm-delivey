import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
porcentaje:number=70
  constructor(
    private router:Router,
    private usuarioService:UsuariosService,
    private loginService:LoginService
  ) { }

  ngOnInit(): void {  
    if(this.loginService.usuarioId){
      this.porcentaje = this.usuarioService.usuario.usuarioPorcentaje || 70
      return 
    }
    this.loginService.getAuth().subscribe(auth=>{
      if(auth && auth.email){
        this.loginService.usuarioId = auth.email
        this.usuarioService.getUsuarios().subscribe(e=>{
          this.usuarioService.usuario = e[0]
          this.porcentaje = this.usuarioService.usuario.usuarioPorcentaje || 70
      })
    

  }})}
  guardar(){
    let configuracion = {...this.usuarioService.usuario,usuarioPorcentaje:this.porcentaje}
    /*this.usuarioService.usuario
    configuracion.usuarioPorcentaje = this.porcentaje*/
    this.usuarioService.modificarPorcentaje(configuracion)
    this.router.navigate(['/'])
  }

}
