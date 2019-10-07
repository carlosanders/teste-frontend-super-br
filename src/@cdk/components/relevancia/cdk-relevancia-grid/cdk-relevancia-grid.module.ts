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
import {RelevanciaService} from '@cdk/services/relevancia.service';
import {CdkRelevanciaGridComponent} from './cdk-relevancia-grid.component';
import {CdkRelevanciaAutocompleteModule} from '@cdk/components/relevancia/cdk-relevancia-autocomplete/cdk-relevancia-autocomplete.module';
import {CdkRelevanciaGridFilterModule} from './cdk-relevancia-grid-filter/cdk-relevancia-grid-filter.module';

@NgModule({
    declarations: [
        CdkRelevanciaGridComponent
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

        CdkRelevanciaAutocompleteModule,
        CdkRelevanciaGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        RelevanciaService,
    ],
    exports: [
        CdkRelevanciaGridComponent
    ]
})
export class CdkRelevanciaGridModule {
}
