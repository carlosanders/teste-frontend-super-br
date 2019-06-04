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
import { EspecieRelevanciaService } from '@cdk/services/especie-relevancia.service';
import { CdkEspecieRelevanciaGridComponent} from './cdk-especie-relevancia-grid.component';
import { CdkEspecieRelevanciaGridFilterComponent } from './cdk-especie-relevancia-grid-filter/cdk-especie-relevancia-grid-filter.component';
import { CdkEspecieRelevanciaAutocompleteModule } from '@cdk/components/especie-relevancia/cdk-especie-relevancia-autocomplete/cdk-especie-relevancia-autocomplete.module';

@NgModule({
    declarations: [
        CdkEspecieRelevanciaGridComponent,
        CdkEspecieRelevanciaGridFilterComponent
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

        CdkEspecieRelevanciaAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieRelevanciaService,
    ],
    exports: [
        CdkEspecieRelevanciaGridComponent
    ]
})
export class CdkEspecieRelevanciaGridModule {
}
