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
} from '@cdk/angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroProcessoService} from '@cdk/services/genero-processo.service';
import {CdkGeneroProcessoGridComponent} from './cdk-genero-processo-grid.component';
import {CdkGeneroProcessoAutocompleteModule} from '@cdk/components/genero-processo/cdk-genero-processo-autocomplete/cdk-genero-processo-autocomplete.module';
import {CdkGeneroProcessoGridFilterModule} from './cdk-genero-processo-grid-filter/cdk-genero-processo-grid-filter.module';
import {CdkGeneroProcessoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkGeneroProcessoGridComponent,
        CdkGeneroProcessoMainSidebarComponent,
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
        MatSelectModule,

        CdkGeneroProcessoAutocompleteModule,
        CdkGeneroProcessoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        GeneroProcessoService,
    ],
    exports: [
        CdkGeneroProcessoGridComponent
    ]
})
export class CdkGeneroProcessoGridModule {
}
