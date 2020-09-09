import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {EspecieSetor} from '@cdk/models';

@Injectable()
export class EspecieSetorService extends ParentGenericService<EspecieSetor> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/especie_setor', EspecieSetor);
    }
}