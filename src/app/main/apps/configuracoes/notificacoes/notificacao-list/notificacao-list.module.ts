import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {NotificacaoListComponent} from './notificacao-list.component';
import {NotificacaoService} from '@cdk/services/notificacao.service';
import {RouterModule, Routes} from '@angular/router';
import {NotificacaoListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkNotificacaoGridModule} from '@cdk/components/notificacao/cdk-notificacao-grid/cdk-notificacao-grid.module';
import {LoginService} from 'app/main/auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: NotificacaoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/notificacoes/notificacao-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        NotificacaoListComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        TranslateModule,

        CdkSharedModule,

        CdkNotificacaoGridModule,

        NotificacaoListStoreModule,
        PathModule,
    ],
    providers: [
        NotificacaoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        NotificacaoListComponent
    ]
})
export class NotificacaoListModule {
}
