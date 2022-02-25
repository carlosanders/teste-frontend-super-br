import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {CdkEtiquetaChipsComponent} from './cdk-etiqueta-chips.component';
import {CdkEtiquetaAutocompleteModule} from '../cdk-etiqueta-autocomplete/cdk-etiqueta-autocomplete.module';
import {CdkEtiquetaChipsItemModule} from './cdk-etiqueta-chips-item/cdk-etiqueta-chips-item.module';

@NgModule({
    declarations: [
        CdkEtiquetaChipsComponent,
    ],
    imports: [

        MatFormFieldModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatIconModule,

        CdkEtiquetaAutocompleteModule,

        CdkSharedModule,
        CdkEtiquetaChipsItemModule,
    ],
    providers: [
        EtiquetaService,
    ],
    exports: [
        CdkEtiquetaChipsComponent
    ]
})
export class CdkEtiquetaChipsModule {
}
