import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeTemplateService } from '@cdk/services/modalidade-template.service';
import { CdkModalidadeTemplateGridFilterComponent } from './cdk-modalidade-template-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeTemplateGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeTemplateService,
    ],
    exports: [
        CdkModalidadeTemplateGridFilterComponent
    ]
})
export class CdkModalidadeTemplateGridFilterModule {
}
