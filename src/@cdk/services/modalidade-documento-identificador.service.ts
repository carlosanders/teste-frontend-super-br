import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeDocumentoIdentificador} from '@cdk/models';

@Injectable()
export class ModalidadeDocumentoIdentificadorService extends ParentGenericService<ModalidadeDocumentoIdentificador> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'modalidade-documento-identificador', ModalidadeDocumentoIdentificador);
    }
}