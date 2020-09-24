import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeMeio} from '@cdk/models';

@Injectable()
export class ModalidadeMeioService extends ParentGenericService<ModalidadeMeio> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_meio', ModalidadeMeio);
    }
}
