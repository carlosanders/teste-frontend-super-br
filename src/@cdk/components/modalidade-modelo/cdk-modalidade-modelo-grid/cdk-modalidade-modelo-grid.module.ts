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
import {ModalidadeModeloService} from '@cdk/services/modalidade-modelo.service';
import {CdkModalidadeModeloGridComponent} from './cdk-modalidade-modelo-grid.component';
import {CdkModalidadeModeloAutocompleteModule} from '@cdk/components/modalidade-modelo/cdk-modalidade-modelo-autocomplete/cdk-modalidade-modelo-autocomplete.module';
import {CdkModalidadeModeloGridFilterModule} from './cdk-modalidade-modelo-grid-filter/cdk-modalidade-modelo-grid-filter.module';
import {CdkModalidadeModeloMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeModeloGridComponent,
        CdkModalidadeModeloMainSidebarComponent,
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

        CdkModalidadeModeloAutocompleteModule,
        CdkModalidadeModeloGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        ModalidadeModeloService,
    ],
    exports: [
        CdkModalidadeModeloGridComponent
    ]
})
export class CdkModalidadeModeloGridModule {
}
