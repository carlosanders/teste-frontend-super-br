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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {ModalidadeEtiquetaService} from '@cdk/services/modalidade-etiqueta.service';
import {CdkModalidadeEtiquetaGridComponent} from './cdk-modalidade-etiqueta-grid.component';
import {CdkModalidadeEtiquetaAutocompleteModule} from '@cdk/components/modalidade-etiqueta/cdk-modalidade-etiqueta-autocomplete/cdk-modalidade-etiqueta-autocomplete.module';
import {CdkModalidadeEtiquetaGridFilterModule} from './cdk-modalidade-etiqueta-grid-filter/cdk-modalidade-etiqueta-grid-filter.module';
import {CdkModalidadeEtiquetaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeEtiquetaGridComponent,
        CdkModalidadeEtiquetaMainSidebarComponent,
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

        CdkModalidadeEtiquetaAutocompleteModule,
        CdkModalidadeEtiquetaGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
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
