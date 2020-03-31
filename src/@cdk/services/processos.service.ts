import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Tarefa} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {environment} from 'environments/environment';

@Injectable()
export class ProcessosService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Tarefa> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('tarefa', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Tarefa, response)[0])
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

        return this.modelService.get('tarefa', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Tarefa, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('tarefa', new HttpParams({fromObject: params}));
    }

    save(tarefa: Tarefa, context: any = '{}'): Observable<Tarefa> {
        const params = {};
        params['context'] = context;
        if (tarefa.id) {
            return this.modelService.put('tarefa', tarefa.id, classToPlain(tarefa), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Tarefa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Tarefa(), {...tarefa, ...response});
                    })
                );
        } else {
            return this.modelService.post('tarefa', classToPlain(tarefa), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Tarefa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Tarefa(), {...tarefa, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Tarefa> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('tarefa', id, new HttpParams({fromObject: params}));
    }

    ciencia(tarefa: Tarefa, context: any = '{}'): Observable<Tarefa> {
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'tarefa'}/${tarefa.id}/${'ciencia'}` + environment.xdebug,
            JSON.stringify(classToPlain(tarefa)),
            {params}
        ).pipe(
            map(response => {
                response = plainToClass(Tarefa, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Tarefa(), {...tarefa, ...response});
            })
        );
    }

    toggleLida(tarefa: Tarefa, context: any = '{}'): Observable<Tarefa> {
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'tarefa'}/${tarefa.id}/${'toggle_lida'}` + environment.xdebug,
            JSON.stringify(classToPlain(tarefa)),
            {params}
        ).pipe(
            map(response => {
                response = plainToClass(Tarefa, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Tarefa(), {...tarefa, ...response});
            })
        );
    }

    patch(tarefa: Tarefa, changes: any, context: any = '{}'): Observable<Tarefa> {
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'tarefa'}/${tarefa.id}` + environment.xdebug,
            JSON.stringify(changes),
            {params}
        ).pipe(
            map(response => {
                response = plainToClass(Tarefa, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Tarefa(), {...tarefa, ...response});
            })
        );
    }
}
