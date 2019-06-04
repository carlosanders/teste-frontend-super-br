import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Estado} from '@cdk/models/estado.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class EstadoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Estado> {
        return this.modelService.getOne('estado', id)
            .map(response => plainToClass(Estado, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('estado', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Estado, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('estado', new HttpParams({fromObject: params}));
    }

    save(estado: Estado): Observable<Estado> {
        if (estado.id) {
            return this.modelService.put('estado', estado.id, classToPlain(estado))
                .map(response => {
                    response = plainToClass(Estado, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Estado(), {...estado, ...response});
                });
        } else {
            return this.modelService.post('estado', classToPlain(estado))
                .map(response => {
                    response = plainToClass(Estado, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Estado(), {...estado, ...response});
                });
        }
    }

    destroy(id: number): Observable<Estado> {
        return this.modelService.delete('estado', id);
    }
}
