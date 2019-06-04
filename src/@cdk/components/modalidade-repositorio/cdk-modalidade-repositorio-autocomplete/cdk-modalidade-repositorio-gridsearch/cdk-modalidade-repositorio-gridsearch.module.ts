import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ModalidadeRepositorioService } from '@cdk/services/modalidade-repositorio.service';
import { CdkModalidadeRepositorioGridsearchComponent } from './cdk-modalidade-repositorio-gridsearch.component';
import { CdkModalidadeRepositorioGridModule } from '@cdk/components/modalidade-repositorio/cdk-modalidade-repositorio-grid/cdk-modalidade-repositorio-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeRepositorioGridsearchComponent
    ],
    imports: [

        CdkModalidadeRepositorioGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        ModalidadeRepositorioService
    ],
    exports: [
        CdkModalidadeRepositorioGridsearchComponent
    ]
})
export class CdkModalidadeRepositorioGridsearchModule {
}
