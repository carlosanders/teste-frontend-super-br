import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {DocumentoService} from '@cdk/services/documento.service';
import {DocumentoStoreModule} from '../store/store.module';
import {MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule} from '@cdk/angular/material';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {CdkModeloFormModule} from '@cdk/components/modelo/cdk-modelo-form/cdk-modelo-form.module';
import {DocumentoTemplateEditComponent} from './documento-template-edit.component';
import {ModeloService} from '@cdk/services/modelo.service';
import {CdkTemplateFormModule} from '../../../../../@cdk/components/template/cdk-template-form/cdk-template-form.module';

const routes: Routes = [
    {
        path: '',
        component: DocumentoTemplateEditComponent,
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
        DocumentoTemplateEditComponent
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
        CdkSharedModule,
        MatTooltipModule,
        CdkTemplateFormModule,
    ],
    providers: [
        DocumentoService,
        ModeloService
    ],
    exports: [
        DocumentoTemplateEditComponent
    ]
})
export class DocumentoTemplateEditModule {
}
