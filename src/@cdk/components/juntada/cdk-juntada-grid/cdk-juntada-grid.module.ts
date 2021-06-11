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
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkJuntadaGridComponent} from './cdk-juntada-grid.component';
import {CdkJuntadaFilterModule} from '../sidebars/cdk-juntada-filter/cdk-juntada-filter.module';
import {MatFormFieldModule} from '../../../angular/material';
import {CdkAssinaturaEletronicaPluginModule} from '../../componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.module';
import {AssinaturaService} from '../../../services/assinatura.service';

@NgModule({
    declarations: [
        CdkJuntadaGridComponent,
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
        MatFormFieldModule,
        CdkJuntadaFilterModule,
        CdkAssinaturaEletronicaPluginModule,
        CdkSharedModule,
        CdkSidebarModule
    ],
    providers: [
        JuntadaService,
        AssinaturaService
    ],
    exports: [
        CdkJuntadaGridComponent
    ]
})
export class CdkJuntadaGridModule {
}
