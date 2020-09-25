import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {GeneroDocumentoAvulso} from '@cdk/models';

@Injectable()
export class GeneroDocumentoAvulsoService extends ParentGenericService<GeneroDocumentoAvulso> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/genero_documento_avulso', GeneroDocumentoAvulso);
    }
}
