import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {DocumentoCopiaCreateBlocoComponent} from './documento-copia-create-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkDocumentoCopiaFormModule} from '@cdk/components/documento/cdk-documento-copia-form/cdk-documento-copia-form.module';
import {DocumentoCopiaCreateBlocoStoreModule} from './store/store.module';
import {DocumentoService} from '@cdk/services/documento.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: DocumentoCopiaCreateBlocoComponent
    }
];

const path = 'app/main/apps/processo/processo-edit/juntadas/documento-copia-create-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoCopiaCreateBlocoComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatListModule,

        CdkDocumentoCopiaFormModule,

        DocumentoCopiaCreateBlocoStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        DocumentoService
    ]
})
export class DocumentoCopiaCreateBlocoModule {
}
