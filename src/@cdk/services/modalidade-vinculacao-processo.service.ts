import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeVinculacaoProcesso} from '@cdk/models';

@Injectable()
export class ModalidadeVinculacaoProcessoService extends ParentGenericService<ModalidadeVinculacaoProcesso> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'modalidade_vinculacao_processo', ModalidadeVinculacaoProcesso);
    }
}