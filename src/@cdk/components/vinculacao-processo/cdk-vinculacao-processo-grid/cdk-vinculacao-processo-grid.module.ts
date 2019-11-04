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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {CdkVinculacaoProcessoGridComponent} from './cdk-vinculacao-processo-grid.component';
import {CdkVinculacaoProcessoAutocompleteModule} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-autocomplete/cdk-vinculacao-processo-autocomplete.module';
import {CdkVinculacaoProcessoGridFilterModule} from './cdk-vinculacao-processo-grid-filter/cdk-vinculacao-processo-grid-filter.module';
import {CdkVinculacaoProcessoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkVinculacaoProcessoGridComponent,
        CdkVinculacaoProcessoMainSidebarComponent,
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
        FuseSidebarModule,
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
