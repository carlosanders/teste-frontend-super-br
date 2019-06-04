import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/auth/login/login.module';

@NgModule({
    imports: [
        // Authentication
        LoginModule
    ]
})
export class AuthModule
{

}
