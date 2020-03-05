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

const routes: Routes = [
    {
        path: ':processoHandle',
        component: ArquivistaDetailComponent,
        children: [
            {
                path: 'processo',
                loadChildren: () => import('app/main/apps/processo/processo.module').then(m => m.ProcessoModule)
            },
        ]
    }
]


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
        ArquivistaDetailStoreModule
    ],
    exports: [
      ArquivistaDetailComponent
    ],
    providers: [
        ProcessoService,
        VinculacaoEtiquetaService,
        LoginService,
        fromGuards.ArquivistaDetailGuard
    ]
})
export class ArquivistaDetailModule {
}
