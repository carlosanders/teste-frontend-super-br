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
import {GeneroDocumentoAvulsoService} from '@cdk/services/genero-documento-avulso.service';
import {CdkGeneroDocumentoAvulsoGridComponent} from './cdk-genero-documento-avulso-grid.component';
import {CdkGeneroDocumentoAvulsoAutocompleteModule} from '@cdk/components/genero-documento-avulso/cdk-genero-documento-avulso-autocomplete/cdk-genero-documento-avulso-autocomplete.module';
import {CdkGeneroDocumentoAvulsoFilterModule} from '../sidebars/cdk-genero-documento-avulso-filter/cdk-genero-documento-avulso-filter.module';

@NgModule({
    declarations: [
        CdkGeneroDocumentoAvulsoGridComponent,
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
        MatSelectModule,

        CdkGeneroDocumentoAvulsoAutocompleteModule,
        CdkGeneroDocumentoAvulsoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        GeneroDocumentoAvulsoService,
    ],
    exports: [
        CdkGeneroDocumentoAvulsoGridComponent
    ]
})
export class CdkGeneroDocumentoAvulsoGridModule {
}
