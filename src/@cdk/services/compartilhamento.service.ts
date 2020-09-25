import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Compartilhamento} from '@cdk/models';

@Injectable()
export class CompartilhamentoService extends ParentGenericService<Compartilhamento> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/compartilhamento', Compartilhamento);
    }
}
