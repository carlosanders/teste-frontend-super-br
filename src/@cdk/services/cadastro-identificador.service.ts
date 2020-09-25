import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {CadastroIdentificador} from '@cdk/models';

@Injectable()
export class CadastroIdentificadorService extends ParentGenericService<CadastroIdentificador> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/cadastro_identificador', CadastroIdentificador);
    }
}
