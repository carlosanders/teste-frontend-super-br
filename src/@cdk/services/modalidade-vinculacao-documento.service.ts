import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeVinculacaoDocumento} from '@cdk/models';

@Injectable()
export class ModalidadeVinculacaoDocumentoService extends ParentGenericService<ModalidadeVinculacaoDocumento> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_vinculacao_documento', ModalidadeVinculacaoDocumento);
    }
}
