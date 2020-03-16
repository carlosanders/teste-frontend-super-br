import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {RelevanciaService} from '@cdk/services/relevancia.service';
import {CdkRelevanciaGridsearchComponent} from './cdk-relevancia-gridsearch.component';
import {CdkRelevanciaGridModule} from '@cdk/components/relevancia/cdk-relevancia-grid/cdk-relevancia-grid.module';

@NgModule({
    declarations: [
        CdkRelevanciaGridsearchComponent
    ],
    imports: [

        CdkRelevanciaGridModule,

        CdkSharedModule,
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
