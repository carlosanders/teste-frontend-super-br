import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Notificacao} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {environment} from 'environments/environment';

@Injectable()
export class NotificacaoService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Notificacao> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('notificacao', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Notificacao, response)[0])
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

        return this.modelService.get('notificacao', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Notificacao, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;
        return this.modelService.count('notificacao', new HttpParams({fromObject: params}));
    }

    save(notificacao: Notificacao, context: any = '{}'): Observable<Notificacao> {
        const params = {};
        params['context'] = context;
        if (notificacao.id) {
            return this.modelService.put('notificacao', notificacao.id, classToPlain(notificacao), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Notificacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Notificacao(), {...notificacao, ...response});
                    })
                );
        } else {
            return this.modelService.post('notificacao', classToPlain(notificacao), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Notificacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Notificacao(), {...notificacao, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Notificacao> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('notificacao', id, new HttpParams({fromObject: params}));
    }

    toggleLida(notificacao: Notificacao, context: any = '{}'): Observable<Notificacao> {
        const params = {};
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'notificacao'}/${notificacao.id}/${'toggle_lida'}` + environment.xdebug,
            JSON.stringify(classToPlain(notificacao)),
            {params}
        ).pipe(
            map(response => {
                response = plainToClass(Notificacao, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Notificacao(), {...notificacao, ...response});
            })
        );
    }
}
