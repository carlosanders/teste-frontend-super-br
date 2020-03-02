import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeColaborador} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeColaboradorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<ModalidadeColaborador> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_colaborador', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeColaborador, response)[0])
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

        return this.modelService.get('modalidade_colaborador', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeColaborador, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_colaborador', new HttpParams({fromObject: params}));
    }

    save(modalidadeColaborador: ModalidadeColaborador, context: any = '{}'): Observable<ModalidadeColaborador> {
        const params = {};
        params['context'] = context;
        if (modalidadeColaborador.id) {
            return this.modelService.put('modalidade_colaborador', modalidadeColaborador.id, classToPlain(modalidadeColaborador), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeColaborador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeColaborador(), {...modalidadeColaborador, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_colaborador', classToPlain(modalidadeColaborador), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeColaborador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeColaborador(), {...modalidadeColaborador, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ModalidadeColaborador> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_colaborador', id, new HttpParams({fromObject: params}));
    }
}
