import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Sigilo} from '@cdk/models';

@Injectable()
export class SigiloService extends ParentGenericService<Sigilo> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/sigilo', Sigilo);
    }
}
