import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {GeneroAtividade} from '@cdk/models';

@Injectable()
export class GeneroAtividadeService extends ParentGenericService<GeneroAtividade> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/genero_atividade', GeneroAtividade);
    }
}
