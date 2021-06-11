import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ConfiguracaoNup} from '@cdk/models/configuracao-nup.model';

@Injectable()
export class ConfiguracaoNupService extends ParentGenericService<ConfiguracaoNup> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/configuracao_nup', ConfiguracaoNup);
    }
}
