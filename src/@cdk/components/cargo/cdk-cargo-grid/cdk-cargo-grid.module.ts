import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, MatTooltipModule,
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkCargoGridComponent} from './cdk-cargo-grid.component';
import { CdkCargoGridFilterModule } from './cdk-cargo-grid-filter/cdk-cargo-grid-filter.module';

@NgModule({
    declarations: [
        CdkCargoGridComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkCargoGridFilterModule,

        FuseSharedModule,
        MatTooltipModule,
    ],
    providers: [
        
    ],
    exports: [
        CdkCargoGridComponent
    ]
})
export class CdkCargoGridModule {
}
