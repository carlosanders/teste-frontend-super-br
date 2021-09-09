import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Notificacao} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {classToPlain, plainToClass} from 'class-transformer';
import {environment} from 'environments/environment';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class NotificacaoService extends ParentGenericService<Notificacao> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/notificacao', Notificacao);
    }

    toggleLida(notificacao: Notificacao, context: any = '{}'): Observable<Notificacao> {
        const params = {};
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'administrativo/notificacao'}/${notificacao.id}/${'toggle_lida'}` + environment.xdebug,
            JSON.stringify(classToPlain(notificacao)),
            {params}
        ).pipe(
            map((response) => {
                response = plainToClass(Notificacao, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Notificacao(), {...notificacao, ...response});
            })
        );
    }

    marcarTodas(context: any = '{}'): Observable<any> {
        const params = {};
        params['context'] = context;

        return this.http.patch(
            `${environment.api_url}${'administrativo/notificacao'}/marcar_todas` + environment.xdebug,
            params
        );
    }

    excluirTodas(context: any = '{}'): Observable<any> {
        const params = {};
        params['context'] = context;

        return this.http.patch(
            `${environment.api_url}${'administrativo/notificacao'}/excluir_todas` + environment.xdebug,
            params
        );
    }
}
