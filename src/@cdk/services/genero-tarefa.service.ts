import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {GeneroTarefa} from '@cdk/models';

@Injectable()
export class GeneroTarefaService extends ParentGenericService<GeneroTarefa> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/genero_tarefa', GeneroTarefa);
    }
}
