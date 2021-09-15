import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaDetailComponent} from './arquivista-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslateModule} from '@ngx-translate/core';
import {CdkVinculacaoEtiquetaChipsModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {CdkAtividadeFormModule} from '@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';
import {MatBadgeModule} from '@angular/material/badge';
import {ArquivistaDetailStoreModule} from './store/store.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import * as fromGuards from './store/guards';
import {RealizarTransicaoModule} from '../realizar-transicao/realizar-transicao.module';
import {modulesConfig} from 'modules/modules-config';
import {ProcessoStoreModule} from '../../processo/store/store.module';

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
                path: ':processoHandle/temporalidade-destinacao',
                loadChildren: () => import('../realizar-transicao/realizar-transicao.module').then(m => m.RealizarTransicaoModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: ':processoHandle/desarquivar',
                loadChildren: () => import('../realizar-desarquivamento/realizar-desarquivamento.module').then(m => m.RealizarDesarquivamentoModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: ':processoHandle/registrar-extravio',
                loadChildren: () => import('../registrar-extravio/registrar-extravio.module').then(m => m.RegistrarExtravioModule),
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
    ],
    exports: [
        ArquivistaDetailComponent
    ],
    providers: [
        ProcessoService,
        VinculacaoEtiquetaService,
        fromGuards.ResolveGuard
    ]
})
export class ArquivistaDetailModule {
}
