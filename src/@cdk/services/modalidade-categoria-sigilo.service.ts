import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeCategoriaSigilo} from '@cdk/models';

@Injectable()
export class ModalidadeCategoriaSigiloService extends ParentGenericService<ModalidadeCategoriaSigilo> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_categoria_sigilo', ModalidadeCategoriaSigilo);
    }
}
