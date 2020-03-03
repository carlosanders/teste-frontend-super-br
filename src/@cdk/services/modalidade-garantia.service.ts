import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeGarantia} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeGarantiaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<ModalidadeGarantia> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_garantia', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeGarantia, response)[0])
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

        return this.modelService.get('modalidade_garantia', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeGarantia, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_garantia', new HttpParams({fromObject: params}));
    }

    save(modalidadeGarantia: ModalidadeGarantia, context: any = '{}'): Observable<ModalidadeGarantia> {
        const params = {};
        params['context'] = context;
        if (modalidadeGarantia.id) {
            return this.modelService.put('modalidade_garantia', modalidadeGarantia.id, classToPlain(modalidadeGarantia), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeGarantia, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeGarantia(), {...modalidadeGarantia, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_garantia', classToPlain(modalidadeGarantia), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeGarantia, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeGarantia(), {...modalidadeGarantia, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ModalidadeGarantia> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_garantia', id, new HttpParams({fromObject: params}));
    }
}
