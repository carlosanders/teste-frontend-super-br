import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipoDocumentoEditComponent} from './tipo-documento-edit.component';
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
import {ResolveGuard} from './store/guards';
import {TipoDocumentoEditStoreModule} from './store/store.module';
import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {CdkTipoDocumentoFormModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-form/cdk-tipo-documento-form.module';
import {PathModule} from '@cdk/components/path/path.module';


const routes: Routes = [
    {
        path: ':tipoDocumentoHandle',
        component: TipoDocumentoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [TipoDocumentoEditComponent],
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
        TipoDocumentoEditStoreModule,
        CdkTipoDocumentoFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        TipoDocumentoService,
    ]
})
export class TipoDocumentoEditModule {
}
