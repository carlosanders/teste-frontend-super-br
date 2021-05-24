import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Workflow} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class WorkflowService extends ParentGenericService<Workflow> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/workflow', Workflow);
    }

    workflowViewTransicoesAction(id: number | string, params: HttpParams = new HttpParams(), context: any = '{}'): Observable<any> {
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/workflow/${id}/view/transicoes` + environment.xdebug, {params});
    }
}
