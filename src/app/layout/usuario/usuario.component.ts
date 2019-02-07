/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  animations: [routerTransition()]
})
export class UsuarioComponent implements OnInit {
	@ViewChild('gmap') gmapElement: any;
	closeResult: string;
	map: google.maps.Map;
	idRuta:string;
	latitude:number=4.630399;
	longitude:number=-74.091343;
	key:string;
	item: Observable<any>;
	cedula:boolean=false;
	foto:boolean=false;
	licencia:boolean=false;
	soat:boolean=false;
	tarjetaPropiedad:boolean=false;
	tarjetaAmarilla:boolean=false;
	tarjetaOperacion:boolean=false;
	urlDocumento:Observable<any>;
	mensajes: Observable<any>;
	nombres:string;
	mensaje:string;
	constructor(private storage: AngularFireStorage,private modalService: NgbModal,private activatedRoute: ActivatedRoute, private db: AngularFireDatabase) {
		let model = this;
		model.activatedRoute.params.subscribe((params: Params) => {
			model.key = params['key'];
			console.log(model.key);
		});

		model.item = db.object('usuarios/'+model.key).valueChanges();
		model.item.subscribe((res)=>{
			console.log(res);
			model.nombres = res.nombres;
			
		});


		let itemsRef = db.list('conversaciones/'+model.key);
		model.mensajes = itemsRef.snapshotChanges();
		model.mensajes.forEach((mensaje)=>{
			console.log(mensaje);
		});



	}

	ngOnInit() {}
	
    enviarMensaje(){
    	let model = this;
    	const itemsRef = model.db.list('conversaciones/'+model.key);
    	itemsRef.push({ 
    		de: 'admin',
    		fecha: + new Date(),
    		mensaje: model.mensaje
    	});
    	model.mensaje = '';
    }

}
