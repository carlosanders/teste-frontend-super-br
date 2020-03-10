import { NgModule } from '@angular/core';

import { CdkSharedModule } from '@cdk/shared.module';

import { ModalidadeGarantiaService } from '@cdk/services/modalidade-garantia.service';
import { CdkModalidadeGarantiaGridsearchComponent } from './cdk-modalidade-garantia-gridsearch.component';
import { CdkModalidadeGarantiaGridModule } from '@cdk/components/modalidade-garantia/cdk-modalidade-garantia-grid/cdk-modalidade-garantia-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeGarantiaGridsearchComponent
    ],
    imports: [

        CdkModalidadeGarantiaGridModule,
        
        CdkSharedModule,
    ],
    providers: [
        ModalidadeGarantiaService
    ],
    exports: [
        CdkModalidadeGarantiaGridsearchComponent
    ]
})
export class CdkModalidadeGarantiaGridsearchModule {
}