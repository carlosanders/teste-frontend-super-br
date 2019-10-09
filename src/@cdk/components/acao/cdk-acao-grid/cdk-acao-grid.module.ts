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
import {AcaoService} from '@cdk/services/acao.service';
import {CdkAcaoGridComponent} from './cdk-acao-grid.component';
import {CdkAcaoAutocompleteModule} from '@cdk/components/acao/cdk-acao-autocomplete/cdk-acao-autocomplete.module';
import {CdkAcaoGridFilterModule} from './cdk-acao-grid-filter/cdk-acao-grid-filter.module';
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        CdkAcaoGridComponent
    ],
    imports: [
        CommonModule,

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatSelectModule,

        CdkAcaoAutocompleteModule,
        CdkAcaoGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        AcaoService,
    ],
    exports: [
        CdkAcaoGridComponent
    ]
})
export class CdkAcaoGridModule {
}
