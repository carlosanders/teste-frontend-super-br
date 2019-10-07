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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {CdkDesentranhamentoGridComponent} from './cdk-desentranhamento-grid.component';
import {CdkDesentranhamentoAutocompleteModule} from '@cdk/components/desentranhamento/cdk-desentranhamento-autocomplete/cdk-desentranhamento-autocomplete.module';
import {CdkDesentranhamentoGridFilterModule} from './cdk-desentranhamento-grid-filter/cdk-desentranhamento-grid-filter.module';

@NgModule({
    declarations: [
        CdkDesentranhamentoGridComponent
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
        FuseSharedModule,
        CdkDesentranhamentoGridFilterModule
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
