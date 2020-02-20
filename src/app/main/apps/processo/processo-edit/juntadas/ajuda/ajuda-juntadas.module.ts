import {NgModule} from '@angular/core';

import {AjudaJuntadasComponent} from './ajuda-juntadas.component';
import {FuseSharedModule} from '../../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaJuntadasComponent
    ],
    imports: [
        FuseSharedModule,
        
    ],
    providers: [
    ],
    exports: [
        AjudaJuntadasComponent
    ]
})
export class AjudaJuntadasModule {
}