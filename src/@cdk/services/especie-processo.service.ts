import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {EspecieProcesso} from '@cdk/models';

@Injectable()
export class EspecieProcessoService extends ParentGenericService<EspecieProcesso> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'especie_processo', EspecieProcesso);
    }
}