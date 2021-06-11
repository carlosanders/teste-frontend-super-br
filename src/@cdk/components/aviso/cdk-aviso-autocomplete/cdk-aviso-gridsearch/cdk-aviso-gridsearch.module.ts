import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkAvisoGridsearchComponent} from './cdk-aviso-gridsearch.component';
import {CdkAvisoGridModule} from '@cdk/components/aviso/cdk-aviso-grid/cdk-aviso-grid.module';
import {AvisoService} from '@cdk/services/aviso.service';

@NgModule({
    declarations: [
        CdkAvisoGridsearchComponent
    ],
    imports: [
        CdkAvisoGridModule,
        CdkSharedModule,
    ],
    providers: [
        AvisoService
    ],
    exports: [
        CdkAvisoGridsearchComponent
    ]
})
export class CdkAvisoGridsearchModule {
}
