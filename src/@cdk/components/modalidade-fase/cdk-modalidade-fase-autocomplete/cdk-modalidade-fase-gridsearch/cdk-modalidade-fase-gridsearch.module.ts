import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ModalidadeFaseService } from '@cdk/services/modalidade-fase.service';
import { CdkModalidadeFaseGridsearchComponent } from './cdk-modalidade-fase-gridsearch.component';
import { CdkModalidadeFaseGridModule } from '@cdk/components/modalidade-fase/cdk-modalidade-fase-grid/cdk-modalidade-fase-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeFaseGridsearchComponent
    ],
    imports: [

        CdkModalidadeFaseGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        ModalidadeFaseService
    ],
    exports: [
        CdkModalidadeFaseGridsearchComponent
    ]
})
export class CdkModalidadeFaseGridsearchModule {
}
