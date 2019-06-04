import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ModeloService } from '@cdk/services/modelo.service';
import { CdkModeloGridsearchComponent } from './cdk-modelo-gridsearch.component';
import { CdkModeloGridModule } from '@cdk/components/modelo/cdk-modelo-grid/cdk-modelo-grid.module';

@NgModule({
    declarations: [
        CdkModeloGridsearchComponent
    ],
    imports: [

        CdkModeloGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        ModeloService
    ],
    exports: [
        CdkModeloGridsearchComponent
    ]
})
export class CdkModeloGridsearchModule {
}
