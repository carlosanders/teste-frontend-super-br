import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Juntada} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class JuntadaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Juntada> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('juntada', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Juntada, response)[0])
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

        return this.modelService.get('juntada', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Juntada, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('juntada', new HttpParams({fromObject: params}));
    }

    save(juntada: Juntada, context: any = '{}'): Observable<Juntada> {
        const params = {};
        params['context'] = context;
        if (juntada.id) {
            return this.modelService.put('juntada', juntada.id, classToPlain(juntada))
                .pipe(
                    map(response => {
                        response = plainToClass(Juntada, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Juntada(), {...juntada, ...response});
                    })
                );
        } else {
            return this.modelService.post('juntada', classToPlain(juntada))
                .pipe(
                    map(response => {
                        response = plainToClass(Juntada, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Juntada(), {...juntada, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Juntada> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('juntada', id, new HttpParams({fromObject: params}));
    }
}
