import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeRepositorio} from '@cdk/models';

@Injectable()
export class ModalidadeRepositorioService extends ParentGenericService<ModalidadeRepositorio> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_repositorio', ModalidadeRepositorio);
    }
}
