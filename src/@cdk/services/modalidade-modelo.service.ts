import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeModelo} from '@cdk/models/modalidade-modelo.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeModeloService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeModelo> {
        return this.modelService.getOne('modalidade_modelo', id)
            .pipe(
                map(response => plainToClass(ModalidadeModelo, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_modelo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeModelo, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_modelo', new HttpParams({fromObject: params}));
    }

    save(modalidadeModelo: ModalidadeModelo): Observable<ModalidadeModelo> {
        if (modalidadeModelo.id) {
            return this.modelService.put('modalidade_modelo', modalidadeModelo.id, classToPlain(modalidadeModelo))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeModelo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeModelo(), {...modalidadeModelo, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_modelo', classToPlain(modalidadeModelo))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeModelo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeModelo(), {...modalidadeModelo, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<ModalidadeModelo> {
        return this.modelService.delete('modalidade_modelo', id);
    }
}
