import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {AjudaPanelComponent} from './ajuda-panel.component';
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
