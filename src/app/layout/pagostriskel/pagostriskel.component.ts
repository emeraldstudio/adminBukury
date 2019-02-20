import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagostriskel',
  templateUrl: './pagostriskel.component.html',
  styleUrls: ['./pagostriskel.component.scss'],
  animations: [routerTransition()]
})
export class PagostriskelComponent implements OnInit {
	itemsRef: AngularFireList<any>;
	items: Observable<any[]>;
	public categoria: string;
	public imagen: string;
	constructor(private storage: AngularFireStorage, private modalService: NgbModal, private db: AngularFireDatabase) {
		this.itemsRef = db.list('PagosTriskel');
		this.items = this.itemsRef.snapshotChanges(['child_added']);
		this.items.forEach((pago) => {
			console.log(pago);
		});
	}
	cambiarEstado(key,estado){
		console.log(key);
		console.log(estado);
		const model = this;
		if(estado=="sinVerificar"){
			const itemRef = model.db.object('PagosTriskel/' + key);
			itemRef.update({
				estado: "verificado"
			});
			location.reload();
		}
	}
	ngOnInit() {}
} 
