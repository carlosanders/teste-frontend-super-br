import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Sigilo} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class SigiloService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Sigilo> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('sigilo', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Sigilo, response)[0])
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

        return this.modelService.get('sigilo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Sigilo, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('sigilo', new HttpParams({fromObject: params}));
    }

    save(sigilo: Sigilo, context: any = '{}'): Observable<Sigilo> {
        const params = {};
        params['context'] = context;
        if (sigilo.id) {
            return this.modelService.put('sigilo', sigilo.id, classToPlain(sigilo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Sigilo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Sigilo(), {...sigilo, ...response});
                    })
                );
        } else {
            return this.modelService.post('sigilo', classToPlain(sigilo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Sigilo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Sigilo(), {...sigilo, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Sigilo> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('sigilo', id, new HttpParams({fromObject: params}));
    }
}
