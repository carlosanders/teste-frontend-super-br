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
import {RelevanciaService} from '@cdk/services/relevancia.service';
import {CdkRelevanciaGridComponent} from './cdk-relevancia-grid.component';
import {CdkRelevanciaAutocompleteModule} from '@cdk/components/relevancia/cdk-relevancia-autocomplete/cdk-relevancia-autocomplete.module';
import {CdkRelevanciaGridFilterModule} from './cdk-relevancia-grid-filter/cdk-relevancia-grid-filter.module';

@NgModule({
    declarations: [
        CdkRelevanciaGridComponent
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
        CdkRelevanciaAutocompleteModule,
        FuseSharedModule,
        CdkRelevanciaGridFilterModule
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
