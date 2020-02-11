import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { GarantiaAdministrativoService } from '@cdk/services/garantia-administrativo.service';
import { CdkGarantiaAdministrativoGridsearchComponent } from './cdk-garantia-administrativo-gridsearch.component';
import { CdkGarantiaAdministrativoGridModule } from '@cdk/components/garantia-administrativo/cdk-garantia-administrativo-grid/cdk-garantia-administrativo-grid.module';

@NgModule({
    declarations: [
        CdkGarantiaAdministrativoGridsearchComponent
    ],
    imports: [

        CdkGarantiaAdministrativoGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        GarantiaAdministrativoService
    ],
    exports: [
        CdkGarantiaAdministrativoGridsearchComponent
    ]
})
export class CdkGarantiaAdministrativoGridsearchModule {
}
