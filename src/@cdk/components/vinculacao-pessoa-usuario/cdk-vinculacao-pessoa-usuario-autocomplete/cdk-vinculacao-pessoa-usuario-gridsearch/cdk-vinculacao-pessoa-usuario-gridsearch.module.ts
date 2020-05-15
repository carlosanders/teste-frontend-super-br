import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoPessoaUsuarioGridsearchComponent} from './cdk-vinculacao-pessoa-usuario-gridsearch.component';
import {VinculacaoPessoaUsuarioService} from '../../../../services/vinculacao-pessoa-usuario.service';
import {CdkVinculacaoPessoaUsuarioGridModule} from '../../cdk-vinculacao-pessoa-usuario-grid/cdk-vinculacao-pessoa-usuario-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoPessoaUsuarioGridsearchComponent
    ],
    imports: [
        CdkVinculacaoPessoaUsuarioGridModule,
        CdkSharedModule,
    ],
    providers: [
        VinculacaoPessoaUsuarioService
    ],
    exports: [
        CdkVinculacaoPessoaUsuarioGridsearchComponent
    ]
})
export class CdkVinculacaoPessoaUsuarioGridsearchModule {
}
