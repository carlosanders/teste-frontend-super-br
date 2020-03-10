import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[cdkWidgetToggle]'
})
export class CdkWidgetToggleDirective
{
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
