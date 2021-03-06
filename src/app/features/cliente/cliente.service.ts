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

    find(id: string): Observable<Cliente> {
        return this.http.get(apiURL+'/'+id).map(res => res.json());
    }

    update(cliente: Cliente) {
        return this.http.put(apiURL+'/'+cliente.id, cliente).map(res => res);
    }

    remove(id: string) {
        return this.http.delete(apiURL+'/'+id).map(res => res);
    }
}