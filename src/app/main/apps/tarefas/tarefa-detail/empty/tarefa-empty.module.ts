import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {TarefaEmptyComponent} from './tarefa-empty.component';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: TarefaEmptyComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [TarefaEmptyComponent],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        CdkSharedModule
    ],
    providers: [
        fromGuards.ResolveGuard,
    ]
})
export class TarefaEmptyModule {
}
