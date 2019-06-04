import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {RelevanciaService} from '@cdk/services/relevancia.service';
import {CdkRelevanciaGridsearchComponent} from './cdk-relevancia-gridsearch.component';
import {CdkRelevanciaGridModule} from '@cdk/components/relevancia/cdk-relevancia-grid/cdk-relevancia-grid.module';

@NgModule({
    declarations: [
        CdkRelevanciaGridsearchComponent
    ],
    imports: [

        CdkRelevanciaGridModule,

        FuseSharedModule,
    ],
    providers: [
        RelevanciaService
    ],
    exports: [
        CdkRelevanciaGridsearchComponent
    ]
})
export class CdkRelevanciaGridsearchModule {
}
