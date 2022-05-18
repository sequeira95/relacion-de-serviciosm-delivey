import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Usuario } from "../model/registro.model";
import { LoginService } from "./login.service";

@Injectable()
export class UsuariosService{
    usuariosColeccion!: AngularFirestoreCollection<Usuario>; 
    usuarioDoc!: AngularFirestoreDocument<Usuario>;
    usuarios!: Observable<Usuario[]>;
    usuario: Usuario;

    
    constructor(private db:AngularFirestore, private loginServices:LoginService){}

    getUsuariosCollection(){
        return this.usuariosColeccion=this.db.collection('usuarios',ref=>ref.where("email","==",this.loginServices.usuarioId))    
    }
    
    getUsuarios():Observable<Usuario[]>{
        this.usuarios= this.getUsuariosCollection().snapshotChanges().pipe(
            map(cambios=>{
                return cambios.map(accion=>{
                    let datos=accion.payload.doc.data() as Usuario
                    datos.uid=accion.payload.doc.id
                    return datos
                })
            })
        )
        return this.usuarios
    }
    agregarUsuario(usuario:Usuario){
        this.db.collection(`usuarios`).add(usuario)   
    }
    modificarPorcentaje(usuario:Usuario){
    this.usuarioDoc = this.db.doc(`usuarios/${usuario.uid}`)
    this.usuarioDoc.update(usuario)
    }

}