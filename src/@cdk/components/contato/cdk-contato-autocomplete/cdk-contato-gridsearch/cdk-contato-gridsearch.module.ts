import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ContatoService} from '@cdk/services/contato.service';
import {CdkContatoGridsearchComponent} from './cdk-contato-gridsearch.component';
import {CdkContatoGridModule} from '@cdk/components/contato/cdk-contato-grid/cdk-contato-grid.module';

@NgModule({
    declarations: [
        CdkContatoGridsearchComponent
    ],
    imports: [

        CdkContatoGridModule,

        CdkSharedModule,
    ],
    providers: [
        ContatoService
    ],
    exports: [
        CdkContatoGridsearchComponent
    ]
})
export class CdkContatoGridsearchModule {
}
