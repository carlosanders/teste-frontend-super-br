import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tarefa} from '@cdk/models/tarefa.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';
import {environment} from '../../environments/environment';

@Injectable()
export class TarefaService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number): Observable<Tarefa> {
        return this.modelService.getOne('tarefa', id)
            .map(response => plainToClass(Tarefa, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('tarefa', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Tarefa, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('tarefa', new HttpParams({fromObject: params}));
    }

    save(tarefa: Tarefa): Observable<Tarefa> {
        if (tarefa.id) {
            return this.modelService.put('tarefa', tarefa.id, classToPlain(tarefa))
                .map(response => {
                    response = plainToClass(Tarefa, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Tarefa(), {...tarefa, ...response});
                });
        } else {
            return this.modelService.post('tarefa', classToPlain(tarefa))
                .map(response => {
                    response = plainToClass(Tarefa, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Tarefa(), {...tarefa, ...response});
                });
        }
    }

    destroy(id: number): Observable<Tarefa> {
        return this.modelService.delete('tarefa', id);
    }

    toggleLida(tarefa: Tarefa): Observable<Tarefa> {
        return this.http.patch(
            `${environment.api_url}${'tarefa'}/${tarefa.id}/${'toggle_lida'}` + environment.xdebug,
            JSON.stringify(classToPlain(tarefa))
        ).map(response => {
            response = plainToClass(Tarefa, response);
            Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
            return Object.assign(new Tarefa(), {...tarefa, ...response});
        });
    }

    patch(tarefa: Tarefa, changes: any): Observable<Tarefa> {
        return this.http.patch(
            `${environment.api_url}${'tarefa'}/${tarefa.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).map(response => {
            response = plainToClass(Tarefa, response);
            Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
            return Object.assign(new Tarefa(), {...tarefa, ...response});
        });
    }
}
