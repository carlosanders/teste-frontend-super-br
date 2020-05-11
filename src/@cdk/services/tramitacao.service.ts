import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Tramitacao} from '@cdk/models';

@Injectable()
export class TramitacaoService extends ParentGenericService<Tramitacao> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'tramitacao', Tramitacao);
    }
}