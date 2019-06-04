import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModalidadeEtiqueta} from '@cdk/models/modalidade-etiqueta.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeEtiquetaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeEtiqueta> {
        return this.modelService.getOne('modalidade_etiqueta', id)
            .map(response => plainToClass(ModalidadeEtiqueta, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_etiqueta', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(ModalidadeEtiqueta, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_etiqueta', new HttpParams({fromObject: params}));
    }

    save(modalidadeEtiqueta: ModalidadeEtiqueta): Observable<ModalidadeEtiqueta> {
        if (modalidadeEtiqueta.id) {
            return this.modelService.put('modalidade_etiqueta', modalidadeEtiqueta.id, classToPlain(modalidadeEtiqueta))
                .map(response => {
                    response = plainToClass(ModalidadeEtiqueta, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeEtiqueta(), {...modalidadeEtiqueta, ...response});
                });
        } else {
            return this.modelService.post('modalidade_etiqueta', classToPlain(modalidadeEtiqueta))
                .map(response => {
                    response = plainToClass(ModalidadeEtiqueta, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeEtiqueta(), {...modalidadeEtiqueta, ...response});
                });
        }
    }

    destroy(id: number): Observable<ModalidadeEtiqueta> {
        return this.modelService.delete('modalidade_etiqueta', id);
    }
}
