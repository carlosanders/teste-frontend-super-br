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
import {PipesModule} from "@cdk/pipes/pipes.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {CdkUsuarioAutocompleteModule} from "@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module";
import {MatAutocompleteModule} from "@cdk/angular/material";
import {ChatGrupoFormComponent} from "./chat-grupo-form.component";
import {ImageCropperModule} from "ngx-image-cropper";
import {ChatMensagemHeaderModule} from "../chat-mensagem-header/chat-mensagem-header.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    declarations: [
        ChatGrupoFormComponent
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
        MatAutocompleteModule,
        ImageCropperModule,
        ChatMensagemHeaderModule,
        MatProgressSpinnerModule,
        CdkUsuarioAutocompleteModule
    ],
    providers: [
    ],
    exports: [
        ChatGrupoFormComponent
    ]
})
export class ChatGrupoFormModule
{
}
