import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
	constructor(db: AngularFireDatabase, private modalService: NgbModal) {
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
		console.log(model.titulo, model.mensaje, model.tipo);
	}
	ngOnInit() {}
}
