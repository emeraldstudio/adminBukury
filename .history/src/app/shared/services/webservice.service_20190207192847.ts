import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, BehaviorSubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

	constructor(private http: HttpClient) { }
  	enviarNotificacion(titulo, mensaje, detalles, tipo) {
        const serverUrl = 'http://bukuryhome.com/api/index.php/api/admin/notificarUsuarios/';

        console.log('URL a enviar');
        console.log(serverUrl);

        // listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO


        const headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params: {
            titulo: titulo,
            mensaje: mensaje,
            detalles: detalles,
            tipo: tipo
        }, headers: headers })
            .pipe(map(res => res));
    }

    notificarChatConductor(idConductor, mensaje) {
        const serverUrl = 'http://www.speedyapp.com.co/api/index.php/api/admin/notificarChatConductor';

        console.log('URL a enviar');
        console.log(serverUrl);

        // listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO


        const headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params: {
            key: idConductor,
            mensaje: mensaje
        }, headers: headers })
            .pipe(map(res => res));
    }


    private createRequestHeader() {
        // set headers here e.g.
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
         });

        return headers;
    }
}
