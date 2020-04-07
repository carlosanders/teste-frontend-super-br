import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Xxx} from '@cdk/models';

@Injectable()
export class XxxService extends ParentGenericService<Xxx> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'Xxx', Xxx);
    }
}