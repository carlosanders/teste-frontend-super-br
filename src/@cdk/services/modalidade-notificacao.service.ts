import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeNotificacao} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeNotificacaoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<ModalidadeNotificacao> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_notificacao', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeNotificacao, response)[0])
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

        return this.modelService.get('modalidade_notificacao', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeNotificacao, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_notificacao', new HttpParams({fromObject: params}));
    }

    save(modalidadeNotificacao: ModalidadeNotificacao, context: any = '{}'): Observable<ModalidadeNotificacao> {
        const params = {};
        params['context'] = context;
        if (modalidadeNotificacao.id) {
            return this.modelService.put('modalidade_notificacao', modalidadeNotificacao.id, classToPlain(modalidadeNotificacao), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeNotificacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeNotificacao(), {...modalidadeNotificacao, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_notificacao', classToPlain(modalidadeNotificacao), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeNotificacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeNotificacao(), {...modalidadeNotificacao, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ModalidadeNotificacao> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_notificacao', id, new HttpParams({fromObject: params}));
    }
}
