import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Juntada} from '@cdk/models/juntada.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class JuntadaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Juntada> {
        return this.modelService.getOne('juntada', id)
            .map(response => plainToClass(Juntada, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('juntada', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Juntada, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('juntada', new HttpParams({fromObject: params}));
    }

    save(juntada: Juntada): Observable<Juntada> {
        if (juntada.id) {
            return this.modelService.put('juntada', juntada.id, classToPlain(juntada))
                .map(response => {
                    response = plainToClass(Juntada, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Juntada(), {...juntada, ...response});
                });
        } else {
            return this.modelService.post('juntada', classToPlain(juntada))
                .map(response => {
                    response = plainToClass(Juntada, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Juntada(), {...juntada, ...response});
                });
        }
    }

    destroy(id: number): Observable<Juntada> {
        return this.modelService.delete('juntada', id);
    }
}
