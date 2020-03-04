import { NgModule } from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule, MatChipsModule, MatIconModule, MatFormFieldModule, MatTooltipModule
} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { EtiquetaService } from '@cdk/services/etiqueta.service';
import { CdkVinculacaoEtiquetaChipsComponent } from './cdk-vinculacao-etiqueta-chips.component';
import { CdkEtiquetaAutocompleteModule} from '../../etiqueta/cdk-etiqueta-autocomplete/cdk-etiqueta-autocomplete.module';
import { CdkVinculacaoEtiquetaEditDialogModule } from '../cdk-vinculacao-etiqueta-edit-dialog/cdk-vinculacao-etiqueta-edit-dialog.module';

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
        CdkVinculacaoEtiquetaEditDialogModule,
        MatTooltipModule,  
        CdkEtiquetaAutocompleteModule,

        CdkSharedModule,
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
