import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tramitacao} from '@cdk/models/tramitacao.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class TramitacaoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Tramitacao> {
        return this.modelService.getOne('tramitacao', id)
            .map(response => plainToClass(Tramitacao, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('tramitacao', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Tramitacao, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('tramitacao', new HttpParams({fromObject: params}));
    }

    save(tramitacao: Tramitacao): Observable<Tramitacao> {
        if (tramitacao.id) {
            return this.modelService.put('tramitacao', tramitacao.id, classToPlain(tramitacao))
                .map(response => {
                    response = plainToClass(Tramitacao, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Tramitacao(), {...tramitacao, ...response});
                });
        } else {
            return this.modelService.post('tramitacao', classToPlain(tramitacao))
                .map(response => {
                    response = plainToClass(Tramitacao, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Tramitacao(), {...tramitacao, ...response});
                });
        }
    }

    destroy(id: number): Observable<Tramitacao> {
        return this.modelService.delete('tramitacao', id);
    }
}
