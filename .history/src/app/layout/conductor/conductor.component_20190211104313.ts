/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WebserviceService } from "../../shared/services/webservice.service";
@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.scss'],
  animations: [routerTransition()]
})
export class ConductorComponent implements OnInit {
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

	//Vehiculo
	marca:string;
	referencia:string;
	modelo:string;
	placa:string;
	cilindraje:string;
	color:string;
	fechaSoat:string;


	//Docs subir
	tipoDoc:string;
	constructor(private ws: WebserviceService,private storage: AngularFireStorage,private modalService: NgbModal,private activatedRoute: ActivatedRoute, private db: AngularFireDatabase) {
		let model = this;
		model.activatedRoute.params.subscribe((params: Params) => {
			model.key = params['key'];
			console.log(model.key);
		});

		model.item = db.object('Proveedores/'+model.key).valueChanges();
		model.item.subscribe((res)=>{
			console.log(res);
			model.nombres = res.nombres+' '+res.apellidos;
			if(res.documentos){
				if(res.documentos.cedula){
					model.cedula = true;
				}
				if(res.documentos.conductor){
					model.foto = true;
				}
				if(res.documentos.licencia){
					model.licencia = true;
				}
				if(res.documentos.soat){
					model.soat = true;
				}
				if(res.documentos.tarjetaPropiedad){
					model.tarjetaPropiedad = true;
				}
				if(res.documentos.tarjetaAmarilla){
					model.tarjetaAmarilla = true;
				}
				if(res.documentos.tarjetaOperacion){
					model.tarjetaOperacion = true;
				}

			}
			if(res.vehiculo){
				if(res.vehiculo.marca){
					model.marca = res.vehiculo.marca;
				}
				if(res.vehiculo.referencia){
					model.referencia = res.vehiculo.referencia;
				}
				if(res.vehiculo.modelo){
					model.modelo = res.vehiculo.modelo;
				}
				if(res.vehiculo.placa){
					model.placa = res.vehiculo.placa;
				}
				if(res.vehiculo.cilindraje){
					model.cilindraje = res.vehiculo.cilindraje;
				}
				if(res.vehiculo.color){
					model.color = res.vehiculo.color;
				}
				if(res.vehiculo.fechaSoat){
					model.fechaSoat = res.vehiculo.fechaSoat;
				}

			}
			if(res.ubicacion){
				model.latitude = res.ubicacion.split(',')[0]*1;
				model.longitude = res.ubicacion.split(',')[1]*1;
				let mapProp = {
					center: new google.maps.LatLng(model.latitude,model.longitude),
					zoom: 16,
					mapTypeId: google.maps.MapTypeId.ROADMAP
			    };
			    model.map = new google.maps.Map(model.gmapElement.nativeElement, mapProp);
			    model.map.setCenter(new google.maps.LatLng(model.latitude,model.longitude));
			    
			    let posMar = {lat: model.latitude, lng: model.longitude};
				let marker = new google.maps.Marker({position: posMar, map: model.map});
			}
			
		});


		let itemsRef = db.list('conversaciones/'+model.key);
		model.mensajes = itemsRef.snapshotChanges();
		model.mensajes.forEach((mensaje)=>{
			console.log(mensaje);
		});



	}

	ngOnInit() {}
	open(content,tipo) {
		let model = this;
		let urlFile = 'uploads/documentos/'+model.key +'/'+tipo+ '.png';
		const ref = this.storage.ref(urlFile);
		console.log(urlFile);
 		model.urlDocumento = ref.getDownloadURL();
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openSubir(content) {
    	this.modalService.open(content).result.then((result) => {
            // this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    cerrar(razon) {
    	this.modalService.dismissAll(razon);
    }

    documentoSubido(event) {
    	let model = this;
    	console.log(event);
    	const file = event.file;
	    const filePath = 'uploads/documentos/'+model.key+'/'+model.tipoDoc+'.png';
	    const ref = model.storage.ref(filePath);
	    const task = ref.put(file);
	    alert('Archivo subido');
	    model.cerrar('Archivo subido');
    }


    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
    enviarMensaje() {
    	const model = this;
    	const itemsRef = model.db.list('conversaciones/' + model.key);
    	itemsRef.push({
    		de: 'admin',
    		fecha: + new Date(),
    		mensaje: model.mensaje
    	});

    	model.ws.notificarChatConductor(model.key,model.mensaje).subscribe((res) => {
			console.log('Conductor notificado para chat');
			console.log(res);
			model.mensaje = '';
		},(error) => {
			console.log('Error notificando');
			model.mensaje = '';
		});
    }

}
