import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Favorito} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class FavoritoService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Favorito> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('favorito', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Favorito, response)[0])
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

        return this.modelService.get('favorito', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Favorito, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('favorito', new HttpParams({fromObject: params}));
    }

    save(favorito: Favorito, context: any = '{}'): Observable<Favorito> {
        const params = {};
        params['context'] = context;
        if (favorito.id) {
            return this.modelService.put('favorito', favorito.id, classToPlain(favorito), new HttpParams({fromObject: params}))
                .pipe(map(
                    response => {
                        response = plainToClass(Favorito, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Favorito(), {...favorito, ...response});
                    }))
                ;
        } else {
            return this.modelService.post('favorito', classToPlain(favorito), new HttpParams({fromObject: params}))
                .pipe(map(
                    response => {
                        response = plainToClass(Favorito, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Favorito(), {...favorito, ...response});
                    }));
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Favorito> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('favorito', id, new HttpParams({fromObject: params}));
    }

    patch(favorito: Favorito, changes: any): Observable<Favorito> {
        return this.http.patch(
            `${environment.api_url}${'favorito'}/${favorito.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map(response => {
                response = plainToClass(Favorito, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Favorito(), {...favorito, ...response});
            })
        );
    }
}
