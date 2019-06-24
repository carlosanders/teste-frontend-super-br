import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {ProcessoEmptyComponent} from './processo-empty.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material';

const routes: Routes = [
    {
        path: '',
        component: ProcessoEmptyComponent
    }
];

@NgModule({
    declarations: [
        ProcessoEmptyComponent
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
export class ProcessoEmptyModule {
}
