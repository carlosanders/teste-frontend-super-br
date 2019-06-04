import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeFaseService } from '@cdk/services/modalidade-fase.service';
import { CdkModalidadeFaseGridFilterComponent } from './cdk-modalidade-fase-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeFaseGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeFaseService,
    ],
    exports: [
        CdkModalidadeFaseGridFilterComponent
    ]
})
export class CdkModalidadeFaseGridFilterModule {
}
