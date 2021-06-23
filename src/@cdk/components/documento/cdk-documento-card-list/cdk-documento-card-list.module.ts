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
import {CdkDocumentoCardListComponent} from './cdk-documento-card-list.component';
import {CdkDocumentoCardModule} from './cdk-documento-card/cdk-documento-card.module';
import {CdkTipoDocumentoAutocompleteModule} from '../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        CdkDocumentoCardListComponent
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

        CdkDocumentoCardModule,
        CdkSharedModule,
        CdkTipoDocumentoAutocompleteModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
    ],
    providers: [
    ],
    exports: [
        CdkDocumentoCardListComponent
    ]
})
export class CdkDocumentoCardListModule {
}
