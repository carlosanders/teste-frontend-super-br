import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Localizador} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class LocalizadorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<Localizador> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('localizador', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Localizador, response)[0])
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

        return this.modelService.get('localizador', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Localizador, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('localizador', new HttpParams({fromObject: params}));
    }

    save(localizador: Localizador, context: any = {}): Observable<Localizador> {
        const params = {};
        params['context'] = context;
        if (localizador.id) {
            return this.modelService.put('localizador', localizador.id, classToPlain(localizador), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Localizador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Localizador(), {...localizador, ...response});
                    })
                );
        } else {
            return this.modelService.post('localizador', classToPlain(localizador), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Localizador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Localizador(), {...localizador, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<Localizador> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('localizador', id, new HttpParams({fromObject: params}));
    }
}
