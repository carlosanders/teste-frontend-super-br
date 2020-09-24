import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Garantia} from '@cdk/models';

@Injectable()
export class GarantiaService extends ParentGenericService<Garantia> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/garantia', Garantia);
    }
}
