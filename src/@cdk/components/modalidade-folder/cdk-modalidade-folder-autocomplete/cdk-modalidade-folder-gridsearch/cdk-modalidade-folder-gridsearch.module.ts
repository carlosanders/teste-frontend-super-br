import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeFolderService} from '@cdk/services/modalidade-folder.service';
import {CdkModalidadeFolderGridsearchComponent} from './cdk-modalidade-folder-gridsearch.component';
import {CdkModalidadeFolderGridModule} from '@cdk/components/modalidade-folder/cdk-modalidade-folder-grid/cdk-modalidade-folder-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeFolderGridsearchComponent
    ],
    imports: [

        CdkModalidadeFolderGridModule,

        CdkSharedModule,
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
