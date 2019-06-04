import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {CdkVinculacaoRepositorioGridsearchComponent} from './cdk-vinculacao-repositorio-gridsearch.component';
import {CdkVinculacaoRepositorioGridModule} from '@cdk/components/vinculacao-repositorio/cdk-vinculacao-repositorio-grid/cdk-vinculacao-repositorio-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoRepositorioGridsearchComponent
    ],
    imports: [

        CdkVinculacaoRepositorioGridModule,

        FuseSharedModule,
    ],
    providers: [
        VinculacaoRepositorioService
    ],
    exports: [
        CdkVinculacaoRepositorioGridsearchComponent
    ]
})
export class CdkVinculacaoRepositorioGridsearchModule {
}
