import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {GeneroSetorService} from '@cdk/services/genero-setor.service';
import {CdkGeneroSetorGridsearchComponent} from './cdk-genero-setor-gridsearch.component';
import {CdkGeneroSetorGridModule} from '@cdk/components/genero-setor/cdk-genero-setor-grid/cdk-genero-setor-grid.module';

@NgModule({
    declarations: [
        CdkGeneroSetorGridsearchComponent
    ],
    imports: [

        CdkGeneroSetorGridModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroSetorService
    ],
    exports: [
        CdkGeneroSetorGridsearchComponent
    ]
})
export class CdkGeneroSetorGridsearchModule {
}
