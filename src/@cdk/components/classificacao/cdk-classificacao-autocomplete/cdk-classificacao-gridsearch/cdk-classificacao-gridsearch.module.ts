import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ClassificacaoService } from '@cdk/services/classificacao.service';
import { CdkClassificacaoGridsearchComponent } from './cdk-classificacao-gridsearch.component';
import { CdkClassificacaoGridModule } from '@cdk/components/classificacao/cdk-classificacao-grid/cdk-classificacao-grid.module';

@NgModule({
    declarations: [
        CdkClassificacaoGridsearchComponent
    ],
    imports: [

        CdkClassificacaoGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        ClassificacaoService
    ],
    exports: [
        CdkClassificacaoGridsearchComponent
    ]
})
export class CdkClassificacaoGridsearchModule {
}
