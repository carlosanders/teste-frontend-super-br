import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeMeio, ModalidadeModelo} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeModeloService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<ModalidadeModelo> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_modelo', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeModelo, response)[0])
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

        return this.modelService.get('modalidade_modelo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeModelo, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_modelo', new HttpParams({fromObject: params}));
    }

    save(modalidadeModelo: ModalidadeModelo, context: any = '{}'): Observable<ModalidadeModelo> {
        const params = {};
        params['context'] = context;
        if (modalidadeModelo.id) {
            return this.modelService.put('modalidade_modelo', modalidadeModelo.id, classToPlain(modalidadeModelo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeModelo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeModelo(), {...modalidadeModelo, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_modelo', classToPlain(modalidadeModelo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeModelo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeModelo(), {...modalidadeModelo, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ModalidadeModelo> {
        return this.modelService.delete('modalidade_modelo', id, new HttpParams({fromObject: params}));
    }
}
