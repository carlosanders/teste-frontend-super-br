import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModalidadeTransicao} from '@cdk/models/modalidade-transicao.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeTransicaoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeTransicao> {
        return this.modelService.getOne('modalidade_transicao', id)
            .map(response => plainToClass(ModalidadeTransicao, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_transicao', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(ModalidadeTransicao, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_transicao', new HttpParams({fromObject: params}));
    }

    save(modalidadeTransicao: ModalidadeTransicao): Observable<ModalidadeTransicao> {
        if (modalidadeTransicao.id) {
            return this.modelService.put('modalidade_transicao', modalidadeTransicao.id, classToPlain(modalidadeTransicao))
                .map(response => {
                    response = plainToClass(ModalidadeTransicao, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeTransicao(), {...modalidadeTransicao, ...response});
                });
        } else {
            return this.modelService.post('modalidade_transicao', classToPlain(modalidadeTransicao))
                .map(response => {
                    response = plainToClass(ModalidadeTransicao, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeTransicao(), {...modalidadeTransicao, ...response});
                });
        }
    }

    destroy(id: number): Observable<ModalidadeTransicao> {
        return this.modelService.delete('modalidade_transicao', id);
    }
}
