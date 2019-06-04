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

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroAtividadeService} from '@cdk/services/genero-atividade.service';
import {CdkGeneroAtividadeGridComponent} from './cdk-genero-atividade-grid.component';
import {CdkGeneroAtividadeAutocompleteModule} from '@cdk/components/genero-atividade/cdk-genero-atividade-autocomplete/cdk-genero-atividade-autocomplete.module';
import {CdkGeneroAtividadeGridFilterModule} from './cdk-genero-atividade-grid-filter/cdk-genero-atividade-grid-filter.module';

@NgModule({
    declarations: [
        CdkGeneroAtividadeGridComponent
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
        CdkGeneroAtividadeAutocompleteModule,
        FuseSharedModule,
        CdkGeneroAtividadeGridFilterModule
    ],
    providers: [
        GeneroAtividadeService,
    ],
    exports: [
        CdkGeneroAtividadeGridComponent
    ]
})
export class CdkGeneroAtividadeGridModule {
}
