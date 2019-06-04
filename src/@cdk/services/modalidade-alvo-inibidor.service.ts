import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModalidadeAlvoInibidor} from '@cdk/models/modalidade-alvo-inibidor.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeAlvoInibidorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeAlvoInibidor> {
        return this.modelService.getOne('modalidade_alvo_inibidor', id)
            .map(response => plainToClass(ModalidadeAlvoInibidor, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_alvo_inibidor', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(ModalidadeAlvoInibidor, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_alvo_inibidor', new HttpParams({fromObject: params}));
    }

    save(modalidadeAlvoInibidor: ModalidadeAlvoInibidor): Observable<ModalidadeAlvoInibidor> {
        if (modalidadeAlvoInibidor.id) {
            return this.modelService.put('modalidade_alvo_inibidor', modalidadeAlvoInibidor.id, classToPlain(modalidadeAlvoInibidor))
                .map(response => {
                    response = plainToClass(ModalidadeAlvoInibidor, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeAlvoInibidor(), {...modalidadeAlvoInibidor, ...response});
                });
        } else {
            return this.modelService.post('modalidade_alvo_inibidor', classToPlain(modalidadeAlvoInibidor))
                .map(response => {
                    response = plainToClass(ModalidadeAlvoInibidor, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ModalidadeAlvoInibidor(), {...modalidadeAlvoInibidor, ...response});
                });
        }
    }

    destroy(id: number): Observable<ModalidadeAlvoInibidor> {
        return this.modelService.delete('modalidade_alvo_inibidor', id);
    }
}
