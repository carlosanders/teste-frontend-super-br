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
import {ModalidadeInteressadoService} from '@cdk/services/modalidade-interessado.service';
import {CdkModalidadeInteressadoGridComponent} from './cdk-modalidade-interessado-grid.component';
import {CdkModalidadeInteressadoAutocompleteModule} from '@cdk/components/modalidade-interessado/cdk-modalidade-interessado-autocomplete/cdk-modalidade-interessado-autocomplete.module';
import {CdkModalidadeInteressadoGridFilterModule} from './cdk-modalidade-interessado-grid-filter/cdk-modalidade-interessado-grid-filter.module';
import {CdkModalidadeInteressadoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeInteressadoGridComponent,
        CdkModalidadeInteressadoMainSidebarComponent,
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

        CdkModalidadeInteressadoAutocompleteModule,
        CdkModalidadeInteressadoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        ModalidadeInteressadoService,
    ],
    exports: [
        CdkModalidadeInteressadoGridComponent
    ]
})
export class CdkModalidadeInteressadoGridModule {
}
