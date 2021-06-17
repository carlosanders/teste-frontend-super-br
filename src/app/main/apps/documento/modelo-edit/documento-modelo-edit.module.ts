import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {DocumentoService} from '@cdk/services/documento.service';
import {MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule} from '@cdk/angular/material';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {CdkModeloFormModule} from '@cdk/components/modelo/cdk-modelo-form/cdk-modelo-form.module';
import {ModeloEditComponent} from './modelo-edit.component';
import {ModeloService} from '@cdk/services/modelo.service';
import {modulesConfig} from 'modules/modules-config';
import {AtividadeCreateStoreModule} from '../../tarefas/tarefa-detail/atividades/atividade-create/store/store.module';

const routes: Routes = [
    {
        path: '',
        component: ModeloEditComponent,
        children: [
            {
                path: 'anexos',
                loadChildren: () => import('./anexos/modelo-edit-anexos.module').then(m => m.ModeloEditAnexosModule)
            },
            {
                path: 'dados-basicos',
                loadChildren: () => import('./dados-basicos/modelo-edit-dados-basicos.module').then(m => m.ModeloEditDadosBasicosModule)
            }
        ]
    }
];

const path = 'app/main/apps/documento/modelo-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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

        CdkComponenteDigitalCardListModule,
        CdkDocumentoCardListModule,
        CdkUploadModule,

        AtividadeCreateStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
    ],
    providers: [
        DocumentoService,
        ModeloService,
    ],
    exports: [
        ModeloEditComponent
    ]
})
export class DocumentoModeloEditModule {
}
