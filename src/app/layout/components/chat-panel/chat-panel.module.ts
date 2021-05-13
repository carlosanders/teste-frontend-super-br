import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ChatPanelComponent } from 'app/layout/components/chat-panel/chat-panel.component';
import {ChatStoreModule} from "./store/store.module";
import {LoginService} from "../../../main/auth/login/login.service";
import {ChatService} from "../../../../@cdk/services/chat.service";
import {CdkSharedModule} from "../../../../@cdk/shared.module";
import {ChatListModule} from "./chat-list/chat-list.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {DirectivesModule} from "../../../../@cdk/directives/directives";
import {ChatMensagemService} from "../../../../@cdk/services/chat-mensagem.service";
import {ChatMensagemListModule} from "./chat-mensagem-list/chat-mensagem-list.module";
import {MercureService} from "../../../../@cdk/services/mercure.service";
import {ChatHeaderModule} from "./chat-header/chat-header.module";
import {ChatMensagemHeaderModule} from "./chat-mensagem-header/chat-mensagem-header.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
    declarations: [
        ChatPanelComponent
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatTooltipModule,
        MatRippleModule,
        ChatStoreModule,
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        DirectivesModule,
        CdkSharedModule,
        InfiniteScrollModule,
        ChatListModule,
        ChatMensagemListModule,
        ChatHeaderModule,
        ChatMensagemHeaderModule
    ],
    providers: [
        LoginService,
        ChatService,
        ChatMensagemService,
        MercureService
    ],
    exports: [
        ChatPanelComponent
    ]
})
export class ChatPanelModule
{
}
