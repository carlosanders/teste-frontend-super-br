import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {EspecieRelatorio} from '@cdk/models/especie-relatorio.model';

@Injectable()
export class EspecieRelatorioService extends ParentGenericService<EspecieRelatorio> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/especie_relatorio', EspecieRelatorio);
    }
}
