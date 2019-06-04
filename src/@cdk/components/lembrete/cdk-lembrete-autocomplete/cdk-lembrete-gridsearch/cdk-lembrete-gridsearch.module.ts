import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {LembreteService} from '@cdk/services/lembrete.service';
import {CdkLembreteGridsearchComponent} from './cdk-lembrete-gridsearch.component';
import {CdkLembreteGridModule} from '@cdk/components/lembrete/cdk-lembrete-grid/cdk-lembrete-grid.module';

@NgModule({
    declarations: [
        CdkLembreteGridsearchComponent
    ],
    imports: [

        CdkLembreteGridModule,

        FuseSharedModule,
    ],
    providers: [
        LembreteService
    ],
    exports: [
        CdkLembreteGridsearchComponent
    ]
})
export class CdkLembreteGridsearchModule {
}
