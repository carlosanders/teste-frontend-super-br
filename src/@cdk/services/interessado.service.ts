import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Interessado} from '@cdk/models';

@Injectable()
export class InteressadoService extends ParentGenericService<Interessado> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/interessado', Interessado);
    }
}
