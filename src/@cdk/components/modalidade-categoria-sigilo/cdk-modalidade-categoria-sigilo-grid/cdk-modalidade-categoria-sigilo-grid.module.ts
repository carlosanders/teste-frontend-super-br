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
import {ModalidadeCategoriaSigiloService} from '@cdk/services/modalidade-categoria-sigilo.service';
import {CdkModalidadeCategoriaSigiloGridComponent} from './cdk-modalidade-categoria-sigilo-grid.component';
import {CdkModalidadeCategoriaSigiloAutocompleteModule} from '@cdk/components/modalidade-categoria-sigilo/cdk-modalidade-categoria-sigilo-autocomplete/cdk-modalidade-categoria-sigilo-autocomplete.module';
import {CdkModalidadeCategoriaSigiloGridFilterModule} from './cdk-modalidade-categoria-sigilo-grid-filter/cdk-modalidade-categoria-sigilo-grid-filter.module';
import {CdkModalidadeCategoriaSigiloMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeCategoriaSigiloGridComponent,
        CdkModalidadeCategoriaSigiloMainSidebarComponent,
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

        CdkModalidadeCategoriaSigiloAutocompleteModule,
        CdkModalidadeCategoriaSigiloGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        ModalidadeCategoriaSigiloService,
    ],
    exports: [
        CdkModalidadeCategoriaSigiloGridComponent
    ]
})
export class CdkModalidadeCategoriaSigiloGridModule {
}
