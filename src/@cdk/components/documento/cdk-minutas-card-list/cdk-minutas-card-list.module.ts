import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkMinutasCardListComponent} from './cdk-minutas-card-list.component';
import {CdkMinutasCardModule} from './cdk-minutas-card/cdk-minutas-card.module';
import {CdkTipoDocumentoAutocompleteModule} from '../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        CdkMinutasCardListComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatMenuModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,

        CdkMinutasCardModule,
        CdkSharedModule,
        CdkTipoDocumentoAutocompleteModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
    ],
    providers: [
    ],
    exports: [
        CdkMinutasCardListComponent
    ]
})
export class CdkMinutasCardListModule {
}
