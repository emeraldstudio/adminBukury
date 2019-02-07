import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  animations: [routerTransition()]
})
export class CategoriasComponent implements OnInit {
	itemsRef: AngularFireList<any>;
	items: Observable<any[]>;
	constructor(db: AngularFireDatabase) {
		this.itemsRef = db.list('Categorias');
		this.items = this.itemsRef.snapshotChanges(['child_added']);
		this.items.forEach((categoria) => {
			console.log(categoria);
		});
	}
	ngOnInit() {}
}
