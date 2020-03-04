import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {ProcessoAcessoNegadoComponent} from './processo-acesso-negado.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@cdk/angular/material';

const routes: Routes = [
    {
        path: '',
        component: ProcessoAcessoNegadoComponent
    }
];

@NgModule({
    declarations: [
        ProcessoAcessoNegadoComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatIconModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
    ]
})
export class ProcessoAcessoNegadoModule {
}
