import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeAcaoEtiqueta} from '@cdk/models';

@Injectable()
export class ModalidadeAcaoEtiquetaService extends ParentGenericService<ModalidadeAcaoEtiqueta> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_acao_etiqueta', ModalidadeAcaoEtiqueta);
    }
}
