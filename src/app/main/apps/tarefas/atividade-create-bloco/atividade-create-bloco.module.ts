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
    MatProgressSpinnerModule, MatTooltipModule, MatListModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {AtividadeCreateBlocoComponent} from './atividade-create-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkAtividadeFormModule} from '@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';
import {AtividadeCreateBlocoStoreModule} from './store/store.module';
import {AtividadeService} from '@cdk/services/atividade.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {MatCardModule} from '@angular/material/card';
import {PipesModule} from '@cdk/pipes/pipes.module';
import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: AtividadeCreateBlocoComponent,
        children: [
            {
                path       : 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/tarefas/atividade-create-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AtividadeCreateBlocoComponent
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
        MatListModule,
        MatCardModule,

        CdkAtividadeFormModule,

        AtividadeCreateBlocoStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkDocumentoCardListModule,
        PipesModule
    ],
    providers: [
        AtividadeService,
        DocumentoService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class AtividadeCreateBlocoModule {
}
