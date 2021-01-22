import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegraEtiqueta} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class RegraEtiquetaService extends ParentGenericService<RegraEtiqueta> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/regra_etiqueta', RegraEtiqueta);
    }
}
