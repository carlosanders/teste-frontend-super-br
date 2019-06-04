import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { EspecieRelevanciaService } from '@cdk/services/especie-relevancia.service';
import { CdkEspecieRelevanciaGridsearchComponent } from './cdk-especie-relevancia-gridsearch.component';
import { CdkEspecieRelevanciaGridModule } from '@cdk/components/especie-relevancia/cdk-especie-relevancia-grid/cdk-especie-relevancia-grid.module';

@NgModule({
    declarations: [
        CdkEspecieRelevanciaGridsearchComponent
    ],
    imports: [

        CdkEspecieRelevanciaGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        EspecieRelevanciaService
    ],
    exports: [
        CdkEspecieRelevanciaGridsearchComponent
    ]
})
export class CdkEspecieRelevanciaGridsearchModule {
}
