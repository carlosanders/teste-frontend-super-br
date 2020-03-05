import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {CadastroIdentificadorService} from '@cdk/services/cadastro-identificador.service';
import {CdkCadastroIdentificadorGridsearchComponent} from './cdk-cadastro-identificador-gridsearch.component';
import {CdkCadastroIdentificadorGridModule} from '@cdk/components/cadastro-identificador/cdk-cadastro-identificador-grid/cdk-cadastro-identificador-grid.module';

@NgModule({
    declarations: [
        CdkCadastroIdentificadorGridsearchComponent
    ],
    imports: [

        CdkCadastroIdentificadorGridModule,

        CdkSharedModule,
    ],
    providers: [
        CadastroIdentificadorService
    ],
    exports: [
        CdkCadastroIdentificadorGridsearchComponent
    ]
})
export class CdkCadastroIdentificadorGridsearchModule {
}
