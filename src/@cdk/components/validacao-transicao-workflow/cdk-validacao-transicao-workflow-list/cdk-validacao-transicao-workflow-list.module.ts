import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSortModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkValidacaoTransicaoWorkflowListComponent} from './cdk-validacao-transicao-workflow-list.component';
import {CdkValidacaoTransicaoWorkflowListItemComponent} from './cdk-validacao-transicao-workflow-list-item/cdk-validacao-transicao-workflow-list-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {LoginService} from 'app/main/auth/login/login.service';

@NgModule({
    declarations: [
        CdkValidacaoTransicaoWorkflowListComponent,
        CdkValidacaoTransicaoWorkflowListItemComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatRippleModule,

        TranslateModule,
        CdkSharedModule,
    ],
    providers: [
        LoginService
    ],
    exports: [
        CdkValidacaoTransicaoWorkflowListComponent
    ]
})
export class CdkValidacaoTransicaoWorkflowListModule {
}
