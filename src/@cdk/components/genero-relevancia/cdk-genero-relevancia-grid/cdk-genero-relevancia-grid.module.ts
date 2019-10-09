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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroRelevanciaService} from '@cdk/services/genero-relevancia.service';
import {CdkGeneroRelevanciaGridComponent} from './cdk-genero-relevancia-grid.component';
import {CdkGeneroRelevanciaAutocompleteModule} from '@cdk/components/genero-relevancia/cdk-genero-relevancia-autocomplete/cdk-genero-relevancia-autocomplete.module';
import {CdkGeneroRelevanciaGridFilterModule} from './cdk-genero-relevancia-grid-filter/cdk-genero-relevancia-grid-filter.module';

@NgModule({
    declarations: [
        CdkGeneroRelevanciaGridComponent
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

        CdkGeneroRelevanciaAutocompleteModule,
        CdkGeneroRelevanciaGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroRelevanciaService,
    ],
    exports: [
        CdkGeneroRelevanciaGridComponent
    ]
})
export class CdkGeneroRelevanciaGridModule {
}
