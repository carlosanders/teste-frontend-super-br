import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeMeioService} from '@cdk/services/modalidade-meio.service';
import {CdkModalidadeMeioGridsearchComponent} from './cdk-modalidade-meio-gridsearch.component';
import {CdkModalidadeMeioGridModule} from '@cdk/components/modalidade-meio/cdk-modalidade-meio-grid/cdk-modalidade-meio-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeMeioGridsearchComponent
    ],
    imports: [

        CdkModalidadeMeioGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeMeioService
    ],
    exports: [
        CdkModalidadeMeioGridsearchComponent
    ]
})
export class CdkModalidadeMeioGridsearchModule {
}
