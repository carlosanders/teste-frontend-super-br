import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSelectModule,
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {CdkAssinaturaGridComponent} from './cdk-assinatura-grid.component';
import {CdkAssinaturaGridFilterModule} from './cdk-assinatura-grid-filter/cdk-assinatura-grid-filter.module';

@NgModule({
    declarations: [
        CdkAssinaturaGridComponent
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkAssinaturaGridFilterModule,

        FuseSharedModule,
        MatTooltipModule,
    ],
    providers: [],
    exports: [
        CdkAssinaturaGridComponent
    ]
})
export class CdkAssinaturaGridModule {
}
