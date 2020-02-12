import {NgModule} from '@angular/core';

import {AjudaModeloBlocoComponent} from './ajuda-modelo-bloco.component';
import {FuseSharedModule} from '../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaModeloBlocoComponent
    ],
    imports: [
        FuseSharedModule
    ],
    providers: [
    ], 
    exports:    [
        AjudaModeloBlocoComponent
    ]
})
export class AjudaModeloBlocoModule {
}