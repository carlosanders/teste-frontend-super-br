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
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {CdkVinculacaoProcessoGridComponent} from './cdk-vinculacao-processo-grid.component';
import {CdkVinculacaoProcessoAutocompleteModule} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-autocomplete/cdk-vinculacao-processo-autocomplete.module';
import {CdkVinculacaoProcessoGridFilterModule} from './cdk-vinculacao-processo-grid-filter/cdk-vinculacao-processo-grid-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoProcessoGridComponent
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkVinculacaoProcessoAutocompleteModule,
        CdkVinculacaoProcessoGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        VinculacaoProcessoService,
    ],
    exports: [
        CdkVinculacaoProcessoGridComponent
    ]
})
export class CdkVinculacaoProcessoGridModule {
}
