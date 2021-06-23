import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkAssinaturaEletronicaPluginComponent} from './cdk-assinatura-eletronica-plugin.component';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    declarations: [
        CdkAssinaturaEletronicaPluginComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        MatIconModule,
        MatTooltipModule,

        CdkSharedModule,
        MatSlideToggleModule,
    ],
    entryComponents: [
        CdkAssinaturaEletronicaPluginComponent
    ],
    exports: [
        CdkAssinaturaEletronicaPluginComponent
    ]
})
export class CdkAssinaturaEletronicaPluginModule {
}
