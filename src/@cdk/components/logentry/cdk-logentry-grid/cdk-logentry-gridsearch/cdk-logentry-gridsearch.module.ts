import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {LogEntryService} from '@cdk/services/logentry.service';
import {CdkLogentryGridsearchComponent} from './cdk-logentry-gridsearch.component';
import {CdkLogentryGridModule} from '@cdk/components/logentry/cdk-logentry-grid/cdk-logentry-grid.module';

@NgModule({
    declarations: [
        CdkLogentryGridsearchComponent
    ],
    imports: [

        CdkLogentryGridModule,

        CdkSharedModule,
    ],
    providers: [
        LogEntryService
    ],
    exports: [
        CdkLogentryGridsearchComponent
    ]
})
export class CdkLogentryGridsearchModule {
}
