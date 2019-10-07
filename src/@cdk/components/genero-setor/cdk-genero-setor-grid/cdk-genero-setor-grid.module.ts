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
import {GeneroSetorService} from '@cdk/services/genero-setor.service';
import {CdkGeneroSetorGridComponent} from './cdk-genero-setor-grid.component';
import {CdkGeneroSetorAutocompleteModule} from '@cdk/components/genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-autocomplete.module';
import {CdkGeneroSetorGridFilterModule} from './cdk-genero-setor-grid-filter/cdk-genero-setor-grid-filter.module';

@NgModule({
    declarations: [
        CdkGeneroSetorGridComponent
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

        CdkGeneroSetorAutocompleteModule,
        CdkGeneroSetorGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroSetorService,
    ],
    exports: [
        CdkGeneroSetorGridComponent
    ]
})
export class CdkGeneroSetorGridModule {
}
