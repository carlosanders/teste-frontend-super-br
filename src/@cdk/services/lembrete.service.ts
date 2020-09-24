import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Lembrete} from '@cdk/models';

@Injectable()
export class LembreteService extends ParentGenericService<Lembrete> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/lembrete', Lembrete);
    }
}
