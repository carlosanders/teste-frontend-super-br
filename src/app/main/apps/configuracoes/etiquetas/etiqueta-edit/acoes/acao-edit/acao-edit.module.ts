import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {AcaoEditComponent} from './acao-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {AcaoEditStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {AcaoService} from '@cdk/services/acao.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {CommonModule} from '@angular/common';
import {ModalidadeAcaoEtiquetaService} from '@cdk/services/modalidade-acao-etiqueta.service';
import {EtiquetaService} from '@cdk/services/etiqueta.service';

const routes: Routes = [
    {
        path: ':acaoHandle',
        component: AcaoEditComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: '1',
                loadChildren: () => import('./acao-trigger/acao-trigger-001/acao-trigger-001.module')
                    .then(m => m.AcaoTrigger001Module),
            },
            {
                path: '2',
                loadChildren: () => import('./acao-trigger/acao-trigger-002/acao-trigger-002.module')
                    .then(m => m.AcaoTrigger002Module),
            },
            {
                path: '3',
                loadChildren: () => import('./acao-trigger/acao-trigger-003/acao-trigger-003.module')
                    .then(m => m.AcaoTrigger003Module),
            },
            {
                path: '4',
                loadChildren: () => import('./acao-trigger/acao-trigger-004/acao-trigger-004.module')
                    .then(m => m.AcaoTrigger004Module),
            }
        ]
    }
];

const path = 'app/main/apps/configuracoes/etiquetas/etiqueta-edit/acoes/acao-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AcaoEditComponent,
    ],
    imports: [

        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,
        CommonModule,
        MatRadioModule,
        AcaoEditStoreModule,
        TranslateModule,
        CdkSharedModule,
        CdkSidebarModule,
        PathModule,
    ],
    providers: [
        AcaoService,
        ModalidadeAcaoEtiquetaService,
        EtiquetaService,
        fromGuards.ResolveGuard
    ]
})

export class AcaoEditModule {
}
