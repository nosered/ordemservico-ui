import { Directive, ElementRef, OnInit, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[textUnmask]'
})
export class UnmaskDirective implements OnInit, OnDestroy {

  @Input() textUnmask: string;
  private sub;
  constructor(
    private elementRef: ElementRef,
    private model: NgControl
  ) { }

  ngOnInit(): void {
    this.sub = this.model.control.valueChanges.subscribe(() => {
      const newValue = this.elementRef.nativeElement.value.replace(new RegExp(this.textUnmask), '');

      console.log(newValue);
      this.model.control.setValue(newValue, {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
