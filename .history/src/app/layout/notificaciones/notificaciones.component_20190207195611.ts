import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {WebserviceService} from '../../shared/services/webservice.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  animations: [routerTransition()]
})
export class NotificacionesComponent implements OnInit {
	itemsRef: AngularFireList<any>;
	items: Observable<any[]>;
	public titulo: string;
	public mensaje: string;
	public detalles: string;
	public tipo: string;
	constructor(private ws: WebserviceService, private db: AngularFireDatabase, private modalService: NgbModal) {
		this.itemsRef = db.list('Notificaciones');
		this.items = this.itemsRef.snapshotChanges(['child_added']);
		this.items.forEach((notificacion) => {
			console.log(notificacion);
		});
	}
	public open(content) {
		const model = this;
		model.modalService.open(content).result.then((result) => {

        }, (reason) => {

        });
	}
	public enviar() {
		const model = this;
		if (model.tipo && model.mensaje && model.detalles && model.tipo) {
			model.ws.enviarNotificacion(model.titulo, model.mensaje, model.detalles, model.tipo).subscribe((res) => {
				console.log(res);
				model.db.database.ref('/Notificaciones').push({
					titulo: model.titulo,
					mensaje: model.mensaje,
					detalle: model.detalles,
					tipo: model.tipo,
					fecha: new Date().getDate()
				}).then((res) => {
					console.log(res);
					model.cerrar('Notificacion enviada');

				});
			}, (error) => {
				console.log(error);
			});
		}
	}
	cerrar(razon) {
		const model = this;

    	model.modalService.dismissAll(razon);
    }
	ngOnInit() {}
}
