import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { StationWarnings } from '../model/station-warnings';
import { StationTooltipComponent } from './station-tooltip.component';

const OFFSET_Y = 20;
const VIEWPORT_MARGIN = 10;
const DEBOUNCE_TIME = 500;

@Directive({ selector: '[station-tooltip]' })
export class StationTooltipDirective implements OnInit, OnDestroy {
  @Input() tooltipData: StationWarnings;
  overlayRef: OverlayRef;
  private componentRef: ComponentRef<any> | null = null;

  private mouseEnterSubject$ = new Subject<MouseEvent>();
  private mouseLeaveSubject$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  @HostListener('mapMouseover', ['$event.domEvent']) onMouseEnter(
    event: MouseEvent
  ): void {
    this.mouseEnterSubject$.next(event);
  }

  @HostListener('mapMouseout') onMouseLeave(): void {
    this.mouseLeaveSubject$.next();
  }

  ngOnInit(): void {
    this.listenMouseEnter();
    this.listenMouseLeave();
  }

  ngOnDestroy(): void {
    this.closeTooltip();
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeTooltip(): void {
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
    this.listenMouseEnter();
  }

  listenMouseEnter(): void {
    this.mouseEnterSubject$
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        takeUntil(this.mouseLeaveSubject$),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => this.openTooltip(event));
  }

  listenMouseLeave(): void {
    this.mouseLeaveSubject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => this.closeTooltip());
  }

  openTooltip(event: MouseEvent): void {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        StationTooltipComponent
      );
    this.componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.componentRef.instance.data = this.tooltipData;
    this.componentRef.instance.left = event.clientX;
    this.componentRef.instance.top = event.clientY + OFFSET_Y;
  }
}
