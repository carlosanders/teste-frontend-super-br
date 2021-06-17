import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplatesEditComponent} from './templates-edit.component';
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
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {TemplateService} from '@cdk/services/template.service';
import {CdkTemplateFormModule} from '@cdk/components/template/cdk-template-form/cdk-template-form.module';
import {TemplatesEditStoreModule} from './store/store.module';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':templateHandle',
        component: TemplatesEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [TemplatesEditComponent],
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
        CdkTemplateFormModule,
        TemplatesEditStoreModule,
        PathModule
    ],
    providers: [
        TemplateService,
        fromGuards.ResolveGuard
    ]
})
export class TemplatesEditModule {
}
