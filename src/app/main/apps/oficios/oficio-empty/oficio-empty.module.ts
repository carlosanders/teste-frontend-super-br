import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {OficioEmptyComponent} from './oficio-empty.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';

const routes: Routes = [
    {
        path: '',
        component: OficioEmptyComponent
    }
];

@NgModule({
    declarations: [
        OficioEmptyComponent
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
export class OficioEmptyModule {
}
