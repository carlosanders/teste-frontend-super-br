import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ComponenteDigital} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {environment} from 'environments/environment';
import {Pessoa} from '@cdk/models';

@Injectable()
export class ComponenteDigitalService {

    constructor(
        private http: HttpClient,
        private modelService: ModelService
    ) {
    }

    download(id: number | string, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams().set('context', context);
        return this.http.get(`${environment.api_url}componente_digital/${id}/download` + environment.xdebug, {params});
    }

    downloadAsPdf(id: number | string, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams().set('context', context);
        return this.http.get(`${environment.api_url}componente_digital/${id}/downloadAsPdf` + environment.xdebug, {params});
    }

    get(id: number, params: HttpParams = new HttpParams(), context: any = '{}'): Observable<ComponenteDigital> {
        params['context'] = context;
        return this.modelService.getOne('componente_digital', id, params)
            .pipe(
                map(response => plainToClass(ComponenteDigital, response)[0])
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

        return this.modelService.get('componente_digital', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ComponenteDigital, response['entities']), response['total']))
            );
    }

    search(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.search('componente_digital', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Pessoa, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('componente_digital', new HttpParams({fromObject: params}));
    }

    save(componenteDigital: ComponenteDigital, context: any = '{}'): Observable<ComponenteDigital> {
        const params = {};
        params['context'] = context;
        if (componenteDigital.id) {
            return this.modelService.put('componente_digital', componenteDigital.id, classToPlain(componenteDigital), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ComponenteDigital, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ComponenteDigital(), {...componenteDigital, ...response});
                    })
                );
        } else {
            return this.modelService.post('componente_digital', classToPlain(componenteDigital), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ComponenteDigital, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ComponenteDigital(), {...componenteDigital, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<ComponenteDigital> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('componente_digital', id, new HttpParams({fromObject: params}));
    }

    patch(componenteDigital: ComponenteDigital, changes: any, context: any = '{}'): Observable<ComponenteDigital> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}componente_digital/${componenteDigital.id}` + environment.xdebug,
            JSON.stringify(changes),
            {params}
        ).pipe(
            map(response => {
                response = plainToClass(ComponenteDigital, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new ComponenteDigital(), {...componenteDigital, ...response});
            })
        );
    }

    reverter(componenteDigital: ComponenteDigital, changes: any, context: any = '{}'): Observable<ComponenteDigital> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}componente_digital/${componenteDigital.id}/reverter` + environment.xdebug,
            JSON.stringify(changes),
            {params}
        ).pipe(
            map(response => {
                response = plainToClass(ComponenteDigital, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new ComponenteDigital(), {...componenteDigital, ...response});
            })
        );
    }

    approve(componenteDigital: ComponenteDigital, context: any = '{}'): Observable<ComponenteDigital> {
        const params = {};
        params['context'] = context;
        return this.modelService.post(
            'componente_digital/aprova', classToPlain(componenteDigital), new HttpParams({fromObject: params})
        ).pipe(
            map(response => {
                response = plainToClass(ComponenteDigital, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new ComponenteDigital(), {...componenteDigital, ...response});
            })
        );
    }
}
