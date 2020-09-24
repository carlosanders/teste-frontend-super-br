import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Etiqueta} from '@cdk/models';

@Injectable()
export class EtiquetaService extends ParentGenericService<Etiqueta> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/etiqueta', Etiqueta);
    }
}
