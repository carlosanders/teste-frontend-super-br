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

    get(id: number, context: any = {}): Observable<Feriado> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('feriado', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Feriado, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = [], context: any = {}): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('feriado', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Feriado, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('feriado', new HttpParams({fromObject: params}));
    }

    save(feriado: Feriado, context: any = {}): Observable<Feriado> {
        const params = {};
        params['context'] = context;
        if (feriado.id) {
            return this.modelService.put('feriado', feriado.id, classToPlain(feriado), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Feriado, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Feriado(), {...feriado, ...response});
                    })
                );
        } else {
            return this.modelService.post('feriado', classToPlain(feriado), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Feriado, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Feriado(), {...feriado, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<Feriado> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('feriado', id, new HttpParams({fromObject: params}));
    }
}
