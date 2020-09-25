import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {GeneroProcesso} from '@cdk/models';

@Injectable()
export class GeneroProcessoService extends ParentGenericService<GeneroProcesso> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/genero_processo', GeneroProcesso);
    }
}
