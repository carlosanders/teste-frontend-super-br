import {MatStepperIntl} from "@angular/material/stepper";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class CdkMatStepperIntl extends MatStepperIntl {
    optionalLabel: string = 'Opcional';
}
