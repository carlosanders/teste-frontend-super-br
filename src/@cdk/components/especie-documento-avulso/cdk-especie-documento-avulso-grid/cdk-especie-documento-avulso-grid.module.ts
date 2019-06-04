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
import { EspecieDocumentoAvulsoService } from '@cdk/services/especie-documento-avulso.service';
import { CdkEspecieDocumentoAvulsoGridComponent} from './cdk-especie-documento-avulso-grid.component';
import { CdkEspecieDocumentoAvulsoGridFilterComponent } from './cdk-especie-documento-avulso-grid-filter/cdk-especie-documento-avulso-grid-filter.component';
import { CdkEspecieDocumentoAvulsoAutocompleteModule } from '@cdk/components/especie-documento-avulso/cdk-especie-documento-avulso-autocomplete/cdk-especie-documento-avulso-autocomplete.module';

@NgModule({
    declarations: [
        CdkEspecieDocumentoAvulsoGridComponent,
        CdkEspecieDocumentoAvulsoGridFilterComponent
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

        CdkEspecieDocumentoAvulsoAutocompleteModule,

        FuseSharedModule,
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
