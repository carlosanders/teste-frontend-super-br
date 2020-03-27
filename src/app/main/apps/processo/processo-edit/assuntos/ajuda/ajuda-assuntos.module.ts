import {NgModule} from '@angular/core';

import {AjudaAssuntosComponent} from './ajuda-assuntos.component';
import {CdkSharedModule} from '../../../../../../../@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaAssuntosComponent
    ],
    imports: [
        CdkSharedModule,
        
    ],
    providers: [
    ],
    exports: [
        AjudaAssuntosComponent
    ]
})
export class AjudaAssuntosModule {
}