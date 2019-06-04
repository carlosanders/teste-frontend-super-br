import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lotacao} from '@cdk/models/lotacao.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class LotacaoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Lotacao> {
        return this.modelService.getOne('lotacao', id)
            .map(response => plainToClass(Lotacao, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('lotacao', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Lotacao, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('lotacao', new HttpParams({fromObject: params}));
    }

    save(lotacao: Lotacao): Observable<Lotacao> {
        if (lotacao.id) {
            return this.modelService.put('lotacao', lotacao.id, classToPlain(lotacao))
                .map(response => {
                    response = plainToClass(Lotacao, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Lotacao(), {...lotacao, ...response});
                });
        } else {
            return this.modelService.post('lotacao', classToPlain(lotacao))
                .map(response => {
                    response = plainToClass(Lotacao, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Lotacao(), {...lotacao, ...response});
                });
        }
    }

    destroy(id: number): Observable<Lotacao> {
        return this.modelService.delete('lotacao', id);
    }
}
