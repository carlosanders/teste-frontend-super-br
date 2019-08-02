import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {DocumentoEditComponent} from './documento-edit.component';
import {DocumentoService} from '@cdk/services/documento.service';
import {CdkDocumentoFormModule} from '@cdk/components/documento/cdk-documento-form/cdk-documento-form.module';
import {DocumentoStoreModule} from '../store/store.module';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditComponent,
        children: [
            {
                path       : 'componente-digital',
                loadChildren: '../componente-digital/componente-digital.module#ComponenteDigitalModule'
            },
            {
                path       : 'anexar-copia',
                loadChildren: '../anexar-copia/anexar-copia.module#AnexarCopiaModule'
            }
        ]
    }
];

@NgModule({
    declarations: [
        DocumentoEditComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        CdkDocumentoFormModule,

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoStoreModule,

        CdkComponenteDigitalCardListModule,
        CdkDocumentoCardListModule,
        CdkUploadModule,

        TranslateModule,
        FuseSharedModule,
    ],
    providers: [
        DocumentoService
    ],
    exports: [
        DocumentoEditComponent
    ]
})
export class DocumentoEditModule {
}
