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
import {ChatParticipantesListComponent} from "./chat-participantes-list.component";
import {PipesModule} from "@cdk/pipes/pipes.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {ChatImagemModule} from "../chat-imagem/chat-imagem.module";
import {ChatMensagemHeaderModule} from "../chat-mensagem-header/chat-mensagem-header.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CdkUsuarioAutocompleteModule} from "@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module";
import {MatAutocompleteModule} from "@cdk/angular/material";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
    declarations: [
        ChatParticipantesListComponent
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
        ChatImagemModule,
        ChatMensagemHeaderModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        InfiniteScrollModule,
        CdkUsuarioAutocompleteModule
    ],
    providers: [
    ],
    exports: [
        ChatParticipantesListComponent
    ]
})
export class ChatParticipantesListModule
{
}
