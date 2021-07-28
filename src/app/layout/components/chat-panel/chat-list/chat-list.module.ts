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
import {ChatListComponent} from "./chat-list.component";
import {PipesModule} from "@cdk/pipes/pipes.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ChatImagemModule} from "../chat-imagem/chat-imagem.module";

@NgModule({
    declarations: [
        ChatListComponent
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
        CdkSharedModule,
        MatProgressSpinnerModule,
        PipesModule,
        ChatImagemModule
    ],
    providers: [
    ],
    exports: [
        ChatListComponent
    ]
})
export class ChatListModule
{
}
