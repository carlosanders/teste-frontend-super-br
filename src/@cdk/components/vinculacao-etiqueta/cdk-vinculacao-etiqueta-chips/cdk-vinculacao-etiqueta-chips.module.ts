import { NgModule } from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule, MatChipsModule, MatIconModule, MatFormFieldModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EtiquetaService } from '@cdk/services/etiqueta.service';
import { CdkVinculacaoEtiquetaChipsComponent } from './cdk-vinculacao-etiqueta-chips.component';
import { CdkEtiquetaAutocompleteModule} from '../../etiqueta/cdk-etiqueta-autocomplete/cdk-etiqueta-autocomplete.module';

@NgModule({
    declarations: [
        CdkVinculacaoEtiquetaChipsComponent,
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
        CdkVinculacaoEtiquetaChipsComponent
    ]
})
export class CdkVinculacaoEtiquetaChipsModule {
}
