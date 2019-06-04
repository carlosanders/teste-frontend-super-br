import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModalidadeNotificacao} from '@cdk/models/modalidade-notificacao.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeNotificacaoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeNotificacao> {
        return this.modelService.getOne('modalidade_notificacao', id)
            .map(response => plainToClass(ModalidadeNotificacao, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_notificacao', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(ModalidadeNotificacao, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_notificacao', new HttpParams({fromObject: params}));
    }

    save(modalidadeNotificacao: ModalidadeNotificacao): Observable<ModalidadeNotificacao> {
        if (modalidadeNotificacao.id) {
            return this.modelService.put('modalidade_notificacao', modalidadeNotificacao.id, classToPlain(modalidadeNotificacao))
                .map(response => {
                    response = plainToClass(ModalidadeNotificacao, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeNotificacao(), {...modalidadeNotificacao, ...response});
                });
        } else {
            return this.modelService.post('modalidade_notificacao', classToPlain(modalidadeNotificacao))
                .map(response => {
                    response = plainToClass(ModalidadeNotificacao, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeNotificacao(), {...modalidadeNotificacao, ...response});
                });
        }
    }

    destroy(id: number): Observable<ModalidadeNotificacao> {
        return this.modelService.delete('modalidade_notificacao', id);
    }
}
