import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeTransicao} from '@cdk/models';

@Injectable()
export class ModalidadeTransicaoService extends ParentGenericService<ModalidadeTransicao> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_transicao', ModalidadeTransicao);
    }
}
