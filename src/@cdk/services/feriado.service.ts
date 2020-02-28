import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Feriado} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class FeriadoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Feriado> {
        return this.modelService.getOne('feriado', id)
            .pipe(
                map(response => plainToClass(Feriado, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('feriado', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Feriado, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('feriado', new HttpParams({fromObject: params}));
    }

    save(feriado: Feriado): Observable<Feriado> {
        if (feriado.id) {
            return this.modelService.put('feriado', feriado.id, classToPlain(feriado))
                .pipe(
                    map(response => {
                        response = plainToClass(Feriado, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Feriado(), {...feriado, ...response});
                    })
                );
        } else {
            return this.modelService.post('feriado', classToPlain(feriado))
                .pipe(
                    map(response => {
                        response = plainToClass(Feriado, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Feriado(), {...feriado, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Feriado> {
        return this.modelService.delete('feriado', id);
    }
}
