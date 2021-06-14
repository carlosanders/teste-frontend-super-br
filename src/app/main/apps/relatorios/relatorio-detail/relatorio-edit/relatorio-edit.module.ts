import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
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

import {PipesModule} from '@cdk/pipes/pipes.module';

import {RelatorioEditComponent} from './relatorio-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {RelatoriosStoreModule} from '../../store/store.module';
import {CdkRelatorioFormModule} from '@cdk/components/relatorio/cdk-relatorio-form/cdk-relatorio-form.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path       : '',
        component  : RelatorioEditComponent
    }
];

const path = 'app/main/apps/relatorios/relatorio-detail/relatorio-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations   : [
        RelatorioEditComponent
    ],
    imports        : [

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

        CdkRelatorioFormModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,

        PipesModule,

        RelatoriosStoreModule,
    ],
    providers      : [
    ]
})
export class RelatorioEditModule
{
}
