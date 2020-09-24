import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Assinatura} from '@cdk/models';

@Injectable()
export class AssinaturaService extends ParentGenericService<Assinatura> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/assinatura', Assinatura);
    }
}
