import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {EnderecoService} from '@cdk/services/endereco.service';
import {CdkEnderecoGridsearchComponent} from './cdk-endereco-gridsearch.component';
import {CdkEnderecoGridModule} from '@cdk/components/endereco/cdk-endereco-grid/cdk-endereco-grid.module';

@NgModule({
    declarations: [
        CdkEnderecoGridsearchComponent
    ],
    imports: [

        CdkEnderecoGridModule,

        CdkSharedModule,
    ],
    providers: [
        EnderecoService
    ],
    exports: [
        CdkEnderecoGridsearchComponent
    ]
})
export class CdkEnderecoGridsearchModule {
}
