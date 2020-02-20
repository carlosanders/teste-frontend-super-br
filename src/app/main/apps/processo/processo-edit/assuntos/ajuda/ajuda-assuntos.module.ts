import {NgModule} from '@angular/core';

import {AjudaAssuntosComponent} from './ajuda-assuntos.component';
import {FuseSharedModule} from '../../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaAssuntosComponent
    ],
    imports: [
        FuseSharedModule,
        
    ],
    providers: [
    ],
    exports: [
        AjudaAssuntosComponent
    ]
})
export class AjudaAssuntosModule {
}