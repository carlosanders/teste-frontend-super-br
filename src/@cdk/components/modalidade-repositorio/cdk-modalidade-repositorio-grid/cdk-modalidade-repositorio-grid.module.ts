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
import {ModalidadeRepositorioService} from '@cdk/services/modalidade-repositorio.service';
import {CdkModalidadeRepositorioGridComponent} from './cdk-modalidade-repositorio-grid.component';
import {CdkModalidadeRepositorioAutocompleteModule} from '@cdk/components/modalidade-repositorio/cdk-modalidade-repositorio-autocomplete/cdk-modalidade-repositorio-autocomplete.module';
import {CdkModalidadeRepositorioGridFilterModule} from './cdk-modalidade-repositorio-grid-filter/cdk-modalidade-repositorio-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeRepositorioGridComponent
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

        CdkModalidadeRepositorioAutocompleteModule,
        CdkModalidadeRepositorioGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeRepositorioService,
    ],
    exports: [
        CdkModalidadeRepositorioGridComponent
    ]
})
export class CdkModalidadeRepositorioGridModule {
}
