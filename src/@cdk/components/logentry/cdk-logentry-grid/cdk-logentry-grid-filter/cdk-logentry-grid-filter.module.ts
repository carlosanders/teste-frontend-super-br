import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {LogEntryService} from '@cdk/services/logentry.service';
import {CdkLogentryGridFilterComponent} from './cdk-logentry-grid-filter.component';

@NgModule({
    declarations: [
        CdkLogentryGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        LogEntryService,
    ],
    exports: [
        CdkLogentryGridFilterComponent
    ]
})
export class CdkLogentryGridFilterModule {
}
