import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Interessado} from '@cdk/models/interessado.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class InteressadoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Interessado> {
        return this.modelService.getOne('interessado', id)
            .map(response => plainToClass(Interessado, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('interessado', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Interessado, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('interessado', new HttpParams({fromObject: params}));
    }

    save(interessado: Interessado): Observable<Interessado> {
        if (interessado.id) {
            return this.modelService.put('interessado', interessado.id, classToPlain(interessado))
                .map(response => {
                    response = plainToClass(Interessado, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Interessado(), {...interessado, ...response});
                });
        } else {
            return this.modelService.post('interessado', classToPlain(interessado))
                .map(response => {
                    response = plainToClass(Interessado, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Interessado(), {...interessado, ...response});
                });
        }
    }

    destroy(id: number): Observable<Interessado> {
        return this.modelService.delete('interessado', id);
    }
}
