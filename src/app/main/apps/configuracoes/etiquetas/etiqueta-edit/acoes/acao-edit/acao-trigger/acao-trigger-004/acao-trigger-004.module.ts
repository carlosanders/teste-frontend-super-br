import {NgModule} from '@angular/core';
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
import {AcaoTrigger004Component} from './acao-trigger-004.component';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {CommonModule} from '@angular/common';
import {CdkAcaoTrigger004Module} from '@cdk/components/acao/cdk-acao-trigger/cdk-acao-trigger-004/cdk-acao-trigger-004.module';
import * as fromGuards from './store/guards';
import {ModalidadeAcaoEtiquetaService} from '@cdk/services/modalidade-acao-etiqueta.service';
import {AcaoTriggerStoreModule} from '../store/store.module';
import {AcaoTrigger003Component} from '../acao-trigger-003/acao-trigger-003.component';

const routes: Routes = [
    {
        path: 'trigger',
        component: AcaoTrigger004Component,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'pessoa',
                loadChildren: () => import('app/main/apps/pessoa/pessoa.module').then(m => m.PessoaModule),
            }
        ]
    }
];

const path = 'app/main/apps/configuracoes/etiquetas/etiqueta-edit/acoes/acao-edit/acao-trigger/acao-trigger-004';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

// @ts-ignore
@NgModule({
    declarations: [
        AcaoTrigger004Component
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
        CommonModule,
        TranslateModule,
        CdkSharedModule,
        AcaoTriggerStoreModule,
        CdkAcaoTrigger004Module
    ],
    providers: [
        fromGuards.ResolveGuard,
        ModalidadeAcaoEtiquetaService
    ]
})
export class AcaoTrigger004Module {
}
