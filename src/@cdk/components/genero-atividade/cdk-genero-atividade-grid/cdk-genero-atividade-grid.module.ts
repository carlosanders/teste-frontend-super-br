import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {GeneroAtividadeService} from '@cdk/services/genero-atividade.service';
import {CdkGeneroAtividadeGridComponent} from './cdk-genero-atividade-grid.component';
import {CdkGeneroAtividadeAutocompleteModule} from '@cdk/components/genero-atividade/cdk-genero-atividade-autocomplete/cdk-genero-atividade-autocomplete.module';
import {CdkGeneroAtividadeFilterModule} from '../sidebars/cdk-genero-atividade-filter/cdk-genero-atividade-filter.module';

@NgModule({
    declarations: [
        CdkGeneroAtividadeGridComponent,
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

        CdkGeneroAtividadeAutocompleteModule,
        CdkGeneroAtividadeFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
