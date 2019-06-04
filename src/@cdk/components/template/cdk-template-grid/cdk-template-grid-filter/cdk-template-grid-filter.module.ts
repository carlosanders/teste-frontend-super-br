import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TemplateService} from '@cdk/services/template.service';
import {CdkTemplateGridFilterComponent} from './cdk-template-grid-filter.component';

@NgModule({
    declarations: [
        CdkTemplateGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        TemplateService,
    ],
    exports: [
        CdkTemplateGridFilterComponent
    ]
})
export class CdkTemplateGridFilterModule {
}
