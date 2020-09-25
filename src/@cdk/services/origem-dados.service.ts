import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {OrigemDados} from '@cdk/models';

@Injectable()
export class OrigemDadosService extends ParentGenericService<OrigemDados> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/origem_dados', OrigemDados);
    }
}
