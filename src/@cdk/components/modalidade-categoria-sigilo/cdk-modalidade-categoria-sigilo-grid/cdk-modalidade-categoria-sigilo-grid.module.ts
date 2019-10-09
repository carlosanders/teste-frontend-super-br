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
import {ModalidadeCategoriaSigiloService} from '@cdk/services/modalidade-categoria-sigilo.service';
import {CdkModalidadeCategoriaSigiloGridComponent} from './cdk-modalidade-categoria-sigilo-grid.component';
import {CdkModalidadeCategoriaSigiloAutocompleteModule} from '@cdk/components/modalidade-categoria-sigilo/cdk-modalidade-categoria-sigilo-autocomplete/cdk-modalidade-categoria-sigilo-autocomplete.module';
import {CdkModalidadeCategoriaSigiloGridFilterModule} from './cdk-modalidade-categoria-sigilo-grid-filter/cdk-modalidade-categoria-sigilo-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeCategoriaSigiloGridComponent
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
