import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { EnderecoService } from '@cdk/services/endereco.service';
import { CdkEnderecoGridsearchComponent } from './cdk-endereco-gridsearch.component';
import { CdkEnderecoGridModule } from '@cdk/components/endereco/cdk-endereco-grid/cdk-endereco-grid.module';

@NgModule({
    declarations: [
        CdkEnderecoGridsearchComponent
    ],
    imports: [

        CdkEnderecoGridModule,
        
        FuseSharedModule,
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
