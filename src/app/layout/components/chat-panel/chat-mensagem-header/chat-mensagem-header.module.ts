import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';

import {ChatStoreModule} from "../store/store.module";
import {CdkSharedModule} from "@cdk/shared.module";
import {ChatMensagemHeaderComponent} from "./chat-mensagem-header.component";
import {PipesModule} from "@cdk/pipes/pipes.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {ChatImagemModule} from "../chat-imagem/chat-imagem.module";

@NgModule({
    declarations: [
        ChatMensagemHeaderComponent
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        MatMenuModule,
        MatTooltipModule,
        MatRippleModule,
        ChatStoreModule,
        CdkSharedModule,
        PipesModule,
        ChatImagemModule
    ],
    providers: [
    ],
    exports: [
        ChatMensagemHeaderComponent
    ]
})
export class ChatMensagemHeaderModule
{
}
