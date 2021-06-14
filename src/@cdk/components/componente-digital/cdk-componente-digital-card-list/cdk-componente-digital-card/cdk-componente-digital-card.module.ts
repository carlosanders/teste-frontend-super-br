import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkComponenteDigitalCardComponent} from './cdk-componente-digital-card.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CdkTipoDocumentoAutocompleteModule} from '../../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [
        CdkComponenteDigitalCardComponent,
    ],
    imports: [

        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,

        CdkSharedModule,
        MatTooltipModule,
        DragDropModule,
        MatFormFieldModule,
        CdkTipoDocumentoAutocompleteModule,
        MatAutocompleteModule,
        MatInputModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalCardComponent
    ]
})
export class CdkComponenteDigitalCardModule {
}
