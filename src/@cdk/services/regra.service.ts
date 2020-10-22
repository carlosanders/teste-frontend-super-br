import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Regra} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class RegraService extends ParentGenericService<Regra> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/regra', Regra);
    }
}
