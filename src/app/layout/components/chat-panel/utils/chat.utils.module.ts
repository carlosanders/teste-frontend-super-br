import { NgModule } from '@angular/core';
import {ChatUtils} from "./chat.utils";
import {LoginService} from "../../../../main/auth/login/login.service";

@NgModule({
    declarations: [
        ChatUtils
    ],
    imports: [
    ],
    providers: [
        LoginService
    ],
    exports: [
        ChatUtils
    ]
})
export class ChatUtilsModule
{
}
