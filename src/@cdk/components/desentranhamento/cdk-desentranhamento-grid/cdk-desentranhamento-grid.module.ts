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
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {CdkDesentranhamentoGridComponent} from './cdk-desentranhamento-grid.component';
import {CdkDesentranhamentoAutocompleteModule} from '@cdk/components/desentranhamento/cdk-desentranhamento-autocomplete/cdk-desentranhamento-autocomplete.module';
import {CdkDesentranhamentoFilterModule} from '../sidebars/cdk-desentranhamento-filter/cdk-desentranhamento-filter.module';

@NgModule({
    declarations: [
        CdkDesentranhamentoGridComponent,
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
        CdkDesentranhamentoFilterModule,

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
