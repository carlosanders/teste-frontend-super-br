import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {DocumentoEditComponent} from './documento-edit.component';
import {DocumentoService} from '@cdk/services/documento.service';
import {CdkDocumentoFormModule} from '@cdk/components/documento/cdk-documento-form/cdk-documento-form.module';
import {MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule} from '@cdk/angular/material';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {ResizableModule} from 'angular-resizable-element';
import {modulesConfig} from 'modules/modules-config';
import {CdkVinculacaoEtiquetaChipsModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditComponent,
        children: [
            {
                path: 'acesso-restrito',
                loadChildren: () => import('./visibilidade/documento-edit-visibilidade.module').then(m => m.DocumentoEditVisibilidadeModule)
            },
            {
                path: 'assinaturas',
                loadChildren: () => import('./assinaturas/documento-edit-assinaturas.module').then(m => m.DocumentoEditAssinaturasModule)
            },
            {
                path: 'atividade',
                loadChildren: () => import('./atividade/documento-edit-atividade.module').then(m => m.DocumentoEditAtividadeModule)
            },
            {
                path: 'componentes-digitais',
                loadChildren: () => import('./componentes-digitais/documento-edit-componentes-digitais.module').then(m => m.DocumentoEditComponentesDigitaisModule)
            },
            {
                path: 'dados-basicos',
                loadChildren: () => import('./dados-basicos/documento-edit-dados-basicos.module').then(m => m.DocumentoEditDadosBasicosModule)
            },
            {
                path: 'inteligencia',
                loadChildren: () => import('./inteligencia/documento-edit-inteligencia.module').then(m => m.DocumentoEditInteligenciaModule)
            },
            {
                path: 'juntada',
                loadChildren: () => import('./juntada/documento-edit-juntada.module').then(m => m.DocumentoEditJuntadaModule)
            },
            {
                path: 'sigilos',
                loadChildren: () => import('./sigilos/documento-edit-sigilos.module').then(m => m.DocumentoEditSigilosModule)
            },
            {
                path: 'modelos',
                loadChildren: () => import('./modelos/documento-edit-modelos.module').then(m => m.DocumentoEditModelosModule)
            },
            {
                path: 'restaurar',
                loadChildren: () => import('./restaurar/restaurar.module').then(m => m.RestaurarModule)
            },
            {
                path: 'versoes',
                loadChildren: () => import('./versoes/documento-edit-versoes.module').then(m => m.DocumentoEditVersoesModule)
            }
        ]
    }
];

const path = 'app/main/apps/documento/documento-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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

        CdkUploadModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        ResizableModule,
        CdkVinculacaoEtiquetaChipsModule,
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
