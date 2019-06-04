import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sigilo} from '@cdk/models/sigilo.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class SigiloService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Sigilo> {
        return this.modelService.getOne('sigilo', id)
            .map(response => plainToClass(Sigilo, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('sigilo', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Sigilo, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('sigilo', new HttpParams({fromObject: params}));
    }

    save(sigilo: Sigilo): Observable<Sigilo> {
        if (sigilo.id) {
            return this.modelService.put('sigilo', sigilo.id, classToPlain(sigilo))
                .map(response => {
                    response = plainToClass(Sigilo, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Sigilo(), {...sigilo, ...response});
                });
        } else {
            return this.modelService.post('sigilo', classToPlain(sigilo))
                .map(response => {
                    response = plainToClass(Sigilo, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Sigilo(), {...sigilo, ...response});
                });
        }
    }

    destroy(id: number): Observable<Sigilo> {
        return this.modelService.delete('sigilo', id);
    }
}
