import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { AssuntoAdministrativoService } from '@cdk/services/assunto-administrativo.service';
import { CdkAssuntoAdministrativoGridsearchComponent } from './cdk-assunto-administrativo-gridsearch.component';
import { CdkAssuntoAdministrativoGridModule } from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-grid/cdk-assunto-administrativo-grid.module';

@NgModule({
    declarations: [
        CdkAssuntoAdministrativoGridsearchComponent
    ],
    imports: [

        CdkAssuntoAdministrativoGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        AssuntoAdministrativoService
    ],
    exports: [
        CdkAssuntoAdministrativoGridsearchComponent
    ]
})
export class CdkAssuntoAdministrativoGridsearchModule {
}
