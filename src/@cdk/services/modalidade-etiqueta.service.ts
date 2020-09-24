import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeEtiqueta} from '@cdk/models';

@Injectable()
export class ModalidadeEtiquetaService extends ParentGenericService<ModalidadeEtiqueta> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_etiqueta', ModalidadeEtiqueta);
    }
}
