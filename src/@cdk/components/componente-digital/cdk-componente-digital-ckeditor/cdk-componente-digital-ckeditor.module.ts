import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {CdkComponenteDigitalCkeditorComponent} from './cdk-componente-digital-ckeditor.component';
import { CKEditorModule } from 'ng2-ckeditor';
import {MatButtonModule, MatIconModule} from '@angular/material';

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

        MatIconModule,
        MatButtonModule,

        CKEditorModule,

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
