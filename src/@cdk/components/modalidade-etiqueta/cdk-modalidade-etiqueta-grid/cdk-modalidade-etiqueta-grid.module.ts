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

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeEtiquetaService } from '@cdk/services/modalidade-etiqueta.service';
import { CdkModalidadeEtiquetaGridComponent} from './cdk-modalidade-etiqueta-grid.component';
import { CdkModalidadeEtiquetaGridFilterComponent } from './cdk-modalidade-etiqueta-grid-filter/cdk-modalidade-etiqueta-grid-filter.component';
import { CdkModalidadeEtiquetaAutocompleteModule } from '@cdk/components/modalidade-etiqueta/cdk-modalidade-etiqueta-autocomplete/cdk-modalidade-etiqueta-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeEtiquetaGridComponent,
        CdkModalidadeEtiquetaGridFilterComponent
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

        CdkModalidadeEtiquetaAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeEtiquetaService,
    ],
    exports: [
        CdkModalidadeEtiquetaGridComponent
    ]
})
export class CdkModalidadeEtiquetaGridModule {
}
