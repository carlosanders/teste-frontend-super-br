import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {VinculacaoProcesso} from '@cdk/models';

@Injectable()
export class VinculacaoProcessoService extends ParentGenericService<VinculacaoProcesso> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/vinculacao_processo', VinculacaoProcesso);
    }
}
