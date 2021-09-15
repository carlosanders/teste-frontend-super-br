import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspeciesProcessoEditComponent} from './especies-processo-edit.component';
import {RouterModule, Routes} from '@angular/router';
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
import {MatStepperModule} from '@angular/material/stepper';
import {WorkflowEspecieProcessoEditStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';
import {CdkEspecieProcessoAutocompleteModule} from '@cdk/components/especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';
import {CdkEspecieProcessoGridsearchModule} from '@cdk/components/especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-gridsearch/cdk-especie-processo-gridsearch.module';

const routes: Routes = [
    {
        path: 'criar',
        component: EspeciesProcessoEditComponent,
    }
];

const path = 'app/main/apps/admin/workflow/especies-processo/especies-processo-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [EspeciesProcessoEditComponent],
    imports: [
        CommonModule,
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
        TranslateModule,
        CdkSharedModule,
        CdkSidebarModule,
        MatStepperModule,
        WorkflowEspecieProcessoEditStoreModule,
        CdkEspecieProcessoAutocompleteModule,
        CdkEspecieProcessoGridsearchModule
    ],
    providers: []
})

export class EspeciesProcessoEditModule {
}
