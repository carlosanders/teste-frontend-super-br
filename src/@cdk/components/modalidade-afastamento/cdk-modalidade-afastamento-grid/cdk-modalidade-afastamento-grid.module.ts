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
import { ModalidadeAfastamentoService } from '@cdk/services/modalidade-afastamento.service';
import { CdkModalidadeAfastamentoGridComponent} from './cdk-modalidade-afastamento-grid.component';
import { CdkModalidadeAfastamentoAutocompleteModule } from '@cdk/components/modalidade-afastamento/cdk-modalidade-afastamento-autocomplete/cdk-modalidade-afastamento-autocomplete.module';
import {CdkModalidadeAfastamentoGridFilterModule} from './cdk-modalidade-afastamento-grid-filter/cdk-modalidade-afastamento-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeAfastamentoGridComponent
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

        CdkModalidadeAfastamentoAutocompleteModule,
        CdkModalidadeAfastamentoGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeAfastamentoService,
    ],
    exports: [
        CdkModalidadeAfastamentoGridComponent
    ]
})
export class CdkModalidadeAfastamentoGridModule {
}
