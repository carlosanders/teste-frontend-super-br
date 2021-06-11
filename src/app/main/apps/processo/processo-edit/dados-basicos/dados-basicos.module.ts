import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {DadosBasicosComponent} from './dados-basicos.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkProcessoFormModule} from '@cdk/components/processo/cdk-processo-form/cdk-processo-form.module';
import {DadosBasicosStoreModule} from './store/store.module';
import {ProcessoService} from '@cdk/services/processo.service';
import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {CdkProcessoModalClassificacaoRestritaModule} from '@cdk/components/processo/cdk-processo-modal-classificacao-restrita/cdk-processo-modal-classificacao-restrita.module';

const routes: Routes = [
    {
        path: '',
        component: DadosBasicosComponent,
        children: [
            {
                path       : 'pessoa',
                loadChildren: () => import('app/main/apps/pessoa/pessoa.module').then(m => m.PessoaModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/dados-basicos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DadosBasicosComponent
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

        CdkProcessoFormModule,

        DadosBasicosStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatDialogModule,
        CdkProcessoModalClassificacaoRestritaModule
    ],
    providers: [
        ProcessoService,
        fromGuards.ResolveGuard
    ]
})
export class DadosBasicosModule {
}
