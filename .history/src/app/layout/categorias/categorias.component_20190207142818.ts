import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.scss'],
  animations: [routerTransition()]
})
export class ConductoresComponent implements OnInit {
	itemsRef: AngularFireList<any>;
	items: Observable<any[]>;
	constructor(db: AngularFireDatabase) {
		this.itemsRef = db.list('Proveedores');
		this.items = this.itemsRef.snapshotChanges(['child_added']);
		this.items.forEach((conductor) => {
			console.log(conductor);
		});
	}
	ngOnInit() {}
}
