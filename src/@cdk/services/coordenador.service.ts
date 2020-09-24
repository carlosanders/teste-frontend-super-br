import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Coordenador} from '@cdk/models';

@Injectable()
export class CoordenadorService extends ParentGenericService<Coordenador> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/coordenador', Coordenador);
    }
}
