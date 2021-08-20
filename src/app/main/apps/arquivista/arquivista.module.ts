import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkConfirmDialogModule, CdkSidebarModule} from '@cdk/components';
import {ArquivistaComponent} from './arquivista.component';
import {CommonModule} from '@angular/common';
import {ArquivistaMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {CdkEtiquetaChipsModule} from '@cdk/components/etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';
import * as fromGuards from './arquivista-list/store/guards';
import {ProcessoService} from '@cdk/services/processo.service';
import {modulesConfig} from 'modules/modules-config';
import {MatRippleModule} from '@angular/material/core';
import {ArquivistaStoreModule} from './arquivista-list/store/store.module';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {SnackBarDesfazerModule} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.module';
import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {StatusBarramentoService} from "../../../../@cdk/services/status-barramento";

const routes: Routes = [
    {
        path       : '',
        component: ArquivistaComponent,
        children: [
            {
                path       : ':unidadeHandle/:typeHandle',
                loadChildren: () => import('./arquivista-list/arquivista-list.module').then(m => m.ArquivistaListModule)
            }
        ]
    }
];

const path = 'app/main/apps/arquivista';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations   : [
        ArquivistaComponent,
        ArquivistaMainSidebarComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CdkEtiquetaChipsModule,
        ArquivistaStoreModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        TranslateModule,
        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule,
        SnackBarDesfazerModule,
        CdkConfirmDialogModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        ProcessoService,
        AcompanhamentoService,
        StatusBarramentoService,
        ModalidadeTransicaoService
    ],
    entryComponents: [SnackBarDesfazerComponent],
})
// @ts-ignore
export class ArquivistaModule {}
