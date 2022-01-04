import {Directive, HostListener, ElementRef, Input} from '@angular/core';

@Directive({ selector: '[cdkHoverClass]'})
export class CdkHoverClassDirective {
    @Input('cdkHoverClass') hoverClass: any;

    constructor(public elementRef: ElementRef) { }

    @HostListener('mouseenter') onMouseEnter(): void {
        this.elementRef.nativeElement.classList.add(this.hoverClass);
    }

    @HostListener('mouseleave') onMouseLeave(): void {
        this.elementRef.nativeElement.classList.remove(this.hoverClass);
    }
}
