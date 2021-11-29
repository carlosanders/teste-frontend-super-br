import {HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ModelService} from '@cdk/services/model.service';
import {classToPlain, plainToClass} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import md5 from 'crypto-js/md5';
import moment from 'moment';

export class ParentGenericService<T> {

    constructor(
        protected modelService: ModelService,
        protected path: string,
        protected clz: new (...args: any[]) => T,
    ) {
    }

    get(id: number, populate: any = '[]', context: any = '{}'): Observable<T> {
        const params = {};
        params['populate'] = populate;
        params['context'] = context;
        return this.modelService.getOne(this.path, id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(this.clz, response))
            );
    }

    query(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}', preload: any = null): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        const cachedResponse = JSON.parse(localStorage.getItem(preload));
        // depois retorna o response cacheado
        if (cachedResponse &&
            (cachedResponse['hash'] === md5(JSON.stringify(params)).toString()) &&
            (parseInt(moment().format('YYYYMMDDHmmss'), 10) < parseInt(cachedResponse['expire'], 10))) {
            // primeiro dá o próximo preload
            if (preload && cachedResponse['fetched'] < cachedResponse['response']['total']) {
                const newParams = _.cloneDeep(params);
                newParams['offset'] = params['offset'] + params['limit'];
                const o = this.modelService.get(this.path, new HttpParams({fromObject: newParams}))
                    .pipe(
                        map((newResponse: any) => {
                                localStorage.setItem(preload, JSON.stringify({
                                    expire: moment().add(1, 'minutes').format('YYYYMMDDHmmss'),
                                    signature: md5(JSON.stringify(newParams['where'])).toString(),
                                    hash: md5(JSON.stringify(newParams)).toString(),
                                    response: newResponse,
                                    fetched: cachedResponse['fetched'] + newResponse['entities'].length
                                }));
                            }
                        )).subscribe();
            }
            return of(new PaginatedResponse(plainToClass(this.clz, cachedResponse['response']['entities']), cachedResponse['response']['total']));
        }

        return this.modelService.get(this.path, new HttpParams({fromObject: params}))
            .pipe(
                map((response: any) => {
                    // temos preload a fazer?
                    if (preload) {
                        const newParams = _.cloneDeep(params);
                        newParams['offset'] = params['offset'] + params['limit'];
                        this.modelService.get(this.path, new HttpParams({fromObject: newParams}))
                            .pipe(
                                map((newResponse: any) => {
                                        localStorage.setItem(preload, JSON.stringify({
                                            expire: moment().add(1, 'minutes').format('YYYYMMDDHmmss'),
                                            signature: md5(JSON.stringify(newParams['where'])).toString(),
                                            hash: md5(JSON.stringify(newParams)).toString(),
                                            response: newResponse,
                                            fetched: response['entities'].length + newResponse['entities'].length
                                        }));
                                    }
                                )).subscribe();
                    }
                    // retorna o response do server
                    return new PaginatedResponse(plainToClass(this.clz, response['entities']), response['total']);
                })
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count(this.path, new HttpParams({fromObject: params}));
    }

    save(t: T, context: any = '{}', populate: any = '[]'): Observable<T> {
        const params = {};
        params['populate'] = populate;
        params['context'] = context;
        if (t['id']) {
            return this.modelService.put(this.path, t['id'], classToPlain(t), new HttpParams({fromObject: params}))
                .pipe(
                    map((response) => {
                        response = plainToClass(this.clz, response);
                        Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                        return Object.assign(new this.clz(), {...t, ...response});
                    })
                );
        } else {
            return this.modelService.post(this.path, classToPlain(t), new HttpParams({fromObject: params}))
                .pipe(
                    map((response) => {
                        response = plainToClass(this.clz, response);
                        Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                        return Object.assign(new this.clz(), {...t, ...response});
                    })
                );
        }
    }

    patch(t: T, changes: any, populate: any = '[]', context: any = '{}'): Observable<T> {
        const params = {};
        params['populate'] = populate;
        params['context'] = context;
        return this.modelService.patch(
            this.path,
            t['id'], changes, new HttpParams({fromObject: params})
        ).pipe(
            map((response) => {
                response = plainToClass(this.clz, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new this.clz(), {...t, ...response});
            })
        );
    }

    destroy(id: number, context: any = '{}'): Observable<T> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete(this.path, id, new HttpParams({fromObject: params}));
    }
}
