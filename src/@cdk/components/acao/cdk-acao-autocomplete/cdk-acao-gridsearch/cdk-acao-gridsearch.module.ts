import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { AcaoService } from '@cdk/services/acao.service';
import { CdkAcaoGridsearchComponent } from './cdk-acao-gridsearch.component';
import { CdkAcaoGridModule } from '@cdk/components/acao/cdk-acao-grid/cdk-acao-grid.module';

@NgModule({
    declarations: [
        CdkAcaoGridsearchComponent
    ],
    imports: [

        CdkAcaoGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        AcaoService
    ],
    exports: [
        CdkAcaoGridsearchComponent
    ]
})
export class CdkAcaoGridsearchModule {
}
