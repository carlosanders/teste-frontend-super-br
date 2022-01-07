import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';
import {VinculacaoTransicaoWorkflow} from '../models/vinculacao-transicao-workflow.model';

@Injectable()
export class VinculacaoTransicaoWorkflowService extends ParentGenericService<VinculacaoTransicaoWorkflow> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/vinculacao_transicao_workflow', VinculacaoTransicaoWorkflow);
    }
}
