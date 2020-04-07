import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Notificacao} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {environment} from 'environments/environment';
import {ParentGenericService} from './parent-generic.service';
import {Notificacao} from '../models';

@Injectable()
export class NotificacaoService extends ParentGenericService<Notificacao> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'notificacao', Notificacao);
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
