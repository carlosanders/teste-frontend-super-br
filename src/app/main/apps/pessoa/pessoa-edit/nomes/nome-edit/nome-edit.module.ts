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
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {NomeEditComponent} from './nome-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkNomeFormModule} from '@cdk/components/nome/cdk-nome-form/cdk-nome-form.module';
import {NomeEditStoreModule} from './store/store.module';
import {NomeService} from '@cdk/services/nome.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':nomeHandle',
        component: NomeEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        NomeEditComponent
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

        CdkNomeFormModule,

        NomeEditStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        NomeService,
        fromGuards.ResolveGuard
    ]
})
export class NomeEditModule {
}
