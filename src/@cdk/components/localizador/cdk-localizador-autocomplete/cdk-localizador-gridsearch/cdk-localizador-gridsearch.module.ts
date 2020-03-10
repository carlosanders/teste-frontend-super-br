import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {LocalizadorService} from '@cdk/services/localizador.service';
import {CdkLocalizadorGridsearchComponent} from './cdk-localizador-gridsearch.component';
import {CdkLocalizadorGridModule} from '@cdk/components/localizador/cdk-localizador-grid/cdk-localizador-grid.module';

@NgModule({
    declarations: [
        CdkLocalizadorGridsearchComponent
    ],
    imports: [

        CdkLocalizadorGridModule,

        CdkSharedModule,
    ],
    providers: [
        LocalizadorService
    ],
    exports: [
        CdkLocalizadorGridsearchComponent
    ]
})
export class CdkLocalizadorGridsearchModule {
}
