import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string
  password:string
  constructor(
    private router:Router,
    private flashMessages:FlashMessagesService,
    private loginService:LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.router.navigate(['/'])
      }
    })

  }
  login(){
    this.loginService.login(this.email,this.password)
    .then((res:any)=>{
      this.loginService.usuarioId = res.user.email || ""
      this.router.navigate(['/'])
              })
    .catch(error=>{
      this.flashMessages.show(error.messages||"Usuario o Contraseña incorrectos",{
        cssClass:"alert-danger", timeout:2000
      })
    })
  }
}
