import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {TarefaEmptyComponent} from './tarefa-empty.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material';

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
    ],
    providers: [
    ]
})
export class TarefaEmptyModule {
}
