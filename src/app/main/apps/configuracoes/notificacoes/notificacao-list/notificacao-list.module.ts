import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {NotificacaoListComponent} from './notificacao-list.component';
import {NotificacaoService} from '@cdk/services/notificacao.service';
import {RouterModule, Routes} from '@angular/router';
import {NotificacaoListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkNotificacaoGridModule} from '@cdk/components/notificacao/cdk-notificacao-grid/cdk-notificacao-grid.module';
import {LoginService} from 'app/main/auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: NotificacaoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

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

        FuseSharedModule,

        CdkNotificacaoGridModule,

        NotificacaoListStoreModule,
    ],
    providers: [
        NotificacaoService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        NotificacaoListComponent
    ]
})
export class NotificacaoListModule {
}
