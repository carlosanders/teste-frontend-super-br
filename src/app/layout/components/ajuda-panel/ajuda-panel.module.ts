import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { AjudaPanelComponent } from 'app/layout/components/ajuda-panel/ajuda-panel.component';
import {AjudaModule} from '../../../../ajuda/ajuda.module';

@NgModule({
    declarations: [
        AjudaPanelComponent
    ],
    imports     : [
        AjudaModule,
        FuseSharedModule,
    ],
    exports: [
        AjudaPanelComponent
    ]
})
export class AjudaPanelModule
{
}
