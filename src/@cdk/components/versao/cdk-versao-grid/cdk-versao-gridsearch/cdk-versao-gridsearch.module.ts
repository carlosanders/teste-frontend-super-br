import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { LogEntryService } from '@cdk/services/logentry.service';
import { CdkVersaoGridsearchComponent } from './cdk-versao-gridsearch.component';
import {CdkVersaoGridModule} from '../cdk-versao-grid.module';

@NgModule({
    declarations: [
        CdkVersaoGridsearchComponent
    ],
    imports: [

        FuseSharedModule,
        CdkVersaoGridModule,
    ],
    providers: [
        LogEntryService
    ],
    exports: [
        CdkVersaoGridsearchComponent
    ]
})
export class CdkVersaoGridsearchModule {
}
