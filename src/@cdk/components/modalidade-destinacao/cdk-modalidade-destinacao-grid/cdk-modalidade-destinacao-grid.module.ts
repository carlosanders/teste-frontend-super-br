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
import { ModalidadeDestinacaoService } from '@cdk/services/modalidade-destinacao.service';
import { CdkModalidadeDestinacaoGridComponent} from './cdk-modalidade-destinacao-grid.component';
import { CdkModalidadeDestinacaoGridFilterComponent } from './cdk-modalidade-destinacao-grid-filter/cdk-modalidade-destinacao-grid-filter.component';
import { CdkModalidadeDestinacaoAutocompleteModule } from '@cdk/components/modalidade-destinacao/cdk-modalidade-destinacao-autocomplete/cdk-modalidade-destinacao-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeDestinacaoGridComponent,
        CdkModalidadeDestinacaoGridFilterComponent
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

        CdkModalidadeDestinacaoAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeDestinacaoService,
    ],
    exports: [
        CdkModalidadeDestinacaoGridComponent
    ]
})
export class CdkModalidadeDestinacaoGridModule {
}
