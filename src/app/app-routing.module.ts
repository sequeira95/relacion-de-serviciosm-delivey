import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarPagoComponent } from './componentes/editar-pago/editar-pago.component';
import { EditarServicioComponent } from './componentes/editar-servicio/editar-servicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: "", component: TableroComponent,canActivate:[AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "registrarse", component: RegistroComponent},
  {path: "configuracion", component: ConfiguracionComponent,canActivate:[AuthGuard]},
  {path: "perfil", component: PerfilComponent,canActivate:[AuthGuard]},
  {path: "servicios/editar/:id", component: EditarServicioComponent,canActivate:[AuthGuard]},
  {path: "pagos/editar/:id", component: EditarPagoComponent,canActivate:[AuthGuard]},
  {path: "**", component: NoEncontradoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
