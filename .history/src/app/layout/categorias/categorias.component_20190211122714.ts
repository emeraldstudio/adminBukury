import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { AngularFireStorage} from '@angular/fire/storage';
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
	constructor(private storage: AngularFireStorage, private modalService: NgbModal, private db: AngularFireDatabase) {
		this.itemsRef = db.list('Categorias');
		this.items = this.itemsRef.snapshotChanges(['child_added']);
		this.items.forEach((categoria) => {
			console.log(categoria);
		});
	}
	open(content) {
		const model = this;
		model.modalService.open(content).result.then((result) => {

        }, (reason) => {

        });
	}
	public crearCategoria() {
		const model = this;
		if (model.categoria && model.imagen) {
			console.log(model.storage.ref('categorias/' + model.categoria + '.png').getDownloadURL());
			model.db.database.ref('/Categorias').push({
				categoria: model.categoria,
				imagen: 'categorias/' + model.categoria + '.png',
				// imagen:
			}).then((res) => {
				console.log(res);
				model.cerrar('Categoria creada');

			});
		}
		console.log('Creando');
	}
	cerrar(razon) {
		const model = this;

		model.modalService.dismissAll(razon);
	}
	documentoSubido(event) {
		const model = this;
		console.log(event);
		const file = event.file;
		const filePath = 'categorias/' + model.categoria + '.png';
		const ref = model.storage.ref(filePath);
		const task = ref.put(file).then((res) => {
			alert('Archivo subido' + ref.getDownloadURL());
			ref.getDownloadURL().subscribe((url) => {
				console.log(url);
				model.imagen = url;
			});
		});

	}
	ngOnInit() {}
}
