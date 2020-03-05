import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {ArquivistaEmptyComponent} from './arquivista-empty.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule, MatProgressSpinnerModule} from '@cdk/angular/material';

const routes: Routes = [
    {
        path: '',
        component: ArquivistaEmptyComponent
    }
];

@NgModule({
    declarations: [
        ArquivistaEmptyComponent
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
export class ArquivistaEmptyModule {
}
