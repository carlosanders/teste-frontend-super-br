import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Tarefa} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {environment} from 'environments/environment';
import {ParentGenericService} from './parent-generic.service';
import {Tarefa} from '../models';

@Injectable()
export class TarefaService extends ParentGenericService<Tarefa> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'tarefa', Tarefa);
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
