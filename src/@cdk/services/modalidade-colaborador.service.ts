import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeColaborador} from '@cdk/models/modalidade-colaborador.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeColaboradorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeColaborador> {
        return this.modelService.getOne('modalidade_colaborador', id)
            .pipe(
                map(response => plainToClass(ModalidadeColaborador, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_colaborador', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeColaborador, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_colaborador', new HttpParams({fromObject: params}));
    }

    save(modalidadeColaborador: ModalidadeColaborador): Observable<ModalidadeColaborador> {
        if (modalidadeColaborador.id) {
            return this.modelService.put('modalidade_colaborador', modalidadeColaborador.id, classToPlain(modalidadeColaborador))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeColaborador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeColaborador(), {...modalidadeColaborador, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_colaborador', classToPlain(modalidadeColaborador))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeColaborador, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeColaborador(), {...modalidadeColaborador, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<ModalidadeColaborador> {
        return this.modelService.delete('modalidade_colaborador', id);
    }
}
