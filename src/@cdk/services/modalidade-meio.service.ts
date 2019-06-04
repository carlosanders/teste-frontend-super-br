import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModalidadeMeio} from '@cdk/models/modalidade-meio.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeMeioService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeMeio> {
        return this.modelService.getOne('modalidade_meio', id)
            .map(response => plainToClass(ModalidadeMeio, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_meio', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(ModalidadeMeio, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_meio', new HttpParams({fromObject: params}));
    }

    save(modalidadeMeio: ModalidadeMeio): Observable<ModalidadeMeio> {
        if (modalidadeMeio.id) {
            return this.modelService.put('modalidade_meio', modalidadeMeio.id, classToPlain(modalidadeMeio))
                .map(response => {
                    response = plainToClass(ModalidadeMeio, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeMeio(), {...modalidadeMeio, ...response});
                });
        } else {
            return this.modelService.post('modalidade_meio', classToPlain(modalidadeMeio))
                .map(response => {
                    response = plainToClass(ModalidadeMeio, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeMeio(), {...modalidadeMeio, ...response});
                });
        }
    }

    destroy(id: number): Observable<ModalidadeMeio> {
        return this.modelService.delete('modalidade_meio', id);
    }
}
