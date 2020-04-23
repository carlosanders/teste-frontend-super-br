import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {AssuntoAdministrativo} from '@cdk/models';

@Injectable()
export class AssuntoAdministrativoService extends ParentGenericService<AssuntoAdministrativo> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'assunto_administrativo', AssuntoAdministrativo);
    }
}