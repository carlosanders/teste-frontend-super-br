import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Usuario} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass} from 'class-transformer';
import {environment} from 'environments/environment';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class UsuarioService extends ParentGenericService<Usuario> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/usuario', Usuario);
    }

    patch(usuario: Usuario, changes: any, context: any = '{}'): Observable<Usuario> {
        const params: HttpParams = new HttpParams().set('context', context);
        return this.http.patch(
            `${environment.api_url}${'administrativo/usuario'}/${usuario.id}` + environment.xdebug,
            JSON.stringify(changes),
            {params}
        ).pipe(
            map((response) => {
                response = plainToClass(Usuario, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Usuario(), {...usuario, ...response});
            })
        );
    }

    active(cpf: number | string, token: number | string, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams().set('context', context);
        return this.http.patch(`${environment.api_url}administrativo/${'usuario'}/${cpf}/${token}/valida_usuario` + environment.xdebug, {params})
            .pipe(map((response) => {
                response = plainToClass(Usuario, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Usuario(), {...response});
            })
        );
    }

    resetaSenha(usuario: Usuario): Observable<Usuario> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/usuario'}/${usuario.id}/reseta_senha` + environment.xdebug,
            {}
        ).pipe(
            map((response) => {
                response = plainToClass(Usuario, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Usuario(), {...usuario, ...response});
            })
        );
    }

    obterGraficoTaxaSucessoJudicial(idUnidade: number): Observable<any> {
        const params: HttpParams = new HttpParams();
        params['context'] = '{}';
        return this.http.get(
            `${environment.api_url}grafico-taxa-sucesso-judicial` + environment.xdebug + `&id_unidade=${idUnidade}`,
            {params}
        );
    }
}
