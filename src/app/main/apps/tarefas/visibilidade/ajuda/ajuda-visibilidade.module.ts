import {NgModule} from '@angular/core';

import {AjudaVisibilidadeComponent} from './ajuda-visibilidade.component';
import {FuseSharedModule} from '../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaVisibilidadeComponent
    ],
    imports: [
        FuseSharedModule
    ],
    providers: [
    ],
    exports:[
        AjudaVisibilidadeComponent
    ]
})
export class AjudaVisibilidadeModule {
}