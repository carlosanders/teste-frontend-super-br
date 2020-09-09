import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Tramitacao} from '@cdk/models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class TramitacaoService extends ParentGenericService<Tramitacao> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/tramitacao', Tramitacao);
    }

    imprimirGuia(id: number | string, params: HttpParams = new HttpParams(), context: any = '{}'): Observable<any> {
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/tramitacao/imprime_guia/${id}` + environment.xdebug, {params});
    }
}
