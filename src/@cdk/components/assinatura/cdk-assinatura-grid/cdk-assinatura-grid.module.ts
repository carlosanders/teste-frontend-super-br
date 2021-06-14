import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
} from '@cdk/angular/material';

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkAssinaturaGridComponent} from './cdk-assinatura-grid.component';
import {CdkAssinaturaFilterModule} from '../sidebars/cdk-assinatura-filter/cdk-assinatura-filter.module';
import {AssinaturaService} from '../../../services/assinatura.service';

@NgModule({
    declarations: [
        CdkAssinaturaGridComponent,
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
        MatTooltipModule,

        CdkAssinaturaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        AssinaturaService
    ],
    exports: [
        CdkAssinaturaGridComponent
    ]
})
export class CdkAssinaturaGridModule {
}
