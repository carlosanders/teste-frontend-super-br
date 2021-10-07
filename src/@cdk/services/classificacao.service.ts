import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Classificacao, Visibilidade} from '@cdk/models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable()
export class ClassificacaoService extends ParentGenericService<Classificacao> {

    constructor(protected modelService: ModelService,
                protected http: HttpClient) {
        super(modelService, 'administrativo/classificacao', Classificacao);
    }

    patch(classificacao: Classificacao, changes: any): Observable<Classificacao>
    {
        return this.http.patch(
            `${environment.api_url}${'administrativo/classificacao'}/${classificacao.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(Classificacao, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Classificacao(), {...classificacao, ...response});
            })
        );
    }

    getVisibilidade(id: number, context: any = '{}'): Observable<any>
    {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/classificacao/${id}/visibilidade` + environment.xdebug, {params})
            .pipe(
                map(response => plainToClass(Visibilidade, response))
            );
    }

    createVisibilidade(id: number, visibilidade: Visibilidade, context: any = '{}'): Observable<Visibilidade>
    {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.put(
            `${environment.api_url}administrativo/classificacao/${id}/visibilidade` + environment.xdebug,
            JSON.stringify(visibilidade),
            {params}
        ).pipe(
            map(response => plainToClass(Visibilidade, response))
        );
    }

    destroyVisibilidade(classificacaoId: number, visibilidadeId: number, context: any = '{}'): Observable<any>
    {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.delete(
            `${environment.api_url}administrativo/classificacao/${classificacaoId}/visibilidade/${visibilidadeId}` + environment.xdebug,
            {params}
        );
    }
}
