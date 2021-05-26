import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {SidebarEmptyComponent} from './sidebar-empty.component';


const routes: Routes = [
    {
        path: '',
        component: SidebarEmptyComponent
    }
];

@NgModule({
    declarations: [
        SidebarEmptyComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        SidebarEmptyComponent
    ]
})
export class SidebarEmptyModule {
}
