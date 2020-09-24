import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ModalidadeTemplate} from '@cdk/models';

@Injectable()
export class ModalidadeTemplateService extends ParentGenericService<ModalidadeTemplate> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/modalidade_template', ModalidadeTemplate);
    }
}
