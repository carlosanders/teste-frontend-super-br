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
import {ChatHeaderComponent} from "./chat-header.component";
import {PipesModule} from "@cdk/pipes/pipes.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {CdkUsuarioAutocompleteModule} from "../../../../../@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module";
import {MatAutocompleteModule} from "../../../../../@cdk/angular/material";
import {LoginService} from "../../../../main/auth/login/login.service";

@NgModule({
    declarations: [
        ChatHeaderComponent
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
        CdkUsuarioAutocompleteModule
    ],
    providers: [
        LoginService
    ],
    exports: [
        ChatHeaderComponent
    ]
})
export class ChatHeaderModule
{
}
