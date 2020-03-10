import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {AssinaturaService} from '@cdk/services/assinatura.service';
import {CdkAssinaturaGridsearchComponent} from './cdk-assinatura-gridsearch.component';
import {CdkAssinaturaGridModule} from '@cdk/components/assinatura/cdk-assinatura-grid/cdk-assinatura-grid.module';

@NgModule({
    declarations: [
        CdkAssinaturaGridsearchComponent
    ],
    imports: [

        CdkAssinaturaGridModule,

        CdkSharedModule,
    ],
    providers: [
        AssinaturaService
    ],
    exports: [
        CdkAssinaturaGridsearchComponent
    ]
})
export class CdkAssinaturaGridsearchModule {
}
