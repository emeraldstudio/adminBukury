/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.scss'],
  animations: [routerTransition()]
})
export class UbicacionesComponent implements OnInit {
	@ViewChild('gmap') gmapElement: any;
	map: google.maps.Map;
	idRuta:string;
	latitude:number=4.630399;
	longitude:number=-74.091343;
	itemsRef: AngularFireList<any>;
	items: Observable<any[]>;
	constructor(db: AngularFireDatabase) {
		let model = this;
		model.itemsRef = db.list('conductores');
		model.items = model.itemsRef.snapshotChanges();
		model.items.forEach((conductor)=>{
			console.log(conductor);
		});

		
	    

	}
	ngOnInit() {
		let model = this;
		let mapProp = {
			center: new google.maps.LatLng(model.latitude,model.longitude),
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    model.map = new google.maps.Map(model.gmapElement.nativeElement, mapProp);
	    model.map.setCenter(new google.maps.LatLng(model.latitude,model.longitude));
	}
}
