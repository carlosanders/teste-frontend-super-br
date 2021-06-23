import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeTipoInibidorService} from '@cdk/services/modalidade-tipo-inibidor.service';
import {CdkModalidadeTipoInibidorGridsearchComponent} from './cdk-modalidade-tipo-inibidor-gridsearch.component';
import {CdkModalidadeTipoInibidorGridModule} from '@cdk/components/modalidade-tipo-inibidor/cdk-modalidade-tipo-inibidor-grid/cdk-modalidade-tipo-inibidor-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeTipoInibidorGridsearchComponent
    ],
    imports: [

        CdkModalidadeTipoInibidorGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeTipoInibidorService
    ],
    exports: [
        CdkModalidadeTipoInibidorGridsearchComponent
    ]
})
export class CdkModalidadeTipoInibidorGridsearchModule {
}
