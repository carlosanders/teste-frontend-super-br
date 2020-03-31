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
import {RealizarTransicaoComponent} from '../realizar-transicao/realizar-transicao.component';
import {RealizarTransicaoModule} from '../realizar-transicao/realizar-transicao.module';
import {CriarDataPrevistaTransicaoModule} from '../criar-data-prevista-transicao/criar-data-prevista-transicao.module';
import {CriarDataPrevistaTransicaoComponent} from '../criar-data-prevista-transicao/criar-data-prevista-transicao.component';
import {ArquivistaClassificacaoEditComponent} from '../arquivista-classificacao-edit/arquivista-classificacao-edit.component';
import {ArquivistaClassificacaoEditModule} from '../arquivista-classificacao-edit/arquivista-classificacao-edit.module';
import {TransicaoService} from '../../../../../@cdk/services/transicao.service';

const routes: Routes = [
    {
        path: '',
        component: ArquivistaDetailComponent,
        children: [
            {
                path: 'processo',
                loadChildren: () => import('app/main/apps/processo/processo.module').then(m => m.ProcessoModule),
            },
            {
                path: ':processoHandle/realizar-transicao/criar',
                component: RealizarTransicaoComponent
            },
            {

                path: ':processoHandle/lembretes',
                loadChildren: () => import('../lembretes/lembretes.module').then(m => m.LembretesModule),
            },
            {
                path: ':processoHandle/classificacao',
                component: ArquivistaClassificacaoEditComponent
            },
            {
                path: ':processoHandle/criar-data-prevista-transicao',
                component: CriarDataPrevistaTransicaoComponent
            },
        ],
    }
];


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
    ]
})
export class ArquivistaDetailModule {
}
