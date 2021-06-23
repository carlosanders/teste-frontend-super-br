import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {DocumentoEditVersoesComponent} from './documento-edit-versoes.component';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {DocumentoService} from '@cdk/services/documento.service';
import {CdkVersaoGridsearchModule} from '@cdk/components/versao/cdk-versao-gridsearch/cdk-versao-gridsearch.module';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditVersoesComponent,
    }
];

const path = 'app/main/apps/documento/documento-edit/versoes';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoEditVersoesComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        TranslateModule,
        CdkSharedModule,
        CdkVersaoGridsearchModule,
    ],
    providers: [
        DocumentoService,
    ]
})
export class DocumentoEditVersoesModule {
}
