import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Relevancia} from '@cdk/models';

@Injectable()
export class RelevanciaService extends ParentGenericService<Relevancia> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/relevancia', Relevancia);
    }
}
