import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Feriado} from '@cdk/models';

@Injectable()
export class FeriadoService extends ParentGenericService<Feriado> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/feriado', Feriado);
    }
}
