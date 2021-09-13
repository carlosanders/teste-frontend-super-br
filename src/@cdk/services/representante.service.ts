import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Representante} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class RepresentanteService extends ParentGenericService<Representante> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/representante', Representante);
    }
}
