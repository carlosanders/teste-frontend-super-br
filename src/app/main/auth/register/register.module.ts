import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule
} from '@cdk/angular/material';
import {HttpClientModule} from '@angular/common/http';
import {CdkSharedModule} from '@cdk/shared.module';
import {RegisterComponent} from './register.component';
import {RegisterStoreModule} from './store/store.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

const routes = [
    {
        path     : '',
        component: RegisterComponent
    }
];

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        CdkSharedModule,
        RegisterStoreModule,
        NgxUpperCaseDirectiveModule
    ],
    providers: [
        UsuarioService
    ]
})

export class RegisterModule
{
}
