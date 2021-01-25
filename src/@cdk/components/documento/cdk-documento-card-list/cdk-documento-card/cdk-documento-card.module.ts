import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkDocumentoCardComponent} from './cdk-documento-card.component';
import {CdkAssinaturaEletronicaPluginModule} from '../../../componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.module';
import {CdkTipoDocumentoAutocompleteModule} from '../../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkTipoDocumentoGridsearchModule} from '../../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-gridsearch/cdk-tipo-documento-gridsearch.module';

@NgModule({
    declarations: [
        CdkDocumentoCardComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        CdkAssinaturaEletronicaPluginModule,
        CdkSharedModule,
        CdkTipoDocumentoAutocompleteModule,
        CdkTipoDocumentoGridsearchModule,
    ],
    providers: [],
    exports: [
        CdkDocumentoCardComponent
    ]
})
export class CdkDocumentoCardModule {
}
