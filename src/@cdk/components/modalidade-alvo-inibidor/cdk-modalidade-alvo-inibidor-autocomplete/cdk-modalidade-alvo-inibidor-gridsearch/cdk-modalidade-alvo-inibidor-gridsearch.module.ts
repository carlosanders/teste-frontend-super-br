import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ModalidadeAlvoInibidorService } from '@cdk/services/modalidade-alvo-inibidor.service';
import { CdkModalidadeAlvoInibidorGridsearchComponent } from './cdk-modalidade-alvo-inibidor-gridsearch.component';
import { CdkModalidadeAlvoInibidorGridModule } from '@cdk/components/modalidade-alvo-inibidor/cdk-modalidade-alvo-inibidor-grid/cdk-modalidade-alvo-inibidor-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeAlvoInibidorGridsearchComponent
    ],
    imports: [

        CdkModalidadeAlvoInibidorGridModule,
        
        FuseSharedModule,
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
