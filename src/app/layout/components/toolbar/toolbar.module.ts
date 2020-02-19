import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatBadgeModule, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@cdk/angular/material';

import {FuseSearchBarModule, FuseShortcutsModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';

import {ToolbarComponent} from 'app/layout/components/toolbar/toolbar.component';
import {LoginService} from 'app/main/auth/login/login.service';
import {NotificacaoService} from '@cdk/services/notificacao.service';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatBadgeModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule
    ],
    providers: [
        LoginService,
        NotificacaoService
    ],
    exports: [
        ToolbarComponent
    ]
})
export class ToolbarModule {
}
