import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { PessoaService } from '@cdk/services/pessoa.service';
import { CdkPessoaGridsearchComponent } from './cdk-pessoa-gridsearch.component';
import { CdkPessoaGridModule } from '@cdk/components/pessoa/cdk-pessoa-grid/cdk-pessoa-grid.module';

@NgModule({
    declarations: [
        CdkPessoaGridsearchComponent
    ],
    imports: [

        CdkPessoaGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        PessoaService
    ],
    exports: [
        CdkPessoaGridsearchComponent
    ]
})
export class CdkPessoaGridsearchModule {
}
