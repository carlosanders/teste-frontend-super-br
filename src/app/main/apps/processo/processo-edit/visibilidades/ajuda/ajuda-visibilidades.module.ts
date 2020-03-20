import {NgModule} from '@angular/core';

import {AjudaVisibilidadesComponent} from './ajuda-visibilidades.component';
import {CdkSharedModule} from '../../../../../../../@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaVisibilidadesComponent
    ],
    imports: [
        CdkSharedModule,
        
    ],
    providers: [
    ],
    exports: [
        AjudaVisibilidadesComponent
    ]
})
export class AjudaVisibilidadesModule {
}