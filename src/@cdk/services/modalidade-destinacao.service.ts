import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeDestinacao} from '@cdk/models';

@Injectable()
export class ModalidadeDestinacaoService extends ParentGenericService<ModalidadeDestinacao> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_destinacao', ModalidadeDestinacao);
    }
}
