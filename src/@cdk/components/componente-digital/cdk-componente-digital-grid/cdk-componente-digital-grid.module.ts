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
    MatProgressBarModule,
    MatTooltipModule,
    MatSelectModule,
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkComponenteDigitalGridComponent} from './cdk-componente-digital-grid.component';
import {CdkComponenteDigitalGridFilterModule} from './cdk-componente-digital-grid-filter/cdk-componente-digital-grid-filter.module';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {CdkComponenteDigitalMainSidebarComponent} from './sidebars/main/main.component';
import {CdkChaveAcessoPluginModule} from '../../chave-acesso/cdk-chave-acesso-plugins/cdk-chave-acesso-plugin.module';

@NgModule({
    declarations: [
        CdkComponenteDigitalGridComponent,
        CdkComponenteDigitalMainSidebarComponent,
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

        CdkComponenteDigitalGridFilterModule,

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
