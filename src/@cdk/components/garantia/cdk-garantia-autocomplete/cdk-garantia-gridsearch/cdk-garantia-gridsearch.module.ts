import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {GarantiaService} from '@cdk/services/garantia.service';
import {CdkGarantiaGridsearchComponent} from './cdk-garantia-gridsearch.component';
import {CdkGarantiaGridModule} from '@cdk/components/garantia/cdk-garantia-grid/cdk-garantia-grid.module';

@NgModule({
    declarations: [
        CdkGarantiaGridsearchComponent
    ],
    imports: [

        CdkGarantiaGridModule,

        FuseSharedModule,
    ],
    providers: [
        GarantiaService
    ],
    exports: [
        CdkGarantiaGridsearchComponent
    ]
})
export class CdkGarantiaGridsearchModule {
}
