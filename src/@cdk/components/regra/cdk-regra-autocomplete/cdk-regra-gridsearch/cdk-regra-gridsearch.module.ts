import { NgModule } from '@angular/core';

import { CdkSharedModule } from '@cdk/shared.module';

import { CdkRegraGridsearchComponent } from './cdk-regra-gridsearch.component';
import {CdkRegraGridModule} from '../../cdk-regra-grid/cdk-regra-grid.module';
import {RegraService} from '@cdk/services/regra.service';

@NgModule({
    declarations: [
        CdkRegraGridsearchComponent
    ],
    imports: [
        CdkRegraGridModule,

        CdkSharedModule,
    ],
    providers: [
        RegraService
    ],
    exports: [
        CdkRegraGridsearchComponent
    ]
})
export class CdkRegraGridsearchModule {
}
