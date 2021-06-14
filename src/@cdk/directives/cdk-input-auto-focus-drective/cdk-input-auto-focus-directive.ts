import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: 'input[cdkInputAutoFocus]'
})
export class CdkInputAutoFocusDirective implements AfterViewInit {

    @Input('cdkInputAutoFocus')
    public  focused: boolean = false;

    constructor(private el: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        if (this.focused) {
            setTimeout(() => this.el.nativeElement.focus(), 0);
        }
    }
}
