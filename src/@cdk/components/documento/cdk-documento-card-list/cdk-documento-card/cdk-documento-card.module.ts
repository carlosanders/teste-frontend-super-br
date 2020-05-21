import {NgModule} from '@angular/core';
import {
    MatButtonModule, MatCheckboxModule, MatIconModule,
    MatMenuModule, MatProgressSpinnerModule, MatDialogModule
} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkDocumentoCardComponent } from './cdk-documento-card.component';
import {CdkAssinaturaEletronicaPluginModule} from '../../../componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.module';

@NgModule({
    declarations: [
        CdkDocumentoCardComponent,
    ],
    imports: [

        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatDialogModule,

        CdkAssinaturaEletronicaPluginModule,

        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkDocumentoCardComponent
    ]
})
export class CdkDocumentoCardModule {
}
