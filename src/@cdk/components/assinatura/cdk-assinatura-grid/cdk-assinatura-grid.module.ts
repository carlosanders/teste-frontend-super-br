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
} from '@cdk/angular/material';

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkAssinaturaGridComponent} from './cdk-assinatura-grid.component';
import {CdkAssinaturaGridFilterModule} from './cdk-assinatura-grid-filter/cdk-assinatura-grid-filter.module';
import {CdkAssinaturaMainSidebarComponent} from './sidebars/main/main.component';
import {AssinaturaService} from '../../../services/assinatura.service';

@NgModule({
    declarations: [
        CdkAssinaturaGridComponent,
        CdkAssinaturaMainSidebarComponent,
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

        CdkAssinaturaGridFilterModule,

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
