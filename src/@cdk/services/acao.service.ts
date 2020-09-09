import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Acao} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class AcaoService extends ParentGenericService<Acao> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/acao', Acao);
    }
}
