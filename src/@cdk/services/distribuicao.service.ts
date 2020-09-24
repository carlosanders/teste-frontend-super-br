import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Distribuicao} from '@cdk/models';

@Injectable()
export class DistribuicaoService extends ParentGenericService<Distribuicao> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/distribuicao', Distribuicao);
    }
}
