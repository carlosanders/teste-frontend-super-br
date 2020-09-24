import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Atividade} from '@cdk/models';

@Injectable()
export class AtividadeService extends ParentGenericService<Atividade> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/atividade', Atividade);
    }
}
