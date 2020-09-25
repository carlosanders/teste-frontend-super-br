import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeRepresentante} from '@cdk/models';

@Injectable()
export class ModalidadeRepresentanteService extends ParentGenericService<ModalidadeRepresentante> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_representante', ModalidadeRepresentante);
    }
}
