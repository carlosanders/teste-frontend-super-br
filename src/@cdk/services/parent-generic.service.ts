import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {map} from 'rxjs/operators';

export class ParentGenericService<T> {

    constructor(
        protected modelService: ModelService,
        protected path: string,
        protected clz: new (...args: any[]) => T,
    ) {
    }

    get(id: number, context: any = '{}'): Observable<T> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne(this.path, id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(this.clz, response)[0])
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

        return this.modelService.get(this.path, new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(this.clz, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count(this.path, new HttpParams({fromObject: params}));
    }

    save(t: T, context: any = '{}'): Observable<T> {
        const params = {};
        params['context'] = context;
        if (t['id']) {
            return this.modelService.put(this.path, t['id'], classToPlain(t), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(this.clz, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new this.clz(), {...t, ...response});
                    })
                );
        } else {
            return this.modelService.post(this.path, classToPlain(t), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(this.clz, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new this.clz(), {...t, ...response});
                    })
                );
        }
    }


    destroy(id: number, context: any = '{}'): Observable<T> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete(this.path, id, new HttpParams({fromObject: params}));
    }


}
