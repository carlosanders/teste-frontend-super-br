import {NgModule} from '@angular/core';

import {CdkSidebarComponent} from './sidebar.component';

@NgModule({
    declarations: [
        CdkSidebarComponent
    ],
    exports     : [
        CdkSidebarComponent
    ]
})
export class CdkSidebarModule
{
}
