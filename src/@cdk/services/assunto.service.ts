import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Assunto} from '@cdk/models';

@Injectable()
export class AssuntoService extends ParentGenericService<Assunto> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/assunto', Assunto);
    }
}
