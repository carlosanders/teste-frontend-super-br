import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {GrupoContato} from "../models/grupo-contato.model";

@Injectable()
export class GrupoContatoService extends ParentGenericService<GrupoContato> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/grupo_contato', GrupoContato);
    }

}
