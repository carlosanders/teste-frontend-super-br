import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Localizador} from '@cdk/models';

@Injectable()
export class LocalizadorService extends ParentGenericService<Localizador> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/localizador', Localizador);
    }
}
