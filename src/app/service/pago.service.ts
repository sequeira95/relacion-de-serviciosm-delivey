import { Injectable } from "@angular/core"
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { Pagos } from "../model/pagos.model"
import { LoginService } from "./login.service"

@Injectable()
export class PagoService{
    pagosColeccion!:AngularFirestoreCollection<Pagos>
    pagoDoc!:AngularFirestoreDocument<Pagos>
    pagos!:Observable<Pagos[]>
    pago!:Observable<Pagos>
    constructor(private db:AngularFirestore, private loginServices:LoginService){
    }

    getServiciosCollection(){
    return this.pagosColeccion=this.db.collection('pagos', ref=>ref.orderBy('fecha','asc').where("userEmail","==",this.loginServices.usuarioId))

    }
    getPagos():Observable<Pagos[]>{
        this.pagos=this.getServiciosCollection().snapshotChanges().pipe(
            map(cambios=>{
                return cambios.map(accion=>{
                    let datos = accion.payload.doc.data() as Pagos
                    datos.id=accion.payload.doc.id
                    return datos
                })
            })
        )
        return this.pagos
    }

    agregarPagos(pago:Pagos){
        pago.userEmail = this.loginServices.usuarioId

        this.getServiciosCollection().add(pago)
        
    }
    getpago(id:string):Observable<Pagos>{
        this.pagoDoc=this.db.doc<Pagos>(`pagos/${id}`)
        return this.pago=this.pagoDoc.snapshotChanges().pipe(
            map(accion=>{
                if(accion.payload.exists===false){
                    return null
                }
                else{
                    let datos=accion.payload.data() as Pagos
                    datos.id=accion.payload.id
                    return datos as any
                }
            })
        )
    }
    modificar(pago:Pagos){
        this.pagoDoc=this.db.doc(`pagos/${pago.id}`)
        this.pagoDoc.update(pago)
    }
    eliminarPago(pago:Pagos){
        this.pagoDoc=this.db.doc(`pagos/${pago.id}`)
        this.pagoDoc.delete()
    }


}

