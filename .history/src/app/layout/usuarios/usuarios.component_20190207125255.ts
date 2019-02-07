import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  animations: [routerTransition()]
})
export class UsuariosComponent implements OnInit {
	itemsRef: AngularFireList<any>;
	items: Observable<any[]>;
	constructor(db: AngularFireDatabase) {
		this.itemsRef = db.list('Usuarios');
		this.items = this.itemsRef.snapshotChanges();
		this.items.forEach((usuario) => {
			console.log(usuario);
		});
	}
	ngOnInit() {}
}
