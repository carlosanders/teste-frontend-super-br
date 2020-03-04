import { NgModule } from '@angular/core';

import { CdkSharedModule } from '@cdk/shared.module';

import { AjudaPanelComponent } from 'app/layout/components/ajuda-panel/ajuda-panel.component';
import {AjudaModule} from '../../../../ajuda/ajuda.module';

@NgModule({
    declarations: [
        AjudaPanelComponent
    ],
    imports     : [
        AjudaModule,
        CdkSharedModule,
    ],
    exports: [
        AjudaPanelComponent
    ]
})
export class AjudaPanelModule
{
}
