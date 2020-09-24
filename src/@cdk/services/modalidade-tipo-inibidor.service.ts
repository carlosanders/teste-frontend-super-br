import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeTipoInibidor} from '@cdk/models';

@Injectable()
export class ModalidadeTipoInibidorService extends ParentGenericService<ModalidadeTipoInibidor> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_tipo_inibidor', ModalidadeTipoInibidor);
    }
}
