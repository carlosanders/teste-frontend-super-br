import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';

@Injectable()
export class ValidacaoTransicaoWorkflowService extends ParentGenericService<ValidacaoTransicaoWorkflow> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
        ) {
            super(modelService, 'administrativo/validacao_transicao_workflow', ValidacaoTransicaoWorkflow);
        }
}
