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
import {ChatMensagemListComponent} from "./chat-mensagem-list.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PipesModule} from "@cdk/pipes/pipes.module";
import {ChatImagemModule} from "../chat-imagem/chat-imagem.module";

@NgModule({
    declarations: [
        ChatMensagemListComponent
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatTooltipModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        ChatStoreModule,
        CdkSharedModule,
        PipesModule,
        ChatImagemModule
    ],
    providers: [
    ],
    exports: [
        ChatMensagemListComponent
    ]
})
export class ChatMensagemListModule
{
}
