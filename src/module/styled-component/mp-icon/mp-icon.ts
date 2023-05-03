import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  PLATFORM_ID,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { ColorUtil } from "../util/util";
import { AbstractBaseComponent } from "../../../component/abstract/base.component";
import { setStyles$ } from "../util/set-styles";
import { observeProperty$ } from "../util/observe-property";

export interface MpIconProps {
  name: string,
  type?: 'la' | 'outlined' | 'filled',
  size?: PixelNumber,
  color?: MpColor,
  padding?: PixelNumbers;
  backgroundColor?: MpColor;
  borderRadius?: PixelNumbers;
}

@Component({
  selector: 'mp-icon',
  template: ``,
  styleUrls: [ './mp-icon.scss' ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  exportAs: 'mp-icon'
})
export class MpIcon extends AbstractBaseComponent implements AfterViewInit {
  @Input() type: 'la' | 'outlined' | 'filled' = 'filled';
  @Input() name: string;
  @Input() size: PixelNumber;
  @Input() color: MpColor;
  @Input() backgroundColor: MpColor;
  @Input() borderRadius: PixelNumbers;
  @Input() padding: PixelNumbers;
  @Input() margin: PixelNumbers;

  get hostEl() {
    return this.elRef.nativeElement;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private renderer: Renderer2,
    public elRef: ElementRef,
    public zone: NgZone,
  ) {
    super();
  }

  ngAfterViewInit() {
    // UI 업데이트를 전부 다 한번에 패치
    this.subscribeOn(
      setStyles$(this, this.renderer, this.hostEl, {
        'padding': ({ padding }) => padding,
        'margin': ({ margin }) => margin,
        'border-radius': ({ borderRadius }) => borderRadius,
        'background-color': ({ backgroundColor }) => ColorUtil.parse(backgroundColor),
        '--icon-name': ({ name }) => name ? `'${name}'` : undefined,
        '--icon-font-size': ({ size }) => size,
        '--icon-color': ({ color }) => ColorUtil.parse(color),
      })
    );

    this.renderer.setAttribute(this.hostEl, 'aria-hidden', 'true');

    this._updateClasses();
  }

  private _updateClasses() {
    let reqId: number;
    let lastClasses = [];
    let newClasses = [];
    const syncClasses = () => {
      if (!reqId) {
        // 멱등성을 보장하는 class updator
        reqId = requestAnimationFrame(() => {
          // lastClasses -> newClasses 로 변화 있는 것만 한번에 패치, SSR을 고려해서 패치
          const removed = lastClasses.filter(_b => !newClasses.includes(_b));
          const added = newClasses.filter(_a => !lastClasses.includes(_a));
          if (removed.length > 0) {
            this._removeClasses(removed);
          }
          if (added.length > 0) {
            this._addClasses(added);
          }
          // 전역 값 업데이트 진행
          lastClasses = newClasses;
          reqId = undefined;
        });
      }
    }

    this.subscribeOn(
      observeProperty$(this, 'type').pipe(
        filter((type) => !!type),
        distinctUntilChanged(),
        map(() => this._getIconClassNames()),
        tap((_classes) => {
          newClasses = _classes;
          syncClasses();
        }),
      )
    );
  }

  private _removeClasses(names: string[]) {
    if (isPlatformServer(this.platformId)) {
      names.forEach(r => this.renderer.removeClass(this.hostEl, r));
    } else {
      this.hostEl.classList.remove(...names);
    }
  }

  private _addClasses(names: string[]) {
    if (isPlatformServer(this.platformId)) {
      names.forEach(n => this.renderer.addClass(this.hostEl, n));
    } else {
      this.hostEl.classList.add(...names);
    }
  }

  private _getIconClassNames(): string[] {
    if (this.type === 'la') {
      return this._lineAwesomeClassNames();
    } else {
      return this._materialIconClassNames();
    }
  }

  private _materialIconClassNames(): string[] {
    const name = this.type === 'filled' ? 'material-icons' : `material-icons-${this.type}`;
    return [ name ];
  }

  private _lineAwesomeClassNames(): string[] {
    return this.name.split(' ');
  }
}
