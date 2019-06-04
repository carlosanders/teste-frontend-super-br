import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModalidadeTipoInibidor} from '@cdk/models/modalidade-tipo-inibidor.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeTipoInibidorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeTipoInibidor> {
        return this.modelService.getOne('modalidade_tipo_inibidor', id)
            .map(response => plainToClass(ModalidadeTipoInibidor, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_tipo_inibidor', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(ModalidadeTipoInibidor, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_tipo_inibidor', new HttpParams({fromObject: params}));
    }

    save(modalidadeTipoInibidor: ModalidadeTipoInibidor): Observable<ModalidadeTipoInibidor> {
        if (modalidadeTipoInibidor.id) {
            return this.modelService.put('modalidade_tipo_inibidor', modalidadeTipoInibidor.id, classToPlain(modalidadeTipoInibidor))
                .map(response => {
                    response = plainToClass(ModalidadeTipoInibidor, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeTipoInibidor(), {...modalidadeTipoInibidor, ...response});
                });
        } else {
            return this.modelService.post('modalidade_tipo_inibidor', classToPlain(modalidadeTipoInibidor))
                .map(response => {
                    response = plainToClass(ModalidadeTipoInibidor, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeTipoInibidor(), {...modalidadeTipoInibidor, ...response});
                });
        }
    }

    destroy(id: number): Observable<ModalidadeTipoInibidor> {
        return this.modelService.delete('modalidade_tipo_inibidor', id);
    }
}
