import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeQualificacaoPessoa} from '@cdk/models';

@Injectable()
export class ModalidadeQualificacaoPessoaService extends ParentGenericService<ModalidadeQualificacaoPessoa> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_qualificacao_pessoa', ModalidadeQualificacaoPessoa);
    }
}
