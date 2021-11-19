import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeCopiaService} from '@cdk/services/modalidade-copia.service';
import {CdkModalidadeCopiaGridsearchComponent} from './cdk-modalidade-copia-gridsearch.component';
import {CdkModalidadeCopiaGridModule} from '@cdk/components/modalidade-copia/cdk-modalidade-copia-grid/cdk-modalidade-copia-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeCopiaGridsearchComponent
    ],
    imports: [

        CdkModalidadeCopiaGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeCopiaService
    ],
    exports: [
        CdkModalidadeCopiaGridsearchComponent
    ]
})
export class CdkModalidadeCopiaGridsearchModule {
}
