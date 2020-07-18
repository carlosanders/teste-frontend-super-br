import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatBadgeModule, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@cdk/angular/material';

import {CdkSearchBarModule, CdkShortcutsModule} from '@cdk/components';
import {CdkSharedModule} from '@cdk/shared.module';

import {ToolbarComponent} from './toolbar.component';
import {LoginService} from 'app/main/auth/login/login.service';
import {NotificacaoService} from '@cdk/services/notificacao.service';
import {AjudaComponent} from 'ajuda/ajuda.component';

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


        CdkSharedModule,
        CdkSearchBarModule,
        CdkShortcutsModule
    ],
    providers: [
        LoginService,
        NotificacaoService,
        AjudaComponent,
    ],
    exports: [
        ToolbarComponent
    ]
})
export class ToolbarModule {
}
