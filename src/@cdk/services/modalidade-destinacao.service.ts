import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeDestinacao} from '@cdk/models/modalidade-destinacao.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeDestinacaoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeDestinacao> {
        return this.modelService.getOne('modalidade_destinacao', id)
            .pipe(
                map(response => plainToClass(ModalidadeDestinacao, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_destinacao', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeDestinacao, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_destinacao', new HttpParams({fromObject: params}));
    }

    save(modalidadeDestinacao: ModalidadeDestinacao): Observable<ModalidadeDestinacao> {
        if (modalidadeDestinacao.id) {
            return this.modelService.put('modalidade_destinacao', modalidadeDestinacao.id, classToPlain(modalidadeDestinacao))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeDestinacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeDestinacao(), {...modalidadeDestinacao, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_destinacao', classToPlain(modalidadeDestinacao))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeDestinacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeDestinacao(), {...modalidadeDestinacao, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<ModalidadeDestinacao> {
        return this.modelService.delete('modalidade_destinacao', id);
    }
}
