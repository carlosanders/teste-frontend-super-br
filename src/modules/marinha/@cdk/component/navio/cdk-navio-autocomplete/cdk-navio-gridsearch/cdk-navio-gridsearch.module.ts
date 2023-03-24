import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {NavioService} from '../../../../services/navio.service';
import {CdkNavioGridsearchComponent} from './cdk-navio-gridsearch.component';
import {CdkNavioGridModule} from '../../cdk-navio-grid/cdk-navio-grid.module';

@NgModule({
    declarations: [
        CdkNavioGridsearchComponent
    ],
    imports: [

        CdkNavioGridModule,

        CdkSharedModule,
    ],
    providers: [
        NavioService
    ],
    exports: [
        CdkNavioGridsearchComponent
    ]
})
export class CdkNavioGridsearchModule {
}
