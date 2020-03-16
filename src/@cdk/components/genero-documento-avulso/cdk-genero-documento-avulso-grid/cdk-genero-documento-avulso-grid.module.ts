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
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {GeneroDocumentoAvulsoService} from '@cdk/services/genero-documento-avulso.service';
import {CdkGeneroDocumentoAvulsoGridComponent} from './cdk-genero-documento-avulso-grid.component';
import {CdkGeneroDocumentoAvulsoAutocompleteModule} from '@cdk/components/genero-documento-avulso/cdk-genero-documento-avulso-autocomplete/cdk-genero-documento-avulso-autocomplete.module';
import {CdkGeneroDocumentoAvulsoGridFilterModule} from './cdk-genero-documento-avulso-grid-filter/cdk-genero-documento-avulso-grid-filter.module';
import {CdkGeneroDocumentoAvulsoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkGeneroDocumentoAvulsoGridComponent,
        CdkGeneroDocumentoAvulsoMainSidebarComponent,
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
        CdkGeneroDocumentoAvulsoGridFilterModule,

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
