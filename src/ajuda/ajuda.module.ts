import {NgModule} from '@angular/core';
import {AjudaComponent} from './ajuda.component';
import {MatExpansionModule} from '@angular/material/expansion';





import {CdkSharedModule} from '../@cdk/shared.module';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
} from '@cdk/angular/material';


@NgModule({
    declarations: [
        AjudaComponent
    ],
    imports: [
        CdkSharedModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatExpansionModule,
    ],
    exports: [
        AjudaComponent
    ],
    providers: []
})
export class AjudaModule {
}
