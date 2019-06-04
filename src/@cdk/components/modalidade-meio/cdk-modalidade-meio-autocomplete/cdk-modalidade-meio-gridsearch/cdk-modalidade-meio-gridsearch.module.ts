import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ModalidadeMeioService } from '@cdk/services/modalidade-meio.service';
import { CdkModalidadeMeioGridsearchComponent } from './cdk-modalidade-meio-gridsearch.component';
import { CdkModalidadeMeioGridModule } from '@cdk/components/modalidade-meio/cdk-modalidade-meio-grid/cdk-modalidade-meio-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeMeioGridsearchComponent
    ],
    imports: [

        CdkModalidadeMeioGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        ModalidadeMeioService
    ],
    exports: [
        CdkModalidadeMeioGridsearchComponent
    ]
})
export class CdkModalidadeMeioGridsearchModule {
}
