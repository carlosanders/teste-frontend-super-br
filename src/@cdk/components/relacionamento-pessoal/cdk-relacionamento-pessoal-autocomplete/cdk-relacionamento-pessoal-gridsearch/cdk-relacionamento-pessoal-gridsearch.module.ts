import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {CdkRelacionamentoPessoalGridsearchComponent} from './cdk-relacionamento-pessoal-gridsearch.component';
import {CdkRelacionamentoPessoalGridModule} from '@cdk/components/relacionamento-pessoal/cdk-relacionamento-pessoal-grid/cdk-relacionamento-pessoal-grid.module';

@NgModule({
    declarations: [
        CdkRelacionamentoPessoalGridsearchComponent
    ],
    imports: [

        CdkRelacionamentoPessoalGridModule,

        CdkSharedModule,
    ],
    providers: [
        RelacionamentoPessoalService
    ],
    exports: [
        CdkRelacionamentoPessoalGridsearchComponent
    ]
})
export class CdkRelacionamentoPessoalGridsearchModule {
}
