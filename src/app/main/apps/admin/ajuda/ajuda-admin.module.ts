import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { AjudaAdminComponent } from './ajuda-admin.component';
import { CdkSharedModule } from '../../../../../@cdk/shared.module';


@NgModule({
    declarations: [
        AjudaAdminComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,


    ],
    providers: [
    ],

    exports: [
        AjudaAdminComponent
   ]
})
export class AjudaAdminModule {
}