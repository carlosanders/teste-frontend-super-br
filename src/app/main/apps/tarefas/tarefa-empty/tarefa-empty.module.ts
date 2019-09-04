import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {TarefaEmptyComponent} from './tarefa-empty.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';

const routes: Routes = [
    {
        path: '',
        component: TarefaEmptyComponent
    }
];

@NgModule({
    declarations: [
        TarefaEmptyComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatIconModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
        MatProgressSpinnerModule,
    ],
    providers: [
    ]
})
export class TarefaEmptyModule {
}
