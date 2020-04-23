import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {EspecieAtividade} from '@cdk/models';

@Injectable()
export class EspecieAtividadeService extends ParentGenericService<EspecieAtividade> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'especie_atividade', EspecieAtividade);
    }
}