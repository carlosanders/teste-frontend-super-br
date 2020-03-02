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

    get(id: number): Observable<Etiqueta> {
        return this.modelService.getOne('etiqueta', id)
            .pipe(
                map(response => plainToClass(Etiqueta, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('etiqueta', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Etiqueta, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('etiqueta', new HttpParams({fromObject: params}));
    }

    save(etiqueta: Etiqueta): Observable<Etiqueta> {
        if (etiqueta.id) {
            return this.modelService.put('etiqueta', etiqueta.id, classToPlain(etiqueta))
                .pipe(
                    map(response => {
                        response = plainToClass(Etiqueta, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Etiqueta(), {...etiqueta, ...response});
                    })
                );
        } else {
            return this.modelService.post('etiqueta', classToPlain(etiqueta))
                .pipe(
                    map(response => {
                        response = plainToClass(Etiqueta, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Etiqueta(), {...etiqueta, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Etiqueta> {
        return this.modelService.delete('etiqueta', id);
    }
}
