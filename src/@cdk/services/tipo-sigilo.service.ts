import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {TipoSigilo} from '@cdk/models';

@Injectable()
export class TipoSigiloService extends ParentGenericService<TipoSigilo> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/tipo_sigilo', TipoSigilo);
    }
}
