import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {TipoDocumento} from '@cdk/models';

@Injectable()
export class TipoDocumentoService extends ParentGenericService<TipoDocumento> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'tipo-documento', TipoDocumento);
    }
}