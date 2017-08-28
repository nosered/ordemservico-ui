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

    list(): Observable<Item[]> {
        return this.http.get(apiURL).map(res => res.json());
    }

    find(id: string): Observable<Item> {
        return this.http.get(apiURL+'/'+id).map(res => res.json());
    }

    update(item: Item) {
        return this.http.put(apiURL+'/'+item.id, item).map(res => res);
    }

    remove(id: string) {
        return this.http.delete(apiURL+'/'+id).map(res => res);
    }
}