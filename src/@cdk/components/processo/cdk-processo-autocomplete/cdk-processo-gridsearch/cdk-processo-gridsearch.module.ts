import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProcessoService } from '@cdk/services/processo.service';
import { CdkProcessoGridsearchComponent } from './cdk-processo-gridsearch.component';
import { CdkProcessoGridModule } from '@cdk/components/processo/cdk-processo-grid/cdk-processo-grid.module';

@NgModule({
    declarations: [
        CdkProcessoGridsearchComponent
    ],
    imports: [

        CdkProcessoGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        ProcessoService
    ],
    exports: [
        CdkProcessoGridsearchComponent
    ]
})
export class CdkProcessoGridsearchModule {
}
