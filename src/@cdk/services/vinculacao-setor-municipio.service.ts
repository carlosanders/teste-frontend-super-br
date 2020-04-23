import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {VinculacaoSetorMunicipio} from '@cdk/models';

@Injectable()
export class VinculacaoSetorMunicipioService extends ParentGenericService<VinculacaoSetorMunicipio> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'vinculacao_setor_municipio', VinculacaoSetorMunicipio);
    }
}