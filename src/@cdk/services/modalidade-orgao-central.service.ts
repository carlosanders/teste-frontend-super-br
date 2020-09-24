import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeOrgaoCentral} from '@cdk/models';

@Injectable()
export class ModalidadeOrgaoCentralService extends ParentGenericService<ModalidadeOrgaoCentral> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_orgao_central', ModalidadeOrgaoCentral);
    }
}
