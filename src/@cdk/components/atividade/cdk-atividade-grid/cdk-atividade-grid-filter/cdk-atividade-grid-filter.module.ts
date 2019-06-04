import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieAtividadeService } from '@cdk/services/especie-atividade.service';
import { CdkAtividadeGridFilterComponent } from './cdk-atividade-grid-filter.component';

@NgModule({
    declarations: [
        CdkAtividadeGridFilterComponent,
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
        CdkAtividadeGridFilterComponent
    ]
})
export class CdkAtividadeGridFilterModule {
}
