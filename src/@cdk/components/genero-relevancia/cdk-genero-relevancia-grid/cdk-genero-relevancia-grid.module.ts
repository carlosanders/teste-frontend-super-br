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
import {GeneroRelevanciaService} from '@cdk/services/genero-relevancia.service';
import {CdkGeneroRelevanciaGridComponent} from './cdk-genero-relevancia-grid.component';
import {CdkGeneroRelevanciaAutocompleteModule} from '@cdk/components/genero-relevancia/cdk-genero-relevancia-autocomplete/cdk-genero-relevancia-autocomplete.module';
import {CdkGeneroRelevanciaFilterModule} from '../sidebars/cdk-genero-relevancia-filter/cdk-genero-relevancia-filter.module';

@NgModule({
    declarations: [
        CdkGeneroRelevanciaGridComponent,
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
        CdkGeneroRelevanciaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
