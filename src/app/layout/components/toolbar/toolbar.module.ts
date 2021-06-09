import {NgModule} from '@angular/core';
import {RouterModule}                                                                                                             from '@angular/router';
import {MatBadgeModule, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatListModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {CdkSearchBarModule, CdkShortcutsModule}                                                                                   from '@cdk/components';
import {CdkSharedModule}                                                                                                          from '@cdk/shared.module';
import {ToolbarComponent}                                                                                                         from './toolbar.component';
import {LoginService}                                                                                                             from 'app/main/auth/login/login.service';
import {NotificacaoService}                                                                                                       from '@cdk/services/notificacao.service';
import {AjudaComponent}                                                                                                           from '../../../../ajuda/ajuda.component';
import {MatTooltipModule}                                                                                                         from '@angular/material/tooltip';
import { TourModule }                                                                                                             from 'ajuda/tour/tour.module';
import {NavbarVerticalStyle1Module}                                                                                               from "../navbar/vertical/style-1/style-1.module";
import {ChatPanelModule} from "../chat-panel/chat-panel.module";
import { MatCheckboxModule }                                                                                                      from '@angular/material/checkbox';
import {ComponenteDigitalService} from "../../../../@cdk/services/componente-digital.service";


@NgModule({
    declarations: [
        ToolbarComponent,
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatListModule,
        MatBadgeModule,
        MatProgressSpinnerModule,
        CdkSharedModule,
        CdkSearchBarModule,
        CdkShortcutsModule,
        MatTooltipModule,
        TourModule,
        NavbarVerticalStyle1Module,
        MatCheckboxModule,
        ChatPanelModule
    ],
    providers: [
        LoginService,
        NotificacaoService,
        AjudaComponent,
        ComponenteDigitalService
    ],
    exports: [
        ToolbarComponent
    ],
})
export class ToolbarModule {
}
