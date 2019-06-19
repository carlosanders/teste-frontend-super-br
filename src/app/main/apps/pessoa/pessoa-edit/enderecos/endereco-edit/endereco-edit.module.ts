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

import {EnderecoEditComponent} from './endereco-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkEnderecoFormModule} from '@cdk/components/endereco/cdk-endereco-form/cdk-endereco-form.module';
import {EnderecoEditStoreModule} from './store/store.module';
import {EnderecoService} from '@cdk/services/endereco.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':enderecoHandle',
        component: EnderecoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        EnderecoEditComponent
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

        CdkEnderecoFormModule,

        EnderecoEditStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        EnderecoService,
        fromGuards.ResolveGuard
    ]
})
export class EnderecoEditModule {
}
