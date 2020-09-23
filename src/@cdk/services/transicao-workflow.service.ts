import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';
import {TransicaoWorkflow} from '../models';

@Injectable()
export class TransicaoWorkflowService extends ParentGenericService<TransicaoWorkflow> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/transicao_workflow', TransicaoWorkflow);
    }
}
