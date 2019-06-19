import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notificacao} from '@cdk/models/notificacao.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';
import {environment} from '../../environments/environment';

@Injectable()
export class NotificacaoService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number): Observable<Notificacao> {
        return this.modelService.getOne('notificacao', id)
            .map(response => plainToClass(Notificacao, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('notificacao', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Notificacao, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('notificacao', new HttpParams({fromObject: params}));
    }

    save(notificacao: Notificacao): Observable<Notificacao> {
        if (notificacao.id) {
            return this.modelService.put('notificacao', notificacao.id, classToPlain(notificacao))
                .map(response => {
                    response = plainToClass(Notificacao, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Notificacao(), {...notificacao, ...response});
                });
        } else {
            return this.modelService.post('notificacao', classToPlain(notificacao))
                .map(response => {
                    response = plainToClass(Notificacao, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Notificacao(), {...notificacao, ...response});
                });
        }
    }

    destroy(id: number): Observable<Notificacao> {
        return this.modelService.delete('notificacao', id);
    }

    toggleLida(notificacao: Notificacao): Observable<Notificacao> {
        return this.http.patch(
            `${environment.api_url}${'notificacao'}/${notificacao.id}/${'toggle_lida'}` + environment.xdebug,
            JSON.stringify(classToPlain(notificacao))
        ).map(response => {
            response = plainToClass(Notificacao, response);
            Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
            return Object.assign(new Notificacao(), {...notificacao, ...response});
        });
    }
}
