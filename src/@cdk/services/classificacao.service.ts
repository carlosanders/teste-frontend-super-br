import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Classificacao} from '@cdk/models';

@Injectable()
export class ClassificacaoService extends ParentGenericService<Classificacao> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'classificacao', Classificacao);
    }
}