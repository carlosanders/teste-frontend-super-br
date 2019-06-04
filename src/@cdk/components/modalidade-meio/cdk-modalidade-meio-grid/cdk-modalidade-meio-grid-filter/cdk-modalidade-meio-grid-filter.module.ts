import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeMeioService } from '@cdk/services/modalidade-meio.service';
import { CdkModalidadeMeioGridFilterComponent } from './cdk-modalidade-meio-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeMeioGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeMeioService,
    ],
    exports: [
        CdkModalidadeMeioGridFilterComponent
    ]
})
export class CdkModalidadeMeioGridFilterModule {
}
