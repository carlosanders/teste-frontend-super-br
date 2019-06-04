import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ModalidadeCategoriaSigiloService } from '@cdk/services/modalidade-categoria-sigilo.service';
import { CdkModalidadeCategoriaSigiloGridsearchComponent } from './cdk-modalidade-categoria-sigilo-gridsearch.component';
import { CdkModalidadeCategoriaSigiloGridModule } from '@cdk/components/modalidade-categoria-sigilo/cdk-modalidade-categoria-sigilo-grid/cdk-modalidade-categoria-sigilo-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeCategoriaSigiloGridsearchComponent
    ],
    imports: [

        CdkModalidadeCategoriaSigiloGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        ModalidadeCategoriaSigiloService
    ],
    exports: [
        CdkModalidadeCategoriaSigiloGridsearchComponent
    ]
})
export class CdkModalidadeCategoriaSigiloGridsearchModule {
}
