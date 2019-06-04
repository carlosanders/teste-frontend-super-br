import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ModalidadeTemplateService } from '@cdk/services/modalidade-template.service';
import { CdkModalidadeTemplateGridsearchComponent } from './cdk-modalidade-template-gridsearch.component';
import { CdkModalidadeTemplateGridModule } from '@cdk/components/modalidade-template/cdk-modalidade-template-grid/cdk-modalidade-template-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeTemplateGridsearchComponent
    ],
    imports: [

        CdkModalidadeTemplateGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        ModalidadeTemplateService
    ],
    exports: [
        CdkModalidadeTemplateGridsearchComponent
    ]
})
export class CdkModalidadeTemplateGridsearchModule {
}
