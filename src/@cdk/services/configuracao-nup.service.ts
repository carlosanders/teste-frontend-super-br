import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ConfiguracaoNup} from "@cdk/models/configuracao-nup.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class ConfiguracaoNupService extends ParentGenericService<ConfiguracaoNup> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/configuracao_nup', ConfiguracaoNup);
    }

    validarNup(id: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams().set('context', context);
        return this.http.get(`${environment.api_url}administrativo/1/validar_nup/12312321312312321` + environment.xdebug, {params});
    }
}
