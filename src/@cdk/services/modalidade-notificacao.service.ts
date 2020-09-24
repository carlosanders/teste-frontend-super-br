import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeNotificacao} from '@cdk/models';

@Injectable()
export class ModalidadeNotificacaoService extends ParentGenericService<ModalidadeNotificacao> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_notificacao', ModalidadeNotificacao);
    }
}
