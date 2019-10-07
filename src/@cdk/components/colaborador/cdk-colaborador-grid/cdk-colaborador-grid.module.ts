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
import {ModalidadeColaboradorService} from '@cdk/services/modalidade-colaborador.service';
import {CdkModalidadeColaboradorAutocompleteModule} from '@cdk/components/modalidade-colaborador/cdk-modalidade-colaborador-autocomplete/cdk-modalidade-colaborador-autocomplete.module';
import {CdkColaboradorGridComponent} from './cdk-colaborador-grid.component';
import {CdkColaboradorGridFilterModule} from './cdk-colaborador-grid-filter/cdk-colaborador-grid-filter.module';

@NgModule({
    declarations: [
        CdkColaboradorGridComponent
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

        CdkModalidadeColaboradorAutocompleteModule,
        CdkColaboradorGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeColaboradorService,
    ],
    exports: [
        CdkColaboradorGridComponent
    ]
})
export class CdkColaboradorGridModule {
}
