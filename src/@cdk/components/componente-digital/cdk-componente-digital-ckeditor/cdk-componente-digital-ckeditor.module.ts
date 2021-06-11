import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {CdkComponenteDigitalCkeditorComponent} from './cdk-componente-digital-ckeditor.component';
import {CKEditorModule} from 'ng2-ckeditor';
import {MatButtonModule, MatDialogModule, MatIconModule} from '@cdk/angular/material';
import {CdkCampoPluginModule} from './cdk-plugins/cdk-campo-plugin/cdk-campo-plugin.module';
import {CdkRepositorioPluginModule} from './cdk-plugins/cdk-respositorio-plugin/cdk-repositorio-plugin.module';
import {CdkAssinaturaEletronicaPluginModule} from './cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.module';

const routes: Routes = [
    {
        path: '',
        component: CdkComponenteDigitalCkeditorComponent
    }
];

@NgModule({
    declarations: [
        CdkComponenteDigitalCkeditorComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatDialogModule,
        MatIconModule,
        MatButtonModule,

        CKEditorModule,

        CdkCampoPluginModule,
        CdkRepositorioPluginModule,
        CdkAssinaturaEletronicaPluginModule,

        TranslateModule,
        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalCkeditorComponent
    ]
})
export class CdkComponenteDigitalCkeditorModule {
}
