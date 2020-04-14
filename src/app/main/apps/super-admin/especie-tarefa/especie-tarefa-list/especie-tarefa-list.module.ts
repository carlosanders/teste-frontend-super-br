import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspecieTarefaListComponent} from './especie-tarefa-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {EspecieTarefaStoreModule} from './store/store.module';
import {EspecieTarefaService} from '../../../../../../@cdk/services/especie-tarefa.service';

const routes: Routes = [
    {
        path: '',
        component: EspecieTarefaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [EspecieTarefaListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        EspecieTarefaStoreModule
    ],
    providers: [
        LoginService,
        fromGuards.ResolveGuard,
        EspecieTarefaService
    ]
})
export class EspecieTarefaListModule {
}
