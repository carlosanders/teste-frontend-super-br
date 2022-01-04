import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';
import {VinculacaoWorkflow} from '../models/vinculacao-workflow.model';

@Injectable()
export class VinculacaoWorkflowService extends ParentGenericService<VinculacaoWorkflow> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/vinculacao_workflow', VinculacaoWorkflow);
    }
}
