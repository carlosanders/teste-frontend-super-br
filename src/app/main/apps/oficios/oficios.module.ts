import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import * as fromGuards from 'app/main/apps/oficios/store/guards/index';
import {OficioStoreModule} from 'app/main/apps/oficios/store/store.module';
import {FolderService} from '@cdk/services/folder.service';
import {ProcessoService} from '@cdk/services/processo.service';
import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ResizableModule} from 'angular-resizable-element';
import {CdkDocumentoAvulsoListModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-list/cdk-documento-avulso-list.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkEtiquetaChipsModule} from '@cdk/components/etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';
import {DndModule} from 'ngx-drag-drop';
import {OficiosComponent} from './oficios.component';
import {DocumentoAvulsoMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkChaveAcessoPluginModule} from '@cdk/components/chave-acesso/cdk-chave-acesso-plugins/cdk-chave-acesso-plugin.module';
import {modulesConfig} from 'modules/modules-config';
import {AssuntoService} from '@cdk/services/assunto.service';
import {InteressadoService} from '@cdk/services/interessado.service';
import {DocumentoService} from '@cdk/services/documento.service';

const routes: Routes = [
    {
        path: ':oficioTargetHandle/:pessoaHandle',
        component: OficiosComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./oficio-empty/oficio-empty.module').then(m => m.OficioEmptyModule)
            },
            {
                path: 'detalhe',
                loadChildren: () => import('./oficio-detail/oficio-detail.module').then(m => m.OficioDetailModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'vinculacao-etiqueta-bloco',
                loadChildren: () => import('./vinculacao-etiqueta-create-bloco/vinculacao-etiqueta-create-bloco.module').then(m => m.VinculacaoEtiquetaCreateBlocoModule),
            },
            {
                path: 'responder-complementar-bloco',
                loadChildren: () => import('./responder-complementar-create-bloco/responder-complementar-create-bloco.module').then(m => m.ResponderComplementarCreateBlocoModule),
            },
            {
                path: 'documento',
                loadChildren: () => import('./componente-digital/componente-digital.module').then(m => m.ComponenteDigitalModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: '**',
        redirectTo: 'entrada/'
    }
];

const path = 'app/main/apps/oficios';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        OficiosComponent,
        DocumentoAvulsoMainSidebarComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,

        DndModule,

        CdkEtiquetaChipsModule,
        CdkDocumentoAvulsoListModule,
        CdkChaveAcessoPluginModule,

        TranslateModule,
        ResizableModule,
        PipesModule,
        InfiniteScrollModule,

        CdkSharedModule,
        CdkSidebarModule,
        OficioStoreModule,
    ],
    providers: [
        FolderService,
        ProcessoService,
        DocumentoAvulsoService,
        AssuntoService,
        InteressadoService,
        DocumentoService,
        SetorService,
        UsuarioService,
        fromGuards.ResolveGuard
    ]
})
export class OficiosModule {
}
