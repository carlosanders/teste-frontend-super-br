import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {DocumentoIdentificador} from '@cdk/models';

@Injectable()
export class DocumentoIdentificadorService extends ParentGenericService<DocumentoIdentificador> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/documento_identificador', DocumentoIdentificador);
    }
}
