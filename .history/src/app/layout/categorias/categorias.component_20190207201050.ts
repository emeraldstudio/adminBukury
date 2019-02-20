import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  animations: [routerTransition()]
})
export class CategoriasComponent implements OnInit {
	itemsRef: AngularFireList<any>;
	items: Observable<any[]>;
	public categoria: string;
	public imagen: string;
	constructor(private modalService: NgbModal, private db: AngularFireDatabase) {
		this.itemsRef = db.list('Categorias');
		this.items = this.itemsRef.snapshotChanges(['child_added']);
		this.items.forEach((categoria) => {
			console.log(categoria);
		});
	}
	public crear() {
		const model = this;
		if (model.categoria && model.imagen) {
			model.db.database.ref('/Categorias').push({
				categoria: model.categoria,
				imagen: model.imagen,
			}).then((res) => {
				console.log(res);
				model.cerrar('Categoria creada');

			});
		}
	}
	cerrar(razon) {
		const model = this;

    	model.modalService.dismissAll(razon);
    }
	ngOnInit() {}
}
