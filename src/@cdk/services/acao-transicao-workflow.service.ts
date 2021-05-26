import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';
import {AcaoTransicaoWorkflow} from '@cdk/models/acao-transicao-workflow.model';

@Injectable()
export class AcaoTransicaoWorkflowService extends ParentGenericService<AcaoTransicaoWorkflow> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/acao_transicao_workflow', AcaoTransicaoWorkflow);
    }
}
