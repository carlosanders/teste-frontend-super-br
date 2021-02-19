import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {TipoAcaoWorkflow} from '@cdk/models';

@Injectable()
export class TipoAcaoWorkflowService extends ParentGenericService<TipoAcaoWorkflow> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/tipo_acao_workflow', TipoAcaoWorkflow);
    }
}
