import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassificacaoEditComponent} from './classificacao-edit.component';
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
import * as fromGuards from './store/guards';
import {ClassificacaoEditStoreModule} from './store/store.module';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {CdkClassificacaoFormModule} from '@cdk/components/classificacao/cdk-classificacao-form/cdk-classificacao-form.module';
import {PathModule} from '@cdk/components/path/path.module';


const routes: Routes = [
    {
        path: ':classificacaoHandle',
        component: ClassificacaoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [ClassificacaoEditComponent],
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
        ClassificacaoEditStoreModule,
        CdkClassificacaoFormModule,
        PathModule

    ],
    providers: [
        fromGuards.ResolveGuard,
        ClassificacaoService,
    ]
})
export class ClassificacaoEditModule {
}
