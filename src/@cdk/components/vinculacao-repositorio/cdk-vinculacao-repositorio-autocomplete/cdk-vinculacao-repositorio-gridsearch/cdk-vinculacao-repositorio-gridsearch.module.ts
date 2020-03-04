import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {CdkVinculacaoRepositorioGridsearchComponent} from './cdk-vinculacao-repositorio-gridsearch.component';
import {CdkVinculacaoRepositorioGridModule} from '@cdk/components/vinculacao-repositorio/cdk-vinculacao-repositorio-grid/cdk-vinculacao-repositorio-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoRepositorioGridsearchComponent
    ],
    imports: [

        CdkVinculacaoRepositorioGridModule,

        CdkSharedModule,
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
