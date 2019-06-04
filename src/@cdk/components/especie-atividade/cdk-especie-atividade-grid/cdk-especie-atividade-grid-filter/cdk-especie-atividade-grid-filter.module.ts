import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieAtividadeService } from '@cdk/services/especie-atividade.service';
import { CdkEspecieAtividadeGridFilterComponent } from './cdk-especie-atividade-grid-filter.component';

@NgModule({
    declarations: [
        CdkEspecieAtividadeGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieAtividadeService,
    ],
    exports: [
        CdkEspecieAtividadeGridFilterComponent
    ]
})
export class CdkEspecieAtividadeGridFilterModule {
}
