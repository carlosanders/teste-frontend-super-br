import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeInteressadoService } from '@cdk/services/modalidade-interessado.service';
import { CdkInteressadoGridFilterComponent } from './cdk-interessado-grid-filter.component';

@NgModule({
    declarations: [
        CdkInteressadoGridFilterComponent,
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
        CdkInteressadoGridFilterComponent
    ]
})
export class CdkInteressadoGridFilterModule {
}
