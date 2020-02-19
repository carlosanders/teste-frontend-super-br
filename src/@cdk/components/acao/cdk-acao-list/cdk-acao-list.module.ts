import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule, MatMenuModule, MatAutocompleteModule, MatRippleModule,
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {CdkAcaoListComponent} from './cdk-acao-list.component';
import {CdkAcaoListItemComponent} from './cdk-acao-list-item/cdk-acao-list-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';

@NgModule({
    declarations: [
        CdkAcaoListComponent,
        CdkAcaoListItemComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatRippleModule,

        TranslateModule,
        FuseSharedModule,
    ],
    providers: [
        ProcessoService,
        LoginService
    ],
    exports: [
        CdkAcaoListComponent
    ]
})
export class CdkAcaoListModule {
}
