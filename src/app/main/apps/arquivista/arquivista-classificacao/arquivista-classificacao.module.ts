import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaClassificacaoComponent} from './arquivista-classificacao.component';
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
import {ArquivistaClassificacaoStoreModule} from './store/store.module';
import {ProcessoService} from '../../../../../@cdk/services/processo.service';
import {VinculacaoEtiquetaService} from '../../../../../@cdk/services/vinculacao-etiqueta.service';
import {LoginService} from '../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: ArquivistaClassificacaoComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('app/main/apps/processo/processo.module').then(m => m.ProcessoModule),
            },
        ],
    }
]


@NgModule({
    declarations: [
        ArquivistaClassificacaoComponent
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
        ArquivistaClassificacaoStoreModule
    ],
    exports: [
      ArquivistaClassificacaoComponent
    ],
    providers: [
        ProcessoService,
        VinculacaoEtiquetaService,
        LoginService,
    ]
})
export class ArquivistaClassificacaoModule {
}
