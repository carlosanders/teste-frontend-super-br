import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Etiqueta} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class EtiquetaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Etiqueta> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('etiqueta', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Etiqueta, response)[0])
            );
    }

    query(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('etiqueta', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Etiqueta, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('etiqueta', new HttpParams({fromObject: params}));
    }

    save(etiqueta: Etiqueta, context: any = '{}'): Observable<Etiqueta> {
        const params = {};
        params['context'] = context;
        if (etiqueta.id) {
            return this.modelService.put('etiqueta', etiqueta.id, classToPlain(etiqueta), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Etiqueta, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Etiqueta(), {...etiqueta, ...response});
                    })
                );
        } else {
            return this.modelService.post('etiqueta', classToPlain(etiqueta), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Etiqueta, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Etiqueta(), {...etiqueta, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Etiqueta> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('etiqueta', id, new HttpParams({fromObject: params}));
    }
}
