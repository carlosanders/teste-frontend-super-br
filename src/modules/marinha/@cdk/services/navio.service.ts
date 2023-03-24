import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from '@cdk/services/parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Navio} from '../models/navio.model';

@Injectable()
export class NavioService extends ParentGenericService<Navio> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/navio', Navio);
    }
}
