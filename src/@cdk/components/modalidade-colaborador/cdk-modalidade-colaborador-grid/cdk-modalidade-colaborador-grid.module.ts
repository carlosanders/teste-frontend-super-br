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
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeColaboradorService } from '@cdk/services/modalidade-colaborador.service';
import { CdkModalidadeColaboradorGridComponent} from './cdk-modalidade-colaborador-grid.component';
import { CdkModalidadeColaboradorGridFilterComponent } from './cdk-modalidade-colaborador-grid-filter/cdk-modalidade-colaborador-grid-filter.component';
import { CdkModalidadeColaboradorAutocompleteModule } from '@cdk/components/modalidade-colaborador/cdk-modalidade-colaborador-autocomplete/cdk-modalidade-colaborador-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeColaboradorGridComponent,
        CdkModalidadeColaboradorGridFilterComponent
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

        CdkModalidadeColaboradorAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeColaboradorService,
    ],
    exports: [
        CdkModalidadeColaboradorGridComponent
    ]
})
export class CdkModalidadeColaboradorGridModule {
}
