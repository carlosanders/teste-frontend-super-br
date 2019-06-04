import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { EspecieSetorService } from '@cdk/services/especie-setor.service';
import { CdkEspecieSetorGridsearchComponent } from './cdk-especie-setor-gridsearch.component';
import { CdkEspecieSetorGridModule } from '@cdk/components/especie-setor/cdk-especie-setor-grid/cdk-especie-setor-grid.module';

@NgModule({
    declarations: [
        CdkEspecieSetorGridsearchComponent
    ],
    imports: [

        CdkEspecieSetorGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        EspecieSetorService
    ],
    exports: [
        CdkEspecieSetorGridsearchComponent
    ]
})
export class CdkEspecieSetorGridsearchModule {
}
