import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {VinculacaoPessoaUsuario} from '@cdk/models';

@Injectable()
export class VinculacaoPessoaUsuarioService extends ParentGenericService<VinculacaoPessoaUsuario> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/vinculacao_pessoa_usuario', VinculacaoPessoaUsuario);
    }
}
