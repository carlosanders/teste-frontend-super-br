import {NgModule} from '@angular/core';

import {AjudaInteressadosComponent} from './ajuda-interessados.component';
import {FuseSharedModule} from '../../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaInteressadosComponent
    ],
    imports: [
        FuseSharedModule,
        
    ],
    providers: [
    ],
    exports: [
        AjudaInteressadosComponent
    ]
})
export class AjudaInteressadosModule {
}