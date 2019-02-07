import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { WebserviceService } from "../../shared/services/webservice.service";

@Component({
  selector: 'app-conductoredit',
  templateUrl: './conductoredit.component.html',
  styleUrls: ['./conductoredit.component.scss'],
  animations: [routerTransition()]
})
export class ConductoreditComponent implements OnInit {
	key:string;
	item: Observable<any>;

	//Campos a editar
	nombres:string;
	apellidos:string;
	celular:string;
	estado:string;
	saldo:number;


	constructor(private location: Location,private activatedRoute: ActivatedRoute, private db: AngularFireDatabase, private ws: WebserviceService) {
		
		let model = this;
		model.activatedRoute.params.subscribe((params: Params) => {
			model.key = params['key'];
			console.log(model.key);
		});
		model.item = db.object('conductores/'+model.key).valueChanges();
		model.item.subscribe((res)=>{
			console.log(res);
			model.nombres = res.nombres;
			model.apellidos = res.apellidos;
			model.estado = res.estado;
			model.celular = res.celular;
			model.saldo = res.saldo;
			
		});

	}

	ngOnInit() {
          
	}
	guardar(){
		let model = this;
		const itemRef = model.db.object('conductores/'+model.key);
		itemRef.update({
			nombres:model.nombres,
			apellidos:model.apellidos,
			estado:model.estado,
			celular:model.celular,
			saldo:model.saldo
		});
		if(model.estado=='aprobado'){
			model.ws.notificarAceptado(model.key).subscribe((res)=>{
				console.log('Conductor notificado');
				console.log(res);
				model.location.back();
			},(error)=>{
				console.log('Error notificando');
			});
		}else{
			model.location.back();
		}
		
	}

}
