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
import * as fromGuards from './store/guards/index';
import {ProcessoStoreModule} from './store/store.module';
import {ProtocoloExternoComponent} from './protocolo-externo.component';
import {ProcessoMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {FolderService} from '@cdk/services/folder.service';
import {ProcessoService} from '@cdk/services/processo.service';
import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ResizableModule} from 'angular-resizable-element';
import {CdkProcessoListModule} from '@cdk/components/processo/cdk-processo-list/cdk-processo-list.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkEtiquetaChipsModule} from '@cdk/components/etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';
import {DndModule} from 'ngx-drag-drop';
import {AssuntoService} from '@cdk/services/assunto.service';
import {CdkProcessoFormModule} from '@cdk/components/processo/cdk-processo-form/cdk-processo-form.module';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {InteressadoService} from '@cdk/services/interessado.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {modulesConfig} from 'modules/modules-config';
import {AssinaturaService} from '@cdk/services/assinatura.service';

const routes: Routes = [
    {
        path: ':typeHandle/:targetHandle',
        component: ProtocoloExternoComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./protocolo-externo-empty/protocolo-externo-empty.module').then(m => m.ProtocoloExternoEmptyModule)
            },
            {
                path: 'criar',
                loadChildren: () => import('./protocolo-create/protocolo-create.module').then(m => m.ProtocoloCreateModule)
            },
            {
                path: 'detalhe',
                loadChildren: () => import('./protocolo-externo-detail/protocolo-externo-detail.module').then(m => m.ProtocoloExternoDetailModule),
            },
            {
                path: 'vinculacao-etiqueta-bloco',
                loadChildren: () => import('./vinculacao-etiqueta-create-bloco/vinculacao-etiqueta-create-bloco.module').then(m => m.VinculacaoEtiquetaCreateBlocoModule),
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
        redirectTo: 'entrada'
    }
];

const path = 'app/main/apps/protocolo-externo';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ProtocoloExternoComponent,
        ProcessoMainSidebarComponent
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
        CdkProcessoListModule,
        CdkProcessoFormModule,
        CdkEtiquetaChipsModule,
        TranslateModule,
        ResizableModule,
        PipesModule,
        InfiniteScrollModule,
        CdkSharedModule,
        CdkSidebarModule,
        ProcessoStoreModule
    ],
    providers: [
        ProcessoService,
        FolderService,
        ProcessoService,
        EspecieProcessoService,
        SetorService,
        UsuarioService,
        fromGuards.ResolveGuard,
        AssuntoService,
        AssinaturaService,
        InteressadoService,
        DocumentoService
    ]
})
export class ProtocoloExternoModule {
}
