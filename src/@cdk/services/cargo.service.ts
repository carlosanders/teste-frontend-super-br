import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Cargo} from '@cdk/models';

@Injectable()
export class CargoService extends ParentGenericService<Cargo> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/cargo', Cargo);
    }
}
