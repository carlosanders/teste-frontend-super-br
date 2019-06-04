import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ModalidadeFolderService } from '@cdk/services/modalidade-folder.service';
import { CdkModalidadeFolderGridsearchComponent } from './cdk-modalidade-folder-gridsearch.component';
import { CdkModalidadeFolderGridModule } from '@cdk/components/modalidade-folder/cdk-modalidade-folder-grid/cdk-modalidade-folder-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeFolderGridsearchComponent
    ],
    imports: [

        CdkModalidadeFolderGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        ModalidadeFolderService
    ],
    exports: [
        CdkModalidadeFolderGridsearchComponent
    ]
})
export class CdkModalidadeFolderGridsearchModule {
}
