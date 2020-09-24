import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeColaborador} from '@cdk/models';

@Injectable()
export class ModalidadeColaboradorService extends ParentGenericService<ModalidadeColaborador> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_colaborador', ModalidadeColaborador);
    }
}
