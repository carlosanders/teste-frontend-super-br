import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';

import {CdkSharedModule} from "@cdk/shared.module";
import {ChatImagemComponent} from "./chat-imagem.component";
import {PipesModule} from "../../../../../@cdk/pipes/pipes.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatBadgeModule} from "@angular/material/badge";

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
    ],
    exports: [
        ChatImagemComponent
    ]
})
export class ChatImagemModule
{
}
