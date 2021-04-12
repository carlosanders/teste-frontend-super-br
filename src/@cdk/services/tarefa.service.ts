import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PaginatedResponse, Tarefa, Usuario} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass} from 'class-transformer';
import {environment} from 'environments/environment';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class TarefaService extends ParentGenericService<Tarefa> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/tarefa', Tarefa);
    }

    ciencia(tarefa: Tarefa, context: any = '{}'): Observable<Tarefa> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'administrativo/tarefa'}/${tarefa.id}/${'ciencia'}` + environment.xdebug,
            null,
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
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'administrativo/tarefa'}/${tarefa.id}/${'toggle_lida'}` + environment.xdebug,
            null,
            {params}
        ).pipe(
            map(response => {
                response = plainToClass(Tarefa, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Tarefa(), {...tarefa, ...response});
            })
        );
    }

    undelete(tarefa: Tarefa, context: any = '{}'): Observable<Tarefa> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'administrativo/tarefa'}/${tarefa.id}/${'undelete'}` + environment.xdebug,
            null,
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
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'administrativo/tarefa'}/${tarefa.id}` + environment.xdebug,
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

    gerarRelatorioTarefaExcel(): Observable<Tarefa> {
        return this.modelService.post('administrativo/relatorio/gerar_relatorio_minhas_tarefas');
    }

    distribuirTarefasUsuario(usuario: Usuario, context: any = '{}'): Observable<Tarefa> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'administrativo/tarefa'}/distribuir_tarefas_usuario/${usuario.id}` + environment.xdebug,
            null,
            {params}
        ).pipe(
            map(response => {
                response = plainToClass(Usuario, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Usuario(), {...usuario, ...response});
            })
        );
    }

    contarTarefaPastaUsuario(tarefa: Tarefa, context: any = '{}'): Observable<Tarefa> {
        console.log('zzzzzzzzzzzzzzzzzzzzzzzzzz');
        console.log(tarefa.usuarioResponsavel.id);
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.get(
            `${environment.api_url}${'administrativo/tarefa'}/contar_tarefa_pasta_usuario/${tarefa.usuarioResponsavel.id}` + environment.xdebug,
            {params}
        ).
        pipe(
            map(response => {
                return plainToClass(Tarefa, response);
            })
        );
    }

}
