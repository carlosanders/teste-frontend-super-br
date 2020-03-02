import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeFase} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeFaseService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<ModalidadeFase> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_fase', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeFase, response)[0])
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

        return this.modelService.get('modalidade_fase', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeFase, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_fase', new HttpParams({fromObject: params}));
    }

    save(modalidadeFase: ModalidadeFase, context: any = '{}'): Observable<ModalidadeFase> {
        const params = {};
        params['context'] = context;
        if (modalidadeFase.id) {
            return this.modelService.put('modalidade_fase', modalidadeFase.id, classToPlain(modalidadeFase), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeFase, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeFase(), {...modalidadeFase, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_fase', classToPlain(modalidadeFase), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeFase, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeFase(), {...modalidadeFase, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ModalidadeFase> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_fase', id, new HttpParams({fromObject: params}));
    }
}
