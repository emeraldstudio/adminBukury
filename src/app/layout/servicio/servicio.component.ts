/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss'],
  animations: [routerTransition()]
})
export class ServicioComponent implements OnInit {
	@ViewChild('gmap') gmapElement: any;
	closeResult: string;
	map: google.maps.Map;
	idRuta:string;
	latitude:number=4.630399;
	longitude:number=-74.091343;
	latitudeF:number=4.630399;
	longitudeF:number=-74.091343;
	key:string;
	item: Observable<any>;
	firma:Observable<any>;
	constructor(private storage: AngularFireStorage,private modalService: NgbModal,private activatedRoute: ActivatedRoute, db: AngularFireDatabase) {
		let model = this;
		model.activatedRoute.params.subscribe((params: Params) => {
			model.key = params['key'];
			console.log(model.key);
		});
		model.item = db.object('servicios/'+model.key).valueChanges();
		model.item.subscribe((res)=>{
			console.log(res);
			let urlFirma = 'uploads/firmas/'+model.key+'.png';
			const ref = this.storage.ref(urlFirma);
			model.firma = ref.getDownloadURL();

			console.log(model.firma);
			if(res.puntoInicio && res.puntoFin){
				model.latitude = res.puntoInicio.split(',')[0]*1;
				model.longitude = res.puntoInicio.split(',')[1]*1;

				model.latitudeF = res.puntoFin.split(',')[0]*1;
				model.longitudeF = res.puntoFin.split(',')[1]*1;

				let mapProp = {
					center: new google.maps.LatLng(model.latitude,model.longitude),
					zoom: 16,
					mapTypeId: google.maps.MapTypeId.ROADMAP
			    };
			    model.map = new google.maps.Map(model.gmapElement.nativeElement, mapProp);
			    model.map.setCenter(new google.maps.LatLng(model.latitude,model.longitude));
			    
			    //Marker inicio
			    let posMar = {lat: model.latitude, lng: model.longitude};
				let marker = new google.maps.Marker({position: posMar, map: model.map});

				//Marker fin
			    let posMarF = {lat: model.latitudeF, lng: model.longitudeF};
				let markerF = new google.maps.Marker({position: posMarF, map: model.map});

				//model.map.fitBounds(new google.maps.LatLngBounds(posMarF,posMar));


				let poly = new google.maps.Polyline()

				var rutaServicio = [posMar,posMarF];
		        var flightPath = new google.maps.Polyline({
		          path: rutaServicio,
		          geodesic: true,
		          strokeColor: '#FF0000',
		          strokeOpacity: 1.0,
		          strokeWeight: 2
		        });

		        flightPath.setMap(model.map);

		        model.map.setZoom(13);

			}
			
		});

	}

	ngOnInit() {
          
	}
	

}
