import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from '@cdk/services/parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Modulo} from '../models';

@Injectable()
export class ModuloService extends ParentGenericService<Modulo> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modulo', Modulo);
    }
}
