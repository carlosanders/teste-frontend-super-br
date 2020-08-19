import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Workflow} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class WorkflowService extends ParentGenericService<Workflow> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'workflow', Workflow);
    }
}
