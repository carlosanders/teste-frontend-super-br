import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {AssinaturaService} from '@cdk/services/assinatura.service';
import {CdkAssinaturaGridsearchComponent} from './cdk-assinatura-gridsearch.component';
import {CdkAssinaturaGridModule} from '@cdk/components/assinatura/cdk-assinatura-grid/cdk-assinatura-grid.module';

@NgModule({
    declarations: [
        CdkAssinaturaGridsearchComponent
    ],
    imports: [

        CdkAssinaturaGridModule,

        FuseSharedModule,
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
