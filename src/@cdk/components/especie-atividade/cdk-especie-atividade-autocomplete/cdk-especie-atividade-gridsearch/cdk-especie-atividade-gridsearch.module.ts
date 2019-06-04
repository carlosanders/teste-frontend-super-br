import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { EspecieAtividadeService } from '@cdk/services/especie-atividade.service';
import { CdkEspecieAtividadeGridsearchComponent } from './cdk-especie-atividade-gridsearch.component';
import { CdkEspecieAtividadeGridModule } from '@cdk/components/especie-atividade/cdk-especie-atividade-grid/cdk-especie-atividade-grid.module';

@NgModule({
    declarations: [
        CdkEspecieAtividadeGridsearchComponent
    ],
    imports: [

        CdkEspecieAtividadeGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        EspecieAtividadeService
    ],
    exports: [
        CdkEspecieAtividadeGridsearchComponent
    ]
})
export class CdkEspecieAtividadeGridsearchModule {
}
