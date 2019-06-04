import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkCargoGridFilterComponent } from './cdk-cargo-grid-filter.component';

@NgModule({
    declarations: [
        CdkCargoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [

    ],
    exports: [
        CdkCargoGridFilterComponent
    ]
})
export class CdkCargoGridFilterModule {
}
