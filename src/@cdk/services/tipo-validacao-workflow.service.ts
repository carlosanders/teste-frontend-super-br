import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {TipoValidacaoWorkflow} from '@cdk/models';

@Injectable()
export class TipoValidacaoWorkflowService extends ParentGenericService<TipoValidacaoWorkflow> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/tipo_validacao_workflow', TipoValidacaoWorkflow);
    }
}
