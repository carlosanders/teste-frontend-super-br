import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {DocumentoService} from '@cdk/services/documento.service';
import {DocumentoStoreModule} from '../store/store.module';
import {MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule} from '@cdk/angular/material';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {DocumentoTemplateEditComponent} from './documento-template-edit.component';
import {CdkTemplateFormModule} from '@cdk/components/template/cdk-template-form/cdk-template-form.module';
import {TemplateService} from '@cdk/services/template.service';

const routes: Routes = [
    {
        path: '',
        component: DocumentoTemplateEditComponent,
        children: [
            {
                path: 'dados-basicos',
                loadChildren: () => import('./dados-basicos/template-edit-dados-basicos.module').then(m => m.TemplateEditDadosBasicosModule)
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

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoStoreModule,

        CdkComponenteDigitalCardListModule,
        CdkDocumentoCardListModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        CdkTemplateFormModule,
    ],
    providers: [
        DocumentoService,
        TemplateService
    ],
    exports: [
        DocumentoTemplateEditComponent
    ]
})
export class DocumentoTemplateEditModule {
}
