import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {CdkConfiguracaoNupGridsearchComponent} from './cdk-configuracao-nup-gridsearch.component';
import {ConfiguracaoNupService} from '@cdk/services/configuracao-nup.service';
import {CdkConfiguracaoNupGridModule} from '../../cdk-configuracao-nup-grid/cdk-configuracao-nup-grid.module';

// @ts-ignore
@NgModule({
    declarations: [
        CdkConfiguracaoNupGridsearchComponent
    ],
    imports: [

        CdkConfiguracaoNupGridModule,

        CdkSharedModule,
    ],
    providers: [
        ConfiguracaoNupService
    ],
    exports: [
        CdkConfiguracaoNupGridsearchComponent
    ]
})
export class CdkConfiguracaoNupGridsearchModule {
}

