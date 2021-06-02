import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ConfiguracaoNup} from '@cdk/models/configuracao-nup.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class ConfiguracaoNupService extends ParentGenericService<ConfiguracaoNup> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/configuracao_nup', ConfiguracaoNup);
    }
}
