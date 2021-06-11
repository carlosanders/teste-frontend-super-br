import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
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
import {MatSelectModule} from '@angular/material/select';
import {CdkAcaoTrigger001Module} from '@cdk/components/acao/cdk-acao-trigger/cdk-acao-trigger-001/cdk-acao-trigger-001.module';
import {CdkAcaoTrigger002Module} from '@cdk/components/acao/cdk-acao-trigger/cdk-acao-trigger-002/cdk-acao-trigger-002.module';
import {CdkAcaoTrigger003Module} from '@cdk/components/acao/cdk-acao-trigger/cdk-acao-trigger-003/cdk-acao-trigger-003.module';
import {CdkAcaoTrigger004Module} from '@cdk/components/acao/cdk-acao-trigger/cdk-acao-trigger-004/cdk-acao-trigger-004.module';

const routes: Routes = [
    {
        path: ':acaoHandle',
        component: AcaoEditComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'pessoa',
                loadChildren: () => import('app/main/apps/pessoa/pessoa.module').then(m => m.PessoaModule),
            }
        ]
    }
];

const path = 'app/main/apps/coordenador/etiquetas/etiqueta-edit/acoes/acao-edit';

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
        MatSelectModule,
        CdkAcaoTrigger001Module,
        CdkAcaoTrigger002Module,
        CdkAcaoTrigger003Module,
        CdkAcaoTrigger004Module,
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
