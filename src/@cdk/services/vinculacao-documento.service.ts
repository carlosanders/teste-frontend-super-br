import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {VinculacaoDocumento} from '@cdk/models';

@Injectable()
export class VinculacaoDocumentoService extends ParentGenericService<VinculacaoDocumento> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/vinculacao_documento', VinculacaoDocumento);
    }
}
