import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeFolderService } from '@cdk/services/modalidade-folder.service';
import { CdkModalidadeFolderGridFilterComponent } from './cdk-modalidade-folder-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeFolderGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeFolderService,
    ],
    exports: [
        CdkModalidadeFolderGridFilterComponent
    ]
})
export class CdkModalidadeFolderGridFilterModule {
}
