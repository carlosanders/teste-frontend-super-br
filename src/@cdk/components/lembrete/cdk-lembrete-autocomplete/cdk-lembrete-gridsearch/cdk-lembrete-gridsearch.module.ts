import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {LembreteService} from '@cdk/services/lembrete.service';
import {CdkLembreteGridsearchComponent} from './cdk-lembrete-gridsearch.component';
import {CdkLembreteGridModule} from '@cdk/components/lembrete/cdk-lembrete-grid/cdk-lembrete-grid.module';

@NgModule({
    declarations: [
        CdkLembreteGridsearchComponent
    ],
    imports: [

        CdkLembreteGridModule,

        CdkSharedModule,
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
