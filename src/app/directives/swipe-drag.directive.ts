import { Directive, HostListener, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appSwipeDrag]'
})
export class SwipeDragDirective {

  @Output() appSwipeDrag = new EventEmitter();

  private margin = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('panmove', ['$event'])
  protected onPanMove(event) {
    // Only drag left and until the screen max width
    if (event.deltaX <= window.screen.width && event.deltaX > 0) {
      this.margin = event.deltaX;
      this.renderer.setStyle(this.el.nativeElement, 'margin-left', this.margin + 'px');
    }
  }

  @HostListener('panend', ['$event'])
  protected onPanEnd(event) {
    if (this.margin <= window.screen.width / 2) {
      // If the user dragged less than half the screen return to initial position

      // The amount to decrement the margin considering it will decrement 10 times to create animation like effect.
      const decrement = this.margin / 10;

      // Counter to clear the interval after it has completely the 10 times.
      let counter = 0;
      const intervalRef = setInterval(() => {
        this.margin -= decrement;
        this.renderer.setStyle(this.el.nativeElement, 'margin-left', this.margin + 'px');

        counter++;
        if (counter === 10) {
          clearInterval(intervalRef);
        }
      }, 10);
    } else {
      // If the user dragged more than half the screen, then call finish dragging and call the passed method.
      const intervalRef = setInterval(() => {
        this.margin += 10;
        this.renderer.setStyle(this.el.nativeElement, 'margin-left', this.margin + 'px');

        if (this.margin >= window.screen.width) {
          clearInterval(intervalRef);
          this.appSwipeDrag.emit(null);
        }

      }, 10);
    }

  }
}
