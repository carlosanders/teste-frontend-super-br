import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {SetorService} from '@cdk/services/setor.service';
import {CdkSetorGridsearchComponent} from './cdk-setor-gridsearch.component';
import {CdkSetorGridModule} from '@cdk/components/setor/cdk-setor-grid/cdk-setor-grid.module';

@NgModule({
    declarations: [
        CdkSetorGridsearchComponent
    ],
    imports: [

        CdkSetorGridModule,

        CdkSharedModule,
    ],
    providers: [
        SetorService
    ],
    exports: [
        CdkSetorGridsearchComponent
    ]
})
export class CdkSetorGridsearchModule {
}
