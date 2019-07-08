import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeAfastamento} from '@cdk/models/modalidade-afastamento.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeAfastamentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeAfastamento> {
        return this.modelService.getOne('modalidade_afastamento', id)
            .pipe(
                map(response => plainToClass(ModalidadeAfastamento, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_afastamento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeAfastamento, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_afastamento', new HttpParams({fromObject: params}));
    }

    save(modalidadeAfastamento: ModalidadeAfastamento): Observable<ModalidadeAfastamento> {
        if (modalidadeAfastamento.id) {
            return this.modelService.put('modalidade_afastamento', modalidadeAfastamento.id, classToPlain(modalidadeAfastamento))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeAfastamento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeAfastamento(), {...modalidadeAfastamento, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_afastamento', classToPlain(modalidadeAfastamento))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeAfastamento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeAfastamento(), {...modalidadeAfastamento, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<ModalidadeAfastamento> {
        return this.modelService.delete('modalidade_afastamento', id);
    }
}
