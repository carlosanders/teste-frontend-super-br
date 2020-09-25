import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeAlvoInibidor} from '@cdk/models';

@Injectable()
export class ModalidadeAlvoInibidorService extends ParentGenericService<ModalidadeAlvoInibidor> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_alvo_inibidor', ModalidadeAlvoInibidor);
    }
}
