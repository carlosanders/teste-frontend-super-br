import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaDetailComponent} from './arquivista-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {PipesModule} from '../../../../../@cdk/pipes/pipes.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslateModule} from '@ngx-translate/core';
import {CdkVinculacaoEtiquetaChipsModule} from '../../../../../@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';
import {CdkSharedModule} from '../../../../../@cdk/shared.module';
import {CdkSidebarModule} from '../../../../../@cdk/components';
import {CdkAtividadeFormModule} from '../../../../../@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';
import {MatBadgeModule} from '@angular/material/badge';
import {ArquivistaDetailStoreModule} from './store/store.module';
import {ProcessoService} from '../../../../../@cdk/services/processo.service';
import {VinculacaoEtiquetaService} from '../../../../../@cdk/services/vinculacao-etiqueta.service';
import {LoginService} from '../../../auth/login/login.service';
import * as fromGuards from './store/guards';
import {RealizarTransicaoComponent} from '../realizar-transicao/realizar-transicao.component';
import {RealizarTransicaoModule} from '../realizar-transicao/realizar-transicao.module';
import {CriarDataPrevistaTransicaoModule} from '../criar-data-prevista-transicao/criar-data-prevista-transicao.module';
import {ArquivistaClassificacaoEditComponent} from '../arquivista-classificacao-edit/arquivista-classificacao-edit.component';
import {ArquivistaClassificacaoEditModule} from '../arquivista-classificacao-edit/arquivista-classificacao-edit.module';
import {modulesConfig} from 'modules/modules-config';
import {ProcessoStoreModule} from "../../processo/store/store.module";
import {ArquivistaEditComponent} from "./arquivista-edit/arquivista-edit.component";

const routes: Routes = [
    {
        path: '',
        component: ArquivistaDetailComponent,
        children: [
            {
                path: 'processo',
                loadChildren: () => import('app/main/apps/processo/processo.module').then(m => m.ProcessoModule)
            },
            {
                path: ':processoHandle/realizar-transicao',
                component: RealizarTransicaoComponent,
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: ':processoHandle/editar',
                loadChildren: () => import('./arquivista-edit/arquivista-edit.module').then(m => m.ArquivistaEditModule),
                canActivate: [fromGuards.ResolveGuard]
            },
        ],
    }
];

const path = 'app/main/apps/arquivista/arquivista-detail';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ArquivistaDetailComponent
    ],
    imports: [
        CommonModule,
        PipesModule,

        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        TranslateModule,

        CdkVinculacaoEtiquetaChipsModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkAtividadeFormModule,
        MatBadgeModule,
        ArquivistaDetailStoreModule,
        ProcessoStoreModule,
        RealizarTransicaoModule,
        CriarDataPrevistaTransicaoModule,
        ArquivistaClassificacaoEditModule
    ],
    exports: [
        ArquivistaDetailComponent
    ],
    providers: [
        ProcessoService,
        VinculacaoEtiquetaService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class ArquivistaDetailModule {
}
