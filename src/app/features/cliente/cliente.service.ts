import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Cliente } from './cliente';

const apiURL = 'http://rest.learncode.academy/api/ederson/clientesteste';

@Injectable()
export class ClienteService {

    constructor(private http: Http) { }

    list(): Observable<Cliente[]> {
        return this.http.get(apiURL).map(res => res.json());
    }

    add(cliente: Cliente): Observable<Cliente> {
        return this.http.post(apiURL, cliente).map(res => res.json());
    }
}