import {NgModule} from '@angular/core';
import {AjudaComponent} from './ajuda.component';
import {MatExpansionModule} from '@cdk/angular/material';





import {CdkSharedModule} from '@cdk/shared.module';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {TourModule} from './tour/tour.module';
import {CdkConfigService} from "../@cdk/services/config.service";


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
        MatDividerModule,
        MatCardModule,
        TourModule,
    ],
    exports: [
        AjudaComponent
    ],
    providers: [
        CdkConfigService
    ]
})
export class AjudaModule {
}
