import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {GeneroRelevanciaService} from '@cdk/services/genero-relevancia.service';
import {CdkGeneroRelevanciaGridsearchComponent} from './cdk-genero-relevancia-gridsearch.component';
import {CdkGeneroRelevanciaGridModule} from '@cdk/components/genero-relevancia/cdk-genero-relevancia-grid/cdk-genero-relevancia-grid.module';

@NgModule({
    declarations: [
        CdkGeneroRelevanciaGridsearchComponent
    ],
    imports: [

        CdkGeneroRelevanciaGridModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroRelevanciaService
    ],
    exports: [
        CdkGeneroRelevanciaGridsearchComponent
    ]
})
export class CdkGeneroRelevanciaGridsearchModule {
}
