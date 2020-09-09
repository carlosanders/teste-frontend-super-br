import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Afastamento} from '@cdk/models';

@Injectable()
export class AfastamentoService extends ParentGenericService<Afastamento> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/afastamento', Afastamento);
    }
}
