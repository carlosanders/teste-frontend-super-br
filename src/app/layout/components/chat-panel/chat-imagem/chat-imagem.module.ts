import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';

import {LoginService} from "../../../../main/auth/login/login.service";
import {CdkSharedModule} from "@cdk/shared.module";
import {ChatImagemComponent} from "./chat-imagem.component";
import {PipesModule} from "../../../../../@cdk/pipes/pipes.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatBadgeModule} from "@angular/material/badge";
import {ChatUtils} from "../utils/chat.utils";

@NgModule({
    declarations: [
        ChatImagemComponent
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatTooltipModule,
        MatRippleModule,
        MatBadgeModule,
        CdkSharedModule,
        MatProgressSpinnerModule,
        PipesModule
    ],
    providers: [
        LoginService,
        ChatUtils
    ],
    exports: [
        ChatImagemComponent
    ]
})
export class ChatImagemModule
{
}
