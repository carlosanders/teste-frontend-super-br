import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Colaborador} from '@cdk/models';

@Injectable()
export class ColaboradorService extends ParentGenericService<Colaborador> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/colaborador', Colaborador);
    }
}
