import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeGeneroPessoa} from '@cdk/models';

@Injectable()
export class ModalidadeGeneroPessoaService extends ParentGenericService<ModalidadeGeneroPessoa> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_genero_pessoa', ModalidadeGeneroPessoa);
    }
}
