import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {GeneroRelatorio} from '@cdk/models';

@Injectable()
export class GeneroRelatorioService extends ParentGenericService<GeneroRelatorio> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'genero_relatorio', GeneroRelatorio);
    }
}