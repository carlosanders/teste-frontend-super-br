import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {CronjobService} from '@cdk/services/cronjob.service';
import {CdkCronjobGridsearchComponent} from './cdk-cronjob-gridsearch.component';
import {CdkCronjobGridModule} from '@cdk/components/cronjob/cdk-cronjob-grid/cdk-cronjob-grid.module';

@NgModule({
    declarations: [
        CdkCronjobGridsearchComponent
    ],
    imports: [
        CdkCronjobGridModule,
        CdkSharedModule,
    ],
    providers: [
        CronjobService
    ],
    exports: [
        CdkCronjobGridsearchComponent
    ]
})
export class CdkCronjobGridsearchModule {
}
