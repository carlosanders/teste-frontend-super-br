import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeAlvoInibidorService} from '@cdk/services/modalidade-alvo-inibidor.service';
import {CdkModalidadeAlvoInibidorGridsearchComponent} from './cdk-modalidade-alvo-inibidor-gridsearch.component';
import {CdkModalidadeAlvoInibidorGridModule} from '@cdk/components/modalidade-alvo-inibidor/cdk-modalidade-alvo-inibidor-grid/cdk-modalidade-alvo-inibidor-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeAlvoInibidorGridsearchComponent
    ],
    imports: [

        CdkModalidadeAlvoInibidorGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeAlvoInibidorService
    ],
    exports: [
        CdkModalidadeAlvoInibidorGridsearchComponent
    ]
})
export class CdkModalidadeAlvoInibidorGridsearchModule {
}
