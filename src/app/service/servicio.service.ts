import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Servicio } from "../model/servicio.model";
import { LoginService } from "./login.service";

@Injectable()
export class ServicioService {
    serviciosColeccion!: AngularFirestoreCollection<Servicio>; 
    servicioDoc!: AngularFirestoreDocument<Servicio>;
    servicios!: Observable<Servicio[]>;
    servicio!: Observable<Servicio>;

    constructor(private db:AngularFirestore, private loginServices:LoginService){
    }

    getServiciosCollection(){
        return this.serviciosColeccion=this.db.collection('servicios', ref=>ref.orderBy('fecha','desc').where("userEmail","==",this.loginServices.usuarioId))    
    }
    getServicios():Observable<Servicio[]>{
        this.servicios= this.getServiciosCollection().snapshotChanges().pipe(
            map(cambios=>{
                return cambios.map(accion=>{
                    let datos = accion.payload.doc.data() as Servicio
                    datos.id=accion.payload.doc.id
                    return datos
                })
            })
        )
        return this.servicios
    }
    agregarServicio(servicio:Servicio){
        servicio.saldo=(servicio.valorServicio || 0)*(servicio.porcentaje || 0)/100
        servicio.userEmail = this.loginServices.usuarioId
        this.getServiciosCollection().add(servicio)
    }

    getServicio(id:string):Observable<Servicio>{
        this.servicioDoc=this.db.doc<Servicio>(`servicios/${id}`)
        return this.servicio=this.servicioDoc.snapshotChanges().pipe(
            map(accion=>{
                if(accion.payload.exists===false){
                    return null
                }
                else{
                    let datos=accion.payload.data() as Servicio
                    datos.id= accion.payload.id
                    return datos as any
                }
            })
            )
    }
    modificar(servicio:Servicio){
        this.servicioDoc= this.db.doc(`servicios/${servicio.id}`)
        this.servicioDoc.update(servicio)
    }
    eliminarServicio(servicio:Servicio){
        this.servicioDoc=this.db.doc(`servicios/${servicio.id}`)
        this.servicioDoc.delete()
    }
}