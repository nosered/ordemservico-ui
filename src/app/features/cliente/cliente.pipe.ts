import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "clienteFilter"
})
export class ClienteFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            query = query.toUpperCase();
            return _.filter(array, row => row.nome.indexOf(query) > -1);
        }
        return array;
    }
}