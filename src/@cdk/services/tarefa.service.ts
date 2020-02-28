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
export class TarefaService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number): Observable<Tarefa> {
        return this.modelService.getOne('tarefa', id)
            .pipe(
                map(response => plainToClass(Tarefa, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('tarefa', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Tarefa, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('tarefa', new HttpParams({fromObject: params}));
    }

    save(tarefa: Tarefa): Observable<Tarefa> {
        if (tarefa.id) {
            return this.modelService.put('tarefa', tarefa.id, classToPlain(tarefa))
                .pipe(
                    map(response => {
                        response = plainToClass(Tarefa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Tarefa(), {...tarefa, ...response});
                    })
                );
        } else {
            return this.modelService.post('tarefa', classToPlain(tarefa))
                .pipe(
                    map(response => {
                        response = plainToClass(Tarefa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Tarefa(), {...tarefa, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Tarefa> {
        return this.modelService.delete('tarefa', id);
    }

    ciencia(tarefa: Tarefa): Observable<Tarefa> {
        return this.http.patch(
            `${environment.api_url}${'tarefa'}/${tarefa.id}/${'ciencia'}` + environment.xdebug,
            JSON.stringify(classToPlain(tarefa))
        ).pipe(
            map(response => {
                response = plainToClass(Tarefa, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Tarefa(), {...tarefa, ...response});
            })
        );
    }

    toggleLida(tarefa: Tarefa): Observable<Tarefa> {
        return this.http.patch(
            `${environment.api_url}${'tarefa'}/${tarefa.id}/${'toggle_lida'}` + environment.xdebug,
            JSON.stringify(classToPlain(tarefa))
        ).pipe(
            map(response => {
                response = plainToClass(Tarefa, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Tarefa(), {...tarefa, ...response});
            })
        );
    }

    patch(tarefa: Tarefa, changes: any): Observable<Tarefa> {
        return this.http.patch(
            `${environment.api_url}${'tarefa'}/${tarefa.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map(response => {
                response = plainToClass(Tarefa, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Tarefa(), {...tarefa, ...response});
            })
        );
    }
}
