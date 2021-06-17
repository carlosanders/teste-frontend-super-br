import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {TipoContato} from '../models/tipo-contato.model';

@Injectable()
export class TipoContatoService extends ParentGenericService<TipoContato> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/tipo_contato', TipoContato);
    }

}
