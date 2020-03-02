import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Representante} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class RepresentanteService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Representante> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('representante', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Representante, response)[0])
            );
    }

    query(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('representante', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Representante, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('representante', new HttpParams({fromObject: params}));
    }

    save(representante: Representante, context: any = '{}'): Observable<Representante> {
        const params = {};
        params['context'] = context;
        if (representante.id) {
            return this.modelService.put('representante', representante.id, classToPlain(representante), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Representante, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Representante(), {...representante, ...response});
                    })
                );
        } else {
            return this.modelService.post('representante', classToPlain(representante), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Representante, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Representante(), {...representante, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Representante> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('representante', id, new HttpParams({fromObject: params}));
    }
}
