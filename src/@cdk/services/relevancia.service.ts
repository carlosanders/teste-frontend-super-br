import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Relevancia} from '@cdk/models/relevancia.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class RelevanciaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Relevancia> {
        return this.modelService.getOne('relevancia', id)
            .map(response => plainToClass(Relevancia, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('relevancia', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Relevancia, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('relevancia', new HttpParams({fromObject: params}));
    }

    save(relevancia: Relevancia): Observable<Relevancia> {
        if (relevancia.id) {
            return this.modelService.put('relevancia', relevancia.id, classToPlain(relevancia))
                .map(response => {
                    response = plainToClass(Relevancia, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Relevancia(), {...relevancia, ...response});
                });
        } else {
            return this.modelService.post('relevancia', classToPlain(relevancia))
                .map(response => {
                    response = plainToClass(Relevancia, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Relevancia(), {...relevancia, ...response});
                });
        }
    }

    destroy(id: number): Observable<Relevancia> {
        return this.modelService.delete('relevancia', id);
    }
}
