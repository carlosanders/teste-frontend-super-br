import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {RelacionamentoPessoal} from '@cdk/models';

@Injectable()
export class RelacionamentoPessoalService extends ParentGenericService<RelacionamentoPessoal> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/relacionamento_pessoal', RelacionamentoPessoal);
    }
}
