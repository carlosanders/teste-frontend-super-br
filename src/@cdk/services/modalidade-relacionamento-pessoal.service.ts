import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeRelacionamentoPessoal} from '@cdk/models';

@Injectable()
export class ModalidadeRelacionamentoPessoalService extends ParentGenericService<ModalidadeRelacionamentoPessoal> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_relacionamento_pessoal', ModalidadeRelacionamentoPessoal);
    }
}
