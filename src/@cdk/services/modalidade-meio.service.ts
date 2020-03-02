import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeMeio} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeMeioService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<ModalidadeMeio> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_meio', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeMeio, response)[0])
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

        return this.modelService.get('modalidade_meio', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeMeio, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_meio', new HttpParams({fromObject: params}));
    }

    save(modalidadeMeio: ModalidadeMeio, context: any = '{}'): Observable<ModalidadeMeio> {
        const params = {};
        params['context'] = context;
        if (modalidadeMeio.id) {
            return this.modelService.put('modalidade_meio', modalidadeMeio.id, classToPlain(modalidadeMeio), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeMeio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeMeio(), {...modalidadeMeio, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_meio', classToPlain(modalidadeMeio), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeMeio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeMeio(), {...modalidadeMeio, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ModalidadeMeio> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_meio', id, new HttpParams({fromObject: params}));
    }
}
