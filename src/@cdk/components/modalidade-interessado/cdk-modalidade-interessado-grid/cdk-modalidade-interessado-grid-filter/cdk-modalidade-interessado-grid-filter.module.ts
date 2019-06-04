import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeInteressadoService } from '@cdk/services/modalidade-interessado.service';
import { CdkModalidadeInteressadoGridFilterComponent } from './cdk-modalidade-interessado-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeInteressadoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeInteressadoService,
    ],
    exports: [
        CdkModalidadeInteressadoGridFilterComponent
    ]
})
export class CdkModalidadeInteressadoGridFilterModule {
}
