/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WebserviceService } from "../../shared/services/webservice.service";
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  animations: [routerTransition()]
})
export class CategoriaComponent implements OnInit {
	@ViewChild('gmap') gmapElement: any;
	closeResult: string;
	map: google.maps.Map;
	idRuta:string;
	latitude:number=4.630399;
	longitude:number=-74.091343;
	key:string;
	item: Observable<any>;
	servicios: Observable<any[]>;
	itemsRef: AngularFireList<any>;
	servicio:string;
	valor:string;

	constructor(private ws: WebserviceService,private storage: AngularFireStorage,private modalService: NgbModal,private activatedRoute: ActivatedRoute, private db: AngularFireDatabase) {
		let model = this;
		model.activatedRoute.params.subscribe((params: Params) => {
			model.key = params['key'];
			console.log(model.key);
		});
		model.item = db.object('Categorias/'+model.key).valueChanges();
		model.item.subscribe((res)=>{
			this.consultarServicios();
			
		});

	}

	consultarServicios(){
		let model = this;
		model.itemsRef = model.db.list('Categorias/'+model.key+"/servicios");
		model.servicios = model.itemsRef.snapshotChanges(['child_added']);
		model.servicios.forEach((categoria) => {
			console.log(categoria);
		});
	}

	ngOnInit() {}
	open(content) {
		let model = this;
		model.modalService.open(content).result.then((result) => {

        }, (reason) => {

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

    crearServicio() {
		const model = this;
		if (model.servicio && model.valor) {
			model.db.database.ref('/Categorias/'+model.key+'/servicios').push({
				servicio: model.servicio,
				valor: model.valor
				// imagen:
			}).then((res) => {
				console.log(res);
				model.cerrar('servicio creada');

			});
		}
		console.log('Creando');
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
}
