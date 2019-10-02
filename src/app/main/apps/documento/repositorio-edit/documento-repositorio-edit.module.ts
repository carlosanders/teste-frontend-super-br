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
import {CdkRepositorioFormModule} from '@cdk/components/repositorio/cdk-repositorio-form/cdk-repositorio-form.module';
import {RepositorioEditComponent} from './repositorio-edit.component';
import {RepositorioService} from '@cdk/services/repositorio.service';

const routes: Routes = [
    {
        path: '',
        component: RepositorioEditComponent,
        children: [
            {
                path       : 'componente-digital',
                loadChildren: () => import('../componente-digital/componente-digital.module').then(m => m.ComponenteDigitalModule)
            }
        ]
    }
];

@NgModule({
    declarations: [
        RepositorioEditComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        CdkRepositorioFormModule,

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
        RepositorioService
    ],
    exports: [
        RepositorioEditComponent
    ]
})
export class DocumentoRepositorioEditModule {
}
