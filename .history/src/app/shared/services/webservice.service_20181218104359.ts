import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, BehaviorSubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

	constructor(private http: HttpClient) { }
  	notificarAceptado(idConductor){
        var serverUrl = "http://www.speedyapp.com.co/api/index.php/api/admin/notificarAceptado";
        
        console.log('URL a enviar');
        console.log(serverUrl);
        
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params:{ 
            key:idConductor
        }, headers: headers })
            .pipe(map(res => res));
    }

    notificarChatConductor(idConductor,mensaje){
        var serverUrl = "http://www.speedyapp.com.co/api/index.php/api/admin/notificarChatConductor";
        
        console.log('URL a enviar');
        console.log(serverUrl);
        
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params:{ 
            key:idConductor,
            mensaje:mensaje
        }, headers: headers })
            .pipe(map(res => res));
    }


    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
         });

        return headers;
    }
}
