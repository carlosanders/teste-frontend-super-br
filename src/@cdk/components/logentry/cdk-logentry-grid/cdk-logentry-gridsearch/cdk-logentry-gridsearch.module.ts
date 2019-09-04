import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { LogEntryService } from '@cdk/services/logentry.service';
import { CdkLogentryGridsearchComponent } from './cdk-logentry-gridsearch.component';
import { CdkLogentryGridModule } from '@cdk/components/logentry/cdk-logentry-grid/cdk-logentry-grid.module';

@NgModule({
    declarations: [
        CdkLogentryGridsearchComponent
    ],
    imports: [

        CdkLogentryGridModule,
        
        FuseSharedModule,
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
