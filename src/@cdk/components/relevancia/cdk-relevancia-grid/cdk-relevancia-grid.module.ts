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
import {RelevanciaService} from '@cdk/services/relevancia.service';
import {CdkRelevanciaGridComponent} from './cdk-relevancia-grid.component';
import {CdkRelevanciaAutocompleteModule} from '@cdk/components/relevancia/cdk-relevancia-autocomplete/cdk-relevancia-autocomplete.module';
import {CdkRelevanciaFilterModule} from '../sidebars/cdk-relevancia-filter/cdk-relevancia-filter.module';

@NgModule({
    declarations: [
        CdkRelevanciaGridComponent,
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
        CdkRelevanciaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
