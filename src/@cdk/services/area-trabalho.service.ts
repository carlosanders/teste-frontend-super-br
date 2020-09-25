import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {AreaTrabalho} from '@cdk/models';

@Injectable()
export class AreaTrabalhoService extends ParentGenericService<AreaTrabalho> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/area_trabalho', AreaTrabalho);
    }
}
