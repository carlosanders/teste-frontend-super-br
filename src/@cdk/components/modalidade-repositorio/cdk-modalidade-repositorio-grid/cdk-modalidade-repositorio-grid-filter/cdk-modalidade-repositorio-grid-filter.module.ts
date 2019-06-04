import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeRepositorioService } from '@cdk/services/modalidade-repositorio.service';
import { CdkModalidadeRepositorioGridFilterComponent } from './cdk-modalidade-repositorio-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeRepositorioGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeRepositorioService,
    ],
    exports: [
        CdkModalidadeRepositorioGridFilterComponent
    ]
})
export class CdkModalidadeRepositorioGridFilterModule {
}
