import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ModalidadeGeneroPessoaService } from '@cdk/services/modalidade-genero-pessoa.service';
import { CdkModalidadeGeneroPessoaGridsearchComponent } from './cdk-modalidade-genero-pessoa-gridsearch.component';
import { CdkModalidadeGeneroPessoaGridModule } from '@cdk/components/modalidade-genero-pessoa/cdk-modalidade-genero-pessoa-grid/cdk-modalidade-genero-pessoa-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeGeneroPessoaGridsearchComponent
    ],
    imports: [

        CdkModalidadeGeneroPessoaGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        ModalidadeGeneroPessoaService
    ],
    exports: [
        CdkModalidadeGeneroPessoaGridsearchComponent
    ]
})
export class CdkModalidadeGeneroPessoaGridsearchModule {
}
