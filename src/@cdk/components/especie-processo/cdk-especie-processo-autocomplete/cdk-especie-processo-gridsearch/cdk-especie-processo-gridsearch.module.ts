import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { EspecieProcessoService } from '@cdk/services/especie-processo.service';
import { CdkEspecieProcessoGridsearchComponent } from './cdk-especie-processo-gridsearch.component';
import { CdkEspecieProcessoGridModule } from '@cdk/components/especie-processo/cdk-especie-processo-grid/cdk-especie-processo-grid.module';

@NgModule({
    declarations: [
        CdkEspecieProcessoGridsearchComponent
    ],
    imports: [

        CdkEspecieProcessoGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        EspecieProcessoService
    ],
    exports: [
        CdkEspecieProcessoGridsearchComponent
    ]
})
export class CdkEspecieProcessoGridsearchModule {
}
