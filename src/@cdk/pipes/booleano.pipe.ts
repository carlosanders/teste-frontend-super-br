import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'booleanoPipe'})
export class BooleanoPipe implements PipeTransform {
    transform(value) {
        return value ? 'SIM' : 'NÃO';
    }
}
