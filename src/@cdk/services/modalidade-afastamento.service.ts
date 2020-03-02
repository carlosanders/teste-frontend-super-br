import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeAfastamento} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeAfastamentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<ModalidadeAfastamento> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_afastamento', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeAfastamento, response)[0])
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

        return this.modelService.get('modalidade_afastamento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeAfastamento, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_afastamento', new HttpParams({fromObject: params}));
    }

    save(modalidadeAfastamento: ModalidadeAfastamento, context: any = {}): Observable<ModalidadeAfastamento> {
        const params = {};
        params['context'] = context;
        if (modalidadeAfastamento.id) {
            return this.modelService.put('modalidade_afastamento', modalidadeAfastamento.id, classToPlain(modalidadeAfastamento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeAfastamento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeAfastamento(), {...modalidadeAfastamento, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_afastamento', classToPlain(modalidadeAfastamento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeAfastamento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeAfastamento(), {...modalidadeAfastamento, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<ModalidadeAfastamento> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_afastamento', id, new HttpParams({fromObject: params}));
    }
}
