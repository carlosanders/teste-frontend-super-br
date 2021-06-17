import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {TarefasOperacoesBlocoComponent} from './tarefas-operacoes-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: TarefasOperacoesBlocoComponent
    }
];

@NgModule({
    declarations: [
        TarefasOperacoesBlocoComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule
    ],
    providers: [
        TarefaService,
    ]
})
export class TarefasOperacoesBlocoModule {
}
