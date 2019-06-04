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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {CdkVinculacaoEtiquetaGridComponent} from './cdk-vinculacao-etiqueta-grid.component';
import {CdkVinculacaoEtiquetaAutocompleteModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-autocomplete/cdk-vinculacao-etiqueta-autocomplete.module';
import {CdkVinculacaoEtiquetaGridFilterModule} from './cdk-vinculacao-etiqueta-grid-filter/cdk-vinculacao-etiqueta-grid-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoEtiquetaGridComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        CdkVinculacaoEtiquetaAutocompleteModule,
        FuseSharedModule,
        CdkVinculacaoEtiquetaGridFilterModule
    ],
    providers: [
        VinculacaoEtiquetaService,
    ],
    exports: [
        CdkVinculacaoEtiquetaGridComponent
    ]
})
export class CdkVinculacaoEtiquetaGridModule {
}
