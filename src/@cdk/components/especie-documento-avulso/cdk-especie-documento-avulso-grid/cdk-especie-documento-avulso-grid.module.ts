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

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';
import {CdkEspecieDocumentoAvulsoGridComponent} from './cdk-especie-documento-avulso-grid.component';
import {CdkEspecieDocumentoAvulsoAutocompleteModule} from '@cdk/components/especie-documento-avulso/cdk-especie-documento-avulso-autocomplete/cdk-especie-documento-avulso-autocomplete.module';
import {CdkEspecieDocumentoAvulsoGridFilterModule} from './cdk-especie-documento-avulso-grid-filter/cdk-especie-documento-avulso-grid-filter.module';
import {CdkEspecieDocumentoAvulsoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkEspecieDocumentoAvulsoGridComponent,
        CdkEspecieDocumentoAvulsoMainSidebarComponent,
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

        CdkEspecieDocumentoAvulsoGridFilterModule,
        CdkEspecieDocumentoAvulsoAutocompleteModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        EspecieDocumentoAvulsoService,
    ],
    exports: [
        CdkEspecieDocumentoAvulsoGridComponent
    ]
})
export class CdkEspecieDocumentoAvulsoGridModule {
}
