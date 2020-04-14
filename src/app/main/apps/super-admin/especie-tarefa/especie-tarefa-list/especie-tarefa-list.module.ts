import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspecieTarefaListComponent} from './especie-tarefa-list.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: EspecieTarefaListComponent,
        // canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [EspecieTarefaListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ]
})
export class EspecieTarefaListModule {
}
