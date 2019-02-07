/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    @ViewChild('gmap') gmapElement: any;
	map: google.maps.Map;
	idRuta: string;
	latitude = 4.630399;
	longitude = -74.091343;
	itemsRef: AngularFireList<any>;
	items: Observable<any[]>;
	constructor(private db: AngularFireDatabase) {
		const model = this;

	}
	ubicarConductores() {
		const model = this;
		const mapProp = {
			center: new google.maps.LatLng(model.latitude, model.longitude),
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    model.map = new google.maps.Map(model.gmapElement.nativeElement, mapProp);

	    model.map.setCenter(new google.maps.LatLng(model.latitude, model.longitude));

		model.itemsRef = model.db.list('Proveedores');
		model.itemsRef.snapshotChanges(['child_added']).subscribe(actions => {
			actions.forEach(action => {
				console.log(action.type);
				console.log(action.key);
				console.log(action.payload.val());
				const conductor = action.payload.val();

				if (conductor.ubicacion && conductor.estado === 'activo') {
					console.log('Ubi y activo');
					const posMarConductor = {lat: conductor.ubicacion.split(',')[0] * 1, lng: conductor.ubicacion.split(',')[1] * 1};
					console.log(posMarConductor);
					let markerConductor;
					markerConductor = new google.maps.Marker({
						position: posMarConductor,
						map: model.map,
						// title: 'Oliii',
						// icon: 'assets/images/envios.png'
					});
					const contentString = '<div id="content">' +
				      '<h3>' + conductor.nombres + '</h3>' +
				      '<p>Celular: ' + conductor.celular + '</p>' +
				      '<p>Correo: ' + conductor.email + '</p>' +
				      '<p><a href="conductor/' + action.key + '">Ver detalles</a></p>' +
				      '</div>';

					const infowindow = new google.maps.InfoWindow({
						content: contentString
					});

					markerConductor.addListener('click', function() {
						infowindow.open(model.map, markerConductor);
					});
				}


			});
		});
	}
	ngOnInit() {
		const model = this;
		model.ubicarConductores();
	}
}
