import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {DocumentoService} from '@cdk/services/documento.service';
import {DocumentoStoreModule} from '../store/store.module';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {CdkModeloFormModule} from '@cdk/components/modelo/cdk-modelo-form/cdk-modelo-form.module';
import {ModeloEditComponent} from './modelo-edit.component';
import {ModeloService} from '@cdk/services/modelo.service';

const routes: Routes = [
    {
        path: '',
        component: ModeloEditComponent,
        children: [
            {
                path       : 'componente-digital',
                loadChildren: '../componente-digital/componente-digital.module#ComponenteDigitalModule'
            }
        ]
    }
];

@NgModule({
    declarations: [
        ModeloEditComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        CdkModeloFormModule,

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
        DocumentoService,
        ModeloService
    ],
    exports: [
        ModeloEditComponent
    ]
})
export class DocumentoModeloEditModule {
}