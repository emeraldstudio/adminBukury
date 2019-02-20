import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { WebserviceService } from '../../shared/services/webservice.service';

@Component({
  selector: 'app-conductoredit',
  templateUrl: './conductoredit.component.html',
  styleUrls: ['./conductoredit.component.scss'],
  animations: [routerTransition()]
})
export class ConductoreditComponent implements OnInit {
	key: string;
	item: Observable<any>;

	// Campos a editar
	nombres: string;
	celular: string;
	estado: string;


	constructor(private location: Location, private activatedRoute: ActivatedRoute, private db: AngularFireDatabase, private ws: WebserviceService) {

		const model = this;
		model.activatedRoute.params.subscribe((params: Params) => {
			model.key = params['key'];
			console.log(model.key);
		});
		model.item = db.object('Proveedores/' + model.key).valueChanges();
		model.item.subscribe((res) => {
			console.log(res);
			model.nombres = res.nombres;
			model.estado = res.estado;
			model.celular = res.celular;

		});

	}

	ngOnInit() {

	}
	guardar() {
		const model = this;
		const itemRef = model.db.object('Proveedores/' + model.key);
		itemRef.update({
			nombres: model.nombres,
			estado: model.estado,
			celular: model.celular
		});
		if (model.estado === 'activo') {
			model.ws.notificarAceptado(model.key).subscribe((res)=> {
				console.log('Proveedor notificado');
				console.log(res);
				model.location.back();
			},(error)=> {
				console.log('Error notificando');
			});
		} else {
			model.location.back();
		}

	}

}
