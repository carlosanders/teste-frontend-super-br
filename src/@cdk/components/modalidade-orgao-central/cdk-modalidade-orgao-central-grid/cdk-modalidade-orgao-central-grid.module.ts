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
import { ModalidadeOrgaoCentralService } from '@cdk/services/modalidade-orgao-central.service';
import { CdkModalidadeOrgaoCentralGridComponent} from './cdk-modalidade-orgao-central-grid.component';
import { CdkModalidadeOrgaoCentralGridFilterComponent } from './cdk-modalidade-orgao-central-grid-filter/cdk-modalidade-orgao-central-grid-filter.component';
import { CdkModalidadeOrgaoCentralAutocompleteModule } from '@cdk/components/modalidade-orgao-central/cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeOrgaoCentralGridComponent,
        CdkModalidadeOrgaoCentralGridFilterComponent
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

        CdkModalidadeOrgaoCentralAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeOrgaoCentralService,
    ],
    exports: [
        CdkModalidadeOrgaoCentralGridComponent
    ]
})
export class CdkModalidadeOrgaoCentralGridModule {
}
