import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {CdkComponenteDigitalCkeditorComponent} from './cdk-componente-digital-ckeditor.component';
import { CKEditorModule } from 'ng2-ckeditor';
import {MatButtonModule, MatDialogModule, MatIconModule} from '@angular/material';
import {CdkCampoPluginModule} from './cdk-plugins/cdk-campo-plugin/cdk-campo-plugin.module';

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

        TranslateModule,
        FuseSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalCkeditorComponent
    ]
})
export class CdkComponenteDigitalCkeditorModule {
}
