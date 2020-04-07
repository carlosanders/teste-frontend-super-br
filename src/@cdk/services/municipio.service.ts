import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Municipio} from '@cdk/models';

@Injectable()
export class MunicipioService extends ParentGenericService<Municipio> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'municipio', Municipio);
    }
}