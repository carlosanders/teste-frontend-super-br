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

import {EsqueciSenhaComponent} from './esqueci-senha.component';

import {EsqueciSenhaStoreModule} from './store/store.module';
import {EsqueciSenhaService} from './esqueci-senha.service';

const routes = [
    {
        path: '',
        component: EsqueciSenhaComponent
    }
];

@NgModule({
    declarations: [
        EsqueciSenhaComponent
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

        EsqueciSenhaStoreModule
    ],
    providers: [
        EsqueciSenhaService
    ]

})
export class EsqueciSenhaModule {
}
