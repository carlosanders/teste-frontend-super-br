import { NgModule } from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule, MatChipsModule, MatIconModule, MatFormFieldModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EtiquetaService } from '@cdk/services/etiqueta.service';
import { CdkEtiquetaChipsComponent } from './cdk-etiqueta-chips.component';
import { CdkEtiquetaAutocompleteModule} from '../cdk-etiqueta-autocomplete/cdk-etiqueta-autocomplete.module';

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

        FuseSharedModule,
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
