import {
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {CdkVinculacaoEtiquetaChipsComponent} from './cdk-vinculacao-etiqueta-chips.component';
import {CdkEtiquetaAutocompleteModule} from '../../etiqueta/cdk-etiqueta-autocomplete/cdk-etiqueta-autocomplete.module';
import {CdkVinculacaoEtiquetaEditDialogModule} from '../cdk-vinculacao-etiqueta-edit-dialog/cdk-vinculacao-etiqueta-edit-dialog.module';
import {
    CdkEtiquetaChipsItemModule
} from '../../etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips-item/cdk-etiqueta-chips-item.module';

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
        MatTooltipModule,
        MatButtonModule,

        CdkVinculacaoEtiquetaEditDialogModule,
        CdkEtiquetaAutocompleteModule,
        CdkSharedModule,
        CdkEtiquetaChipsItemModule,
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
