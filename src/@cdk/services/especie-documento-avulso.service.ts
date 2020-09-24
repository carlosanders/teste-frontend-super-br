import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {EspecieDocumentoAvulso} from '@cdk/models';

@Injectable()
export class EspecieDocumentoAvulsoService extends ParentGenericService<EspecieDocumentoAvulso> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/especie_documento_avulso', EspecieDocumentoAvulso);
    }
}
