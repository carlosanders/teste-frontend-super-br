import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {DocumentoUploadComponent} from './documento-upload.component';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';

const routes: Routes = [
    {
        path: '',
        component: DocumentoUploadComponent,
    }
];

@NgModule({
    declarations: [
        DocumentoUploadComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        CdkUploadModule,

        TranslateModule,
        FuseSharedModule,
    ],
    providers: [
        ComponenteDigitalService
    ]
})
export class DocumentoUploadModule {
}
