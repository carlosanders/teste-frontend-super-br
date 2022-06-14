import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from '@cdk/services/parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ConfigModulo} from '../models';

@Injectable()
export class ConfigModuloService extends ParentGenericService<ConfigModulo> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/config_modulo', ConfigModulo);
    }
}
