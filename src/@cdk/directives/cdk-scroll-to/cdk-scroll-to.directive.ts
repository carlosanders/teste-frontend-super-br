import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({ selector: '[cdkScrollTo]'})
export class CdkScrollToDirective implements AfterViewInit {
    constructor(private elRef: ElementRef) {}
    ngAfterViewInit() {
        this.elRef.nativeElement.scrollIntoView();
    }
}
