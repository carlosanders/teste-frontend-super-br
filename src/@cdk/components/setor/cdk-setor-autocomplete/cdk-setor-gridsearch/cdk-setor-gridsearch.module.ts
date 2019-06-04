import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SetorService } from '@cdk/services/setor.service';
import { CdkSetorGridsearchComponent } from './cdk-setor-gridsearch.component';
import { CdkSetorGridModule } from '@cdk/components/setor/cdk-setor-grid/cdk-setor-grid.module';

@NgModule({
    declarations: [
        CdkSetorGridsearchComponent
    ],
    imports: [

        CdkSetorGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        SetorService
    ],
    exports: [
        CdkSetorGridsearchComponent
    ]
})
export class CdkSetorGridsearchModule {
}
