import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.scss'],
  animations: [routerTransition()] 
})
export class TarifasComponent implements OnInit {
	item: Observable<any>;

	//Campos a editar
	envioKm:number;
	envioMin:number;
	motoKm:number;
	motoMin:number;
	taxiKm:number;
	taxiMin:number;
	adicionalMoto:number;
	adicionalTaxi:number;

	constructor(private db: AngularFireDatabase) {
		
		let model = this;
		model.item = db.object('tarifas/').valueChanges();
		model.item.subscribe((res)=>{
			console.log(res);
			model.envioKm =res.envioKm;
			model.envioMin =res.envioMin;
			model.motoKm =res.motoKm;
			model.motoMin =res.motoMin;
			model.taxiKm =res.taxiKm;
			model.taxiMin = res.taxiMin;
			model.adicionalMoto = res.adicionalMoto;
			model.adicionalTaxi = res.adicionalTaxi;
		});

	}

	ngOnInit() {
          
	}
	guardar(){
		let model = this;
		const itemRef = model.db.object('tarifas/');
		itemRef.update({
			envioKm:model.envioKm,
			envioMin:model.envioMin,
			motoKm:model.motoKm,
			motoMin:model.motoMin,
			taxiKm:model.taxiKm,
			taxiMin: model.taxiMin,
			adicionalMoto: model.adicionalMoto,
			adicionalTaxi: model.adicionalTaxi,

		});
		alert('Tarifas actualizadas correctamente');
	}

}
