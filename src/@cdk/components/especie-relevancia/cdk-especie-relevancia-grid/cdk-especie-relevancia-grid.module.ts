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
import {EspecieRelevanciaService} from '@cdk/services/especie-relevancia.service';
import {CdkEspecieRelevanciaGridComponent} from './cdk-especie-relevancia-grid.component';
import {CdkEspecieRelevanciaAutocompleteModule} from '@cdk/components/especie-relevancia/cdk-especie-relevancia-autocomplete/cdk-especie-relevancia-autocomplete.module';
import {CdkEspecieRelevanciaFilterModule} from '../sidebars/cdk-especie-relevancia-filter/cdk-especie-relevancia-filter.module';

@NgModule({
    declarations: [
        CdkEspecieRelevanciaGridComponent,
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

        CdkEspecieRelevanciaAutocompleteModule,
        CdkEspecieRelevanciaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
