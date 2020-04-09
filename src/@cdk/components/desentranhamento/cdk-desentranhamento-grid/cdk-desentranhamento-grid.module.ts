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
    MatSelectModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {CdkDesentranhamentoGridComponent} from './cdk-desentranhamento-grid.component';
import {CdkDesentranhamentoAutocompleteModule} from '@cdk/components/desentranhamento/cdk-desentranhamento-autocomplete/cdk-desentranhamento-autocomplete.module';
import {CdkDesentranhamentoGridFilterModule} from '../sidebars/cdk-desentranhamento-grid-filter/cdk-desentranhamento-grid-filter.module';
import {CdkDesentranhamentoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkDesentranhamentoGridComponent,
        CdkDesentranhamentoMainSidebarComponent,
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

        CdkDesentranhamentoAutocompleteModule,
        CdkDesentranhamentoGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        DesentranhamentoService,
    ],
    exports: [
        CdkDesentranhamentoGridComponent
    ]
})
export class CdkDesentranhamentoGridModule {
}
