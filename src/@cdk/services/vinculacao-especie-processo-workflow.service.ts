import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';
import {VinculacaoEspecieProcessoWorkflow} from '../models/vinculacao-especie-processo-workflow.model';

@Injectable()
export class VinculacaoEspecieProcessoWorkflowService extends ParentGenericService<VinculacaoEspecieProcessoWorkflow> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(
            modelService,
            'administrativo/vinculacao_especie_processo_workflow',
            VinculacaoEspecieProcessoWorkflow
        );
    }
}
