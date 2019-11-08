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
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {CdkVinculacaoModeloGridComponent} from './cdk-vinculacao-modelo-grid.component';
import {CdkVinculacaoModeloAutocompleteModule} from '@cdk/components/vinculacao-modelo/cdk-vinculacao-modelo-autocomplete/cdk-vinculacao-modelo-autocomplete.module';
import {CdkVinculacaoModeloGridFilterModule} from './cdk-vinculacao-modelo-grid-filter/cdk-vinculacao-modelo-grid-filter.module';
import {CdkVinculacaoModeloMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkVinculacaoModeloGridComponent,
        CdkVinculacaoModeloMainSidebarComponent,
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
        FuseSidebarModule,
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
