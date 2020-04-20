import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {EspecieTarefa} from '@cdk/models';

@Injectable()
export class EspecieTarefaService extends ParentGenericService<EspecieTarefa> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'especie_tarefa', EspecieTarefa);
    }
}