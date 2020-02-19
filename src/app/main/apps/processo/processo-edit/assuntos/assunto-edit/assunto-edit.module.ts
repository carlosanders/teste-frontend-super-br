import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {AssuntoEditComponent} from './assunto-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkAssuntoFormModule} from '@cdk/components/assunto/cdk-assunto-form/cdk-assunto-form.module';
import {AssuntoEditStoreModule} from './store/store.module';
import {AssuntoService} from '@cdk/services/assunto.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':assuntoHandle',
        component: AssuntoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        AssuntoEditComponent
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

        CdkAssuntoFormModule,

        AssuntoEditStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        AssuntoService,
        fromGuards.ResolveGuard
    ]
})
export class AssuntoEditModule {
}
