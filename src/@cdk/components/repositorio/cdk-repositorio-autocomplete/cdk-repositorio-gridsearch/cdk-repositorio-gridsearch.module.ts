import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {RepositorioService} from '@cdk/services/repositorio.service';
import {CdkRepositorioGridsearchComponent} from './cdk-repositorio-gridsearch.component';
import {CdkRepositorioGridModule} from '@cdk/components/repositorio/cdk-repositorio-grid/cdk-repositorio-grid.module';

@NgModule({
    declarations: [
        CdkRepositorioGridsearchComponent
    ],
    imports: [

        CdkRepositorioGridModule,

        CdkSharedModule,
    ],
    providers: [
        RepositorioService
    ],
    exports: [
        CdkRepositorioGridsearchComponent
    ]
})
export class CdkRepositorioGridsearchModule {
}
