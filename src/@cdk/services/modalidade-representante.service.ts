import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeRepresentante} from '@cdk/models/modalidade-representante.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeRepresentanteService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeRepresentante> {
        return this.modelService.getOne('modalidade_representante', id)
            .pipe(
                map(response => plainToClass(ModalidadeRepresentante, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_representante', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeRepresentante, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_representante', new HttpParams({fromObject: params}));
    }

    save(modalidadeRepresentante: ModalidadeRepresentante): Observable<ModalidadeRepresentante> {
        if (modalidadeRepresentante.id) {
            return this.modelService.put('modalidade_representante', modalidadeRepresentante.id, classToPlain(modalidadeRepresentante))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeRepresentante, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeRepresentante(), {...modalidadeRepresentante, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_representante', classToPlain(modalidadeRepresentante))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeRepresentante, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeRepresentante(), {...modalidadeRepresentante, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<ModalidadeRepresentante> {
        return this.modelService.delete('modalidade_representante', id);
    }
}
