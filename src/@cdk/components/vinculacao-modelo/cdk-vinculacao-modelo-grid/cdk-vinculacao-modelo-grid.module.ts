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
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {CdkVinculacaoModeloGridComponent} from './cdk-vinculacao-modelo-grid.component';
import {CdkVinculacaoModeloAutocompleteModule} from '@cdk/components/vinculacao-modelo/cdk-vinculacao-modelo-autocomplete/cdk-vinculacao-modelo-autocomplete.module';
import {CdkVinculacaoModeloGridFilterModule} from './cdk-vinculacao-modelo-grid-filter/cdk-vinculacao-modelo-grid-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoModeloGridComponent
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

        CdkVinculacaoModeloAutocompleteModule,
        CdkVinculacaoModeloGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        VinculacaoModeloService,
    ],
    exports: [
        CdkVinculacaoModeloGridComponent
    ]
})
export class CdkVinculacaoModeloGridModule {
}
