import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {TemplateService} from '@cdk/services/template.service';
import {CdkTemplateGridsearchComponent} from './cdk-template-gridsearch.component';
import {CdkTemplateGridModule} from '@cdk/components/template/cdk-template-grid/cdk-template-grid.module';

@NgModule({
    declarations: [
        CdkTemplateGridsearchComponent
    ],
    imports: [

        CdkTemplateGridModule,

        FuseSharedModule,
    ],
    providers: [
        TemplateService
    ],
    exports: [
        CdkTemplateGridsearchComponent
    ]
})
export class CdkTemplateGridsearchModule {
}
