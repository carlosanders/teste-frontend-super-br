import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {LogEntryService} from '@cdk/services/logentry.service';
import {CdkVersaoGridsearchComponent} from './cdk-versao-gridsearch.component';
import {CdkVersaoGridModule} from '../cdk-versao-grid/cdk-versao-grid.module';

@NgModule({
    declarations: [
        CdkVersaoGridsearchComponent
    ],
    imports: [

        CdkSharedModule,
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
