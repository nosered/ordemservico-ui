import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Item } from './item';

const apiURL = 'http://rest.learncode.academy/api/ederson/itens';

@Injectable()
export class ItemService {

    constructor(private http: Http) { }

    add(item: Item): Observable<Item> {
        return this.http.post(apiURL, item).map(res => res.json());
    }
}