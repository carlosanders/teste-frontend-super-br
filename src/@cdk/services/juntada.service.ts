import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Juntada} from '@cdk/models';

@Injectable()
export class JuntadaService extends ParentGenericService<Juntada> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'juntada', Juntada);
    }
}