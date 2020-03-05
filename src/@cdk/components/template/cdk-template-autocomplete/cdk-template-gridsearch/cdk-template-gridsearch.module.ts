import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {TemplateService} from '@cdk/services/template.service';
import {CdkTemplateGridsearchComponent} from './cdk-template-gridsearch.component';
import {CdkTemplateGridModule} from '@cdk/components/template/cdk-template-grid/cdk-template-grid.module';

@NgModule({
    declarations: [
        CdkTemplateGridsearchComponent
    ],
    imports: [

        CdkTemplateGridModule,

        CdkSharedModule,
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
