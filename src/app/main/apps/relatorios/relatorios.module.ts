import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import * as fromGuards from 'app/main/apps/relatorios/store/guards/index';
import {RelatoriosStoreModule} from 'app/main/apps/relatorios/store/store.module';
import {RelatoriosComponent} from 'app/main/apps/relatorios/relatorios.component';
import {RelatoriosMainSidebarComponent} from 'app/main/apps/relatorios/sidebars/main/main-sidebar.component';
import {RelatorioService} from '@cdk/services/relatorio.service';
import {FolderService} from '@cdk/services/folder.service';
import {EspecieRelatorioService} from '@cdk/services/especie-relatorio.service';
import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ResizableModule} from 'angular-resizable-element';
import {CdkRelatorioListModule} from '@cdk/components/relatorio/cdk-relatorio-list/cdk-relatorio-list.module';
import {CdkRelatorioFormModule} from '@cdk/components/relatorio/cdk-relatorio-form/cdk-relatorio-form.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkEtiquetaChipsModule} from '@cdk/components/etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';
import {DndModule} from 'ngx-drag-drop';
import {LoginService} from '../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {CdkTipoRelatorioListModule} from '../../../../@cdk/components/tipo-relatorio/cdk-tipo-relatorio-list/cdk-tipo-relatorio-list.module';

const routes: Routes = [
    {
        path: ':generoHandle/:typeHandle/:targetHandle',
        component: RelatoriosComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./relatorio-empty/relatorio-empty.module').then(m => m.RelatorioEmptyModule)
            },
            {
                path: 'criar',
                loadChildren: () => import('./relatorio-create/relatorio-create.module').then(m => m.RelatorioCreateModule)
            },
            {
                path: 'relatorio',
                loadChildren: () => import('./relatorio-detail/relatorio-detail.module').then(m => m.RelatorioDetailModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'criar-tipo-relatorio',
                loadChildren: () => import('./tipo-relatorio-create/tipo-relatorio-create.module').then(m => m.TipoRelatorioCreateModule)
            },
            {
                path: 'vinculacao-etiqueta-bloco',
                loadChildren: () => import('./vinculacao-etiqueta-create-bloco/vinculacao-etiqueta-create-bloco.module').then(m => m.VinculacaoEtiquetaCreateBlocoModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: '**',
        redirectTo: 'entrada'
    }
];

const path = 'app/main/apps/relatorios';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RelatoriosComponent,
        RelatoriosMainSidebarComponent
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

        CdkRelatorioListModule,
        CdkRelatorioFormModule,

        CdkEtiquetaChipsModule,

        TranslateModule,

        ResizableModule,

        PipesModule,

        InfiniteScrollModule,

        CdkSharedModule,
        CdkSidebarModule,

        RelatoriosStoreModule,
        CdkTipoRelatorioListModule
    ],
    providers: [
        RelatorioService,
        FolderService,
        EspecieRelatorioService,
        SetorService,
        UsuarioService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class RelatoriosModule {
}
