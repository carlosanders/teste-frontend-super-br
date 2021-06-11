import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkComponenteDigitalGridComponent} from './cdk-componente-digital-grid.component';
import {CdkComponenteDigitalFilterModule} from '../sidebars/cdk-componente-digital-filter/cdk-componente-digital-filter.module';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {CdkChaveAcessoPluginModule} from '../../chave-acesso/cdk-chave-acesso-plugins/cdk-chave-acesso-plugin.module';

@NgModule({
    declarations: [
        CdkComponenteDigitalGridComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,

        PipesModule,

        CdkComponenteDigitalFilterModule,

        CdkSharedModule,
        CdkSidebarModule,

        CdkChaveAcessoPluginModule
    ],
    providers: [],
    exports: [
        CdkComponenteDigitalGridComponent
    ]
})
export class CdkComponenteDigitalGridModule {
}
