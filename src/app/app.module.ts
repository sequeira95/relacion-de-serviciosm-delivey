import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { EditarServicioComponent } from './componentes/editar-servicio/editar-servicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { ServicioService } from './service/servicio.service';
import { PagoService } from './service/pago.service';
import { EditarPagoComponent } from './componentes/editar-pago/editar-pago.component';
import { LoginService } from './service/login.service';
import { AuthGuard } from './guard/auth.guard';
import { UsuariosService } from './service/usuarios.service';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    PagosComponent,
    EditarServicioComponent,
    LoginComponent,
    PiePaginaComponent,
    TableroComponent,
    RegistroComponent,
    NoEncontradoComponent,
    ServiciosComponent,
    EditarPagoComponent,
    ConfiguracionComponent,
    PerfilComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore,'relacion-servicios'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    MatPaginatorModule,
    MatInputModule
  ],
  providers: [ServicioService,PagoService,LoginService,UsuariosService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
