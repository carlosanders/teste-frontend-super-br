import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {DocumentoComponent} from './documento.component';
import {DocumentoService} from '@cdk/services/documento.service';
import {RouterModule, Routes} from '@angular/router';
import {DocumentoStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {DocumentoEditModule} from './documento-edit/documento-edit.module';
import {MatButtonModule, MatIconModule, MatSlideToggleModule, MatTooltipModule} from '@cdk/angular/material';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkSidebarModule} from '@cdk/components';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {ModeloService} from '@cdk/services/modelo.service';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {MatTabsModule} from '@angular/material/tabs';
import {modulesConfig} from 'modules/modules-config';
import {DocumentoModeloEditModule} from './modelo-edit/documento-modelo-edit.module';
import {SigiloService} from '@cdk/services/sigilo.service';
import {JuntadaService} from '@cdk/services/juntada.service';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';

const routes: Routes = [
    {
        path: ':documentoHandle',
        component: DocumentoComponent,
        canActivate: [fromGuards.ResolveGuard],
        canDeactivate: [fromGuards.DeactivateGuard],
        children: [
            {
                path       : 'editar',
                loadChildren: () => import('./documento-edit/documento-edit.module').then(m => m.DocumentoEditModule),
                outlet     : 'sidebar'
            },
            {
                path       : 'oficio',
                loadChildren: () => import('./documento-avulso-edit/documento-avulso-edit.module').then(m => m.DocumentoAvulsoEditModule),
                outlet     : 'sidebar'
            },
            {
                path       : 'modelo',
                loadChildren: () => import('./modelo-edit/documento-modelo-edit.module').then(m => m.DocumentoModeloEditModule),
                outlet     : 'sidebar'
            },
            {
                path       : 'template',
                loadChildren: () => import('./template-edit/documento-template-edit.module').then(m => m.DocumentoTemplateEditModule),
                outlet     : 'sidebar'
            },
            {
                path       : 'repositorio',
                loadChildren: () => import('./repositorio-edit/documento-repositorio-edit.module').then(m => m.DocumentoRepositorioEditModule),
                outlet     : 'sidebar'
            },
            {
                path       : 'empty',
                loadChildren: () => import('./sidebar-empty/sidebar-empty.module').then(m => m.SidebarEmptyModule),
                outlet     : 'sidebar'
            },
            {
                path       : 'componente-digital',
                loadChildren: () => import('./componente-digital/componente-digital.module').then(m => m.ComponenteDigitalModule)
            },
            {
                path       : 'anexar-copia',
                loadChildren: () => import('./anexar-copia/anexar-copia.module').then(m => m.AnexarCopiaModule)
            },
            {
                path       : 'visualizar-processo',
                loadChildren: () => import('./visualizar-processo/visualizar-processo.module').then(m => m.VisualizarProcessoModule)
            },
            {
                path       : 'acesso-negado/:processoAcessoNegadoHandle',
                loadChildren: () => import('./acesso-negado/processo-acesso-negado.module').then(m => m.ProcessoAcessoNegadoModule)
            },
            {
                path: 'modelos',
                loadChildren: () => import('app/main/apps/modelos/modelos.module').then(m => m.ModelosModule),
            }
        ]
    }
];

const path = 'app/main/apps/documento';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        TranslateModule,
        CdkSharedModule,
        DocumentoEditModule,
        DocumentoStoreModule,

        CdkDocumentoCardListModule,

        CdkSidebarModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatTabsModule,

        DocumentoModeloEditModule
    ],
    providers: [
        DocumentoService,
        DocumentoAvulsoService,
        ModeloService,
        SigiloService,
        JuntadaService,
        RepositorioService,
        VinculacaoDocumentoService,
        fromGuards.ResolveGuard,
        fromGuards.DeactivateGuard
    ],
    exports: [
        DocumentoComponent
    ]
})
export class DocumentoModule {
}
