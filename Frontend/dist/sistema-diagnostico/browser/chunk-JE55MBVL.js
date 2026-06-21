import {
  animate,
  sequence,
  style,
  transition,
  trigger
} from "./chunk-2RGQA3S3.js";
import {
  A11yModule,
  AriaDescriber,
  BidiModule,
  CdkMonitorFocus,
  CdkObserveContent,
  Directionality,
  ENTER,
  ESCAPE,
  FocusKeyManager,
  FocusMonitor,
  MatCommonModule,
  MatIcon,
  MatIconModule,
  MediaMatcher,
  Platform,
  SPACE,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  _getEventTarget,
  coerceArray,
  coerceElement,
  coerceNumberProperty,
  hasModifierKey,
  isFakeMousedownFromScreenReader,
  isFakeTouchstartFromScreenReader,
  normalizePassiveListenerOptions
} from "./chunk-ID7PT6HI.js";
import {
  AuthService,
  DatePipe,
  HttpClient,
  Location,
  NgClass
} from "./chunk-KOIP6O46.js";
import {
  ANIMATION_MODULE_TYPE,
  ApplicationRef,
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ConnectableObservable,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  DestroyRef,
  Directive,
  EMPTY,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  HostAttributeToken,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  IterableDiffers,
  NgModule,
  NgModuleRef$1,
  NgZone,
  Observable,
  Optional,
  Output,
  QueryList,
  Renderer2,
  RendererFactory2,
  RuntimeError,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation,
  __spreadProps,
  __spreadValues,
  afterNextRender,
  animationFrameScheduler,
  asapScheduler,
  auditTime,
  booleanAttribute,
  computed,
  createComponent,
  debounceTime,
  distinctUntilChanged,
  effect,
  filter,
  forwardRef,
  inject,
  isObservable,
  map,
  merge,
  numberAttribute,
  of,
  pairwise,
  setClassMetadata,
  shareReplay,
  signal,
  skip,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
  timer,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵariaProperty,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcomponentInstance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-VVLWDSGZ.js";

// node_modules/@angular/cdk/fesm2022/observers/private.mjs
var loopLimitExceededErrorHandler = (e) => {
  if (e instanceof ErrorEvent && e.message === "ResizeObserver loop limit exceeded") {
    console.error(`${e.message}. This could indicate a performance issue with your app. See https://github.com/WICG/resize-observer/blob/master/explainer.md#error-handling`);
  }
};
var SingleBoxSharedResizeObserver = class {
  _box;
  /** Stream that emits when the shared observer is destroyed. */
  _destroyed = new Subject();
  /** Stream of all events from the ResizeObserver. */
  _resizeSubject = new Subject();
  /** ResizeObserver used to observe element resize events. */
  _resizeObserver;
  /** A map of elements to streams of their resize events. */
  _elementObservables = /* @__PURE__ */ new Map();
  constructor(_box) {
    this._box = _box;
    if (typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver((entries) => this._resizeSubject.next(entries));
    }
  }
  /**
   * Gets a stream of resize events for the given element.
   * @param target The element to observe.
   * @return The stream of resize events for the element.
   */
  observe(target) {
    if (!this._elementObservables.has(target)) {
      this._elementObservables.set(target, new Observable((observer) => {
        const subscription = this._resizeSubject.subscribe(observer);
        this._resizeObserver?.observe(target, {
          box: this._box
        });
        return () => {
          this._resizeObserver?.unobserve(target);
          subscription.unsubscribe();
          this._elementObservables.delete(target);
        };
      }).pipe(
        filter((entries) => entries.some((entry) => entry.target === target)),
        // Share a replay of the last event so that subsequent calls to observe the same element
        // receive initial sizing info like the first one. Also enable ref counting so the
        // element will be automatically unobserved when there are no more subscriptions.
        shareReplay({
          bufferSize: 1,
          refCount: true
        }),
        takeUntil(this._destroyed)
      ));
    }
    return this._elementObservables.get(target);
  }
  /** Destroys this instance. */
  destroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this._resizeSubject.complete();
    this._elementObservables.clear();
  }
};
var SharedResizeObserver = class _SharedResizeObserver {
  _cleanupErrorListener;
  /** Map of box type to shared resize observer. */
  _observers = /* @__PURE__ */ new Map();
  /** The Angular zone. */
  _ngZone = inject(NgZone);
  constructor() {
    if (typeof ResizeObserver !== "undefined" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      this._ngZone.runOutsideAngular(() => {
        const renderer = inject(RendererFactory2).createRenderer(null, null);
        this._cleanupErrorListener = renderer.listen("window", "error", loopLimitExceededErrorHandler);
      });
    }
  }
  ngOnDestroy() {
    for (const [, observer] of this._observers) {
      observer.destroy();
    }
    this._observers.clear();
    this._cleanupErrorListener?.();
  }
  /**
   * Gets a stream of resize events for the given target element and box type.
   * @param target The element to observe for resizes.
   * @param options Options to pass to the `ResizeObserver`
   * @return The stream of resize events for the element.
   */
  observe(target, options) {
    const box = options?.box || "content-box";
    if (!this._observers.has(box)) {
      this._observers.set(box, new SingleBoxSharedResizeObserver(box));
    }
    return this._observers.get(box).observe(target);
  }
  static \u0275fac = function SharedResizeObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharedResizeObserver)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _SharedResizeObserver,
    factory: _SharedResizeObserver.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedResizeObserver, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/@angular/cdk/fesm2022/scrolling2.mjs
var RtlScrollAxisType;
(function(RtlScrollAxisType2) {
  RtlScrollAxisType2[RtlScrollAxisType2["NORMAL"] = 0] = "NORMAL";
  RtlScrollAxisType2[RtlScrollAxisType2["NEGATED"] = 1] = "NEGATED";
  RtlScrollAxisType2[RtlScrollAxisType2["INVERTED"] = 2] = "INVERTED";
})(RtlScrollAxisType || (RtlScrollAxisType = {}));
var rtlScrollAxisType;
var scrollBehaviorSupported;
function supportsScrollBehavior() {
  if (scrollBehaviorSupported == null) {
    if (typeof document !== "object" || !document || typeof Element !== "function" || !Element) {
      scrollBehaviorSupported = false;
      return scrollBehaviorSupported;
    }
    if (document.documentElement?.style && "scrollBehavior" in document.documentElement.style) {
      scrollBehaviorSupported = true;
    } else {
      const scrollToFunction = Element.prototype.scrollTo;
      if (scrollToFunction) {
        scrollBehaviorSupported = !/\{\s*\[native code\]\s*\}/.test(scrollToFunction.toString());
      } else {
        scrollBehaviorSupported = false;
      }
    }
  }
  return scrollBehaviorSupported;
}
function getRtlScrollAxisType() {
  if (typeof document !== "object" || !document) {
    return RtlScrollAxisType.NORMAL;
  }
  if (rtlScrollAxisType == null) {
    const scrollContainer = document.createElement("div");
    const containerStyle = scrollContainer.style;
    scrollContainer.dir = "rtl";
    containerStyle.width = "1px";
    containerStyle.overflow = "auto";
    containerStyle.visibility = "hidden";
    containerStyle.pointerEvents = "none";
    containerStyle.position = "absolute";
    const content = document.createElement("div");
    const contentStyle = content.style;
    contentStyle.width = "2px";
    contentStyle.height = "1px";
    scrollContainer.appendChild(content);
    document.body.appendChild(scrollContainer);
    rtlScrollAxisType = RtlScrollAxisType.NORMAL;
    if (scrollContainer.scrollLeft === 0) {
      scrollContainer.scrollLeft = 1;
      rtlScrollAxisType = scrollContainer.scrollLeft === 0 ? RtlScrollAxisType.NEGATED : RtlScrollAxisType.INVERTED;
    }
    scrollContainer.remove();
  }
  return rtlScrollAxisType;
}

// node_modules/@angular/cdk/fesm2022/test-environment.mjs
function _isTestEnvironment() {
  return (
    // @ts-ignore
    typeof __karma__ !== "undefined" && !!__karma__ || // @ts-ignore
    typeof jasmine !== "undefined" && !!jasmine || // @ts-ignore
    typeof jest !== "undefined" && !!jest || // @ts-ignore
    typeof Mocha !== "undefined" && !!Mocha
  );
}

// node_modules/@angular/cdk/fesm2022/platform.mjs
var PlatformModule = class _PlatformModule {
  static \u0275fac = function PlatformModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlatformModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _PlatformModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/data-source.mjs
var DataSource = class {
};
function isDataSource(value) {
  return value && typeof value.connect === "function" && !(value instanceof ConnectableObservable);
}

// node_modules/@angular/cdk/fesm2022/recycle-view-repeater-strategy.mjs
var ArrayDataSource = class extends DataSource {
  _data;
  constructor(_data) {
    super();
    this._data = _data;
  }
  connect() {
    return isObservable(this._data) ? this._data : of(this._data);
  }
  disconnect() {
  }
};
var _ViewRepeaterOperation;
(function(_ViewRepeaterOperation2) {
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["REPLACED"] = 0] = "REPLACED";
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["INSERTED"] = 1] = "INSERTED";
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["MOVED"] = 2] = "MOVED";
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["REMOVED"] = 3] = "REMOVED";
})(_ViewRepeaterOperation || (_ViewRepeaterOperation = {}));
var _VIEW_REPEATER_STRATEGY = new InjectionToken("_ViewRepeater");
var _RecycleViewRepeaterStrategy = class {
  /**
   * The size of the cache used to store unused views.
   * Setting the cache size to `0` will disable caching. Defaults to 20 views.
   */
  viewCacheSize = 20;
  /**
   * View cache that stores embedded view instances that have been previously stamped out,
   * but don't are not currently rendered. The view repeater will reuse these views rather than
   * creating brand new ones.
   *
   * TODO(michaeljamesparsons) Investigate whether using a linked list would improve performance.
   */
  _viewCache = [];
  /** Apply changes to the DOM. */
  applyChanges(changes, viewContainerRef, itemContextFactory, itemValueResolver, itemViewChanged) {
    changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
      let view;
      let operation;
      if (record.previousIndex == null) {
        const viewArgsFactory = () => itemContextFactory(record, adjustedPreviousIndex, currentIndex);
        view = this._insertView(viewArgsFactory, currentIndex, viewContainerRef, itemValueResolver(record));
        operation = view ? _ViewRepeaterOperation.INSERTED : _ViewRepeaterOperation.REPLACED;
      } else if (currentIndex == null) {
        this._detachAndCacheView(adjustedPreviousIndex, viewContainerRef);
        operation = _ViewRepeaterOperation.REMOVED;
      } else {
        view = this._moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, itemValueResolver(record));
        operation = _ViewRepeaterOperation.MOVED;
      }
      if (itemViewChanged) {
        itemViewChanged({
          context: view?.context,
          operation,
          record
        });
      }
    });
  }
  detach() {
    for (const view of this._viewCache) {
      view.destroy();
    }
    this._viewCache = [];
  }
  /**
   * Inserts a view for a new item, either from the cache or by creating a new
   * one. Returns `undefined` if the item was inserted into a cached view.
   */
  _insertView(viewArgsFactory, currentIndex, viewContainerRef, value) {
    const cachedView = this._insertViewFromCache(currentIndex, viewContainerRef);
    if (cachedView) {
      cachedView.context.$implicit = value;
      return void 0;
    }
    const viewArgs = viewArgsFactory();
    return viewContainerRef.createEmbeddedView(viewArgs.templateRef, viewArgs.context, viewArgs.index);
  }
  /** Detaches the view at the given index and inserts into the view cache. */
  _detachAndCacheView(index, viewContainerRef) {
    const detachedView = viewContainerRef.detach(index);
    this._maybeCacheView(detachedView, viewContainerRef);
  }
  /** Moves view at the previous index to the current index. */
  _moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, value) {
    const view = viewContainerRef.get(adjustedPreviousIndex);
    viewContainerRef.move(view, currentIndex);
    view.context.$implicit = value;
    return view;
  }
  /**
   * Cache the given detached view. If the cache is full, the view will be
   * destroyed.
   */
  _maybeCacheView(view, viewContainerRef) {
    if (this._viewCache.length < this.viewCacheSize) {
      this._viewCache.push(view);
    } else {
      const index = viewContainerRef.indexOf(view);
      if (index === -1) {
        view.destroy();
      } else {
        viewContainerRef.remove(index);
      }
    }
  }
  /** Inserts a recycled view from the cache at the given index. */
  _insertViewFromCache(index, viewContainerRef) {
    const cachedView = this._viewCache.pop();
    if (cachedView) {
      viewContainerRef.insert(cachedView, index);
    }
    return cachedView || null;
  }
};

// node_modules/@angular/cdk/fesm2022/scrolling.mjs
var _c0 = ["contentWrapper"];
var _c1 = ["*"];
var VIRTUAL_SCROLL_STRATEGY = new InjectionToken("VIRTUAL_SCROLL_STRATEGY");
var FixedSizeVirtualScrollStrategy = class {
  _scrolledIndexChange = new Subject();
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  scrolledIndexChange = this._scrolledIndexChange.pipe(distinctUntilChanged());
  /** The attached viewport. */
  _viewport = null;
  /** The size of the items in the virtually scrolling list. */
  _itemSize;
  /** The minimum amount of buffer rendered beyond the viewport (in pixels). */
  _minBufferPx;
  /** The number of buffer items to render beyond the edge of the viewport (in pixels). */
  _maxBufferPx;
  /**
   * @param itemSize The size of the items in the virtually scrolling list.
   * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
   * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
   */
  constructor(itemSize, minBufferPx, maxBufferPx) {
    this._itemSize = itemSize;
    this._minBufferPx = minBufferPx;
    this._maxBufferPx = maxBufferPx;
  }
  /**
   * Attaches this scroll strategy to a viewport.
   * @param viewport The viewport to attach this strategy to.
   */
  attach(viewport) {
    this._viewport = viewport;
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  /** Detaches this scroll strategy from the currently attached viewport. */
  detach() {
    this._scrolledIndexChange.complete();
    this._viewport = null;
  }
  /**
   * Update the item size and buffer size.
   * @param itemSize The size of the items in the virtually scrolling list.
   * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
   * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
   */
  updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx) {
    if (maxBufferPx < minBufferPx && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx");
    }
    this._itemSize = itemSize;
    this._minBufferPx = minBufferPx;
    this._maxBufferPx = maxBufferPx;
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onContentScrolled() {
    this._updateRenderedRange();
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onDataLengthChanged() {
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onContentRendered() {
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onRenderedOffsetChanged() {
  }
  /**
   * Scroll to the offset for the given index.
   * @param index The index of the element to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling.
   */
  scrollToIndex(index, behavior) {
    if (this._viewport) {
      this._viewport.scrollToOffset(index * this._itemSize, behavior);
    }
  }
  /** Update the viewport's total content size. */
  _updateTotalContentSize() {
    if (!this._viewport) {
      return;
    }
    this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize);
  }
  /** Update the viewport's rendered range. */
  _updateRenderedRange() {
    if (!this._viewport) {
      return;
    }
    const renderedRange = this._viewport.getRenderedRange();
    const newRange = {
      start: renderedRange.start,
      end: renderedRange.end
    };
    const viewportSize = this._viewport.getViewportSize();
    const dataLength = this._viewport.getDataLength();
    let scrollOffset = this._viewport.measureScrollOffset();
    let firstVisibleIndex = this._itemSize > 0 ? scrollOffset / this._itemSize : 0;
    if (newRange.end > dataLength) {
      const maxVisibleItems = Math.ceil(viewportSize / this._itemSize);
      const newVisibleIndex = Math.max(0, Math.min(firstVisibleIndex, dataLength - maxVisibleItems));
      if (firstVisibleIndex != newVisibleIndex) {
        firstVisibleIndex = newVisibleIndex;
        scrollOffset = newVisibleIndex * this._itemSize;
        newRange.start = Math.floor(firstVisibleIndex);
      }
      newRange.end = Math.max(0, Math.min(dataLength, newRange.start + maxVisibleItems));
    }
    const startBuffer = scrollOffset - newRange.start * this._itemSize;
    if (startBuffer < this._minBufferPx && newRange.start != 0) {
      const expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSize);
      newRange.start = Math.max(0, newRange.start - expandStart);
      newRange.end = Math.min(dataLength, Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSize));
    } else {
      const endBuffer = newRange.end * this._itemSize - (scrollOffset + viewportSize);
      if (endBuffer < this._minBufferPx && newRange.end != dataLength) {
        const expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSize);
        if (expandEnd > 0) {
          newRange.end = Math.min(dataLength, newRange.end + expandEnd);
          newRange.start = Math.max(0, Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSize));
        }
      }
    }
    this._viewport.setRenderedRange(newRange);
    this._viewport.setRenderedContentOffset(Math.round(this._itemSize * newRange.start));
    this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
  }
};
function _fixedSizeVirtualScrollStrategyFactory(fixedSizeDir) {
  return fixedSizeDir._scrollStrategy;
}
var CdkFixedSizeVirtualScroll = class _CdkFixedSizeVirtualScroll {
  /** The size of the items in the list (in pixels). */
  get itemSize() {
    return this._itemSize;
  }
  set itemSize(value) {
    this._itemSize = coerceNumberProperty(value);
  }
  _itemSize = 20;
  /**
   * The minimum amount of buffer rendered beyond the viewport (in pixels).
   * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
   */
  get minBufferPx() {
    return this._minBufferPx;
  }
  set minBufferPx(value) {
    this._minBufferPx = coerceNumberProperty(value);
  }
  _minBufferPx = 100;
  /**
   * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
   */
  get maxBufferPx() {
    return this._maxBufferPx;
  }
  set maxBufferPx(value) {
    this._maxBufferPx = coerceNumberProperty(value);
  }
  _maxBufferPx = 200;
  /** The scroll strategy used by this directive. */
  _scrollStrategy = new FixedSizeVirtualScrollStrategy(this.itemSize, this.minBufferPx, this.maxBufferPx);
  ngOnChanges() {
    this._scrollStrategy.updateItemAndBufferSize(this.itemSize, this.minBufferPx, this.maxBufferPx);
  }
  static \u0275fac = function CdkFixedSizeVirtualScroll_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkFixedSizeVirtualScroll)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkFixedSizeVirtualScroll,
    selectors: [["cdk-virtual-scroll-viewport", "itemSize", ""]],
    inputs: {
      itemSize: "itemSize",
      minBufferPx: "minBufferPx",
      maxBufferPx: "maxBufferPx"
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: VIRTUAL_SCROLL_STRATEGY,
      useFactory: _fixedSizeVirtualScrollStrategyFactory,
      deps: [forwardRef(() => _CdkFixedSizeVirtualScroll)]
    }]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkFixedSizeVirtualScroll, [{
    type: Directive,
    args: [{
      selector: "cdk-virtual-scroll-viewport[itemSize]",
      providers: [{
        provide: VIRTUAL_SCROLL_STRATEGY,
        useFactory: _fixedSizeVirtualScrollStrategyFactory,
        deps: [forwardRef(() => CdkFixedSizeVirtualScroll)]
      }]
    }]
  }], null, {
    itemSize: [{
      type: Input
    }],
    minBufferPx: [{
      type: Input
    }],
    maxBufferPx: [{
      type: Input
    }]
  });
})();
var DEFAULT_SCROLL_TIME = 20;
var ScrollDispatcher = class _ScrollDispatcher {
  _ngZone = inject(NgZone);
  _platform = inject(Platform);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _cleanupGlobalListener;
  constructor() {
  }
  /** Subject for notifying that a registered scrollable reference element has been scrolled. */
  _scrolled = new Subject();
  /** Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards. */
  _scrolledCount = 0;
  /**
   * Map of all the scrollable references that are registered with the service and their
   * scroll event subscriptions.
   */
  scrollContainers = /* @__PURE__ */ new Map();
  /**
   * Registers a scrollable instance with the service and listens for its scrolled events. When the
   * scrollable is scrolled, the service emits the event to its scrolled observable.
   * @param scrollable Scrollable instance to be registered.
   */
  register(scrollable) {
    if (!this.scrollContainers.has(scrollable)) {
      this.scrollContainers.set(scrollable, scrollable.elementScrolled().subscribe(() => this._scrolled.next(scrollable)));
    }
  }
  /**
   * De-registers a Scrollable reference and unsubscribes from its scroll event observable.
   * @param scrollable Scrollable instance to be deregistered.
   */
  deregister(scrollable) {
    const scrollableReference = this.scrollContainers.get(scrollable);
    if (scrollableReference) {
      scrollableReference.unsubscribe();
      this.scrollContainers.delete(scrollable);
    }
  }
  /**
   * Returns an observable that emits an event whenever any of the registered Scrollable
   * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
   * to override the default "throttle" time.
   *
   * **Note:** in order to avoid hitting change detection for every scroll event,
   * all of the events emitted from this stream will be run outside the Angular zone.
   * If you need to update any data bindings as a result of a scroll event, you have
   * to run the callback using `NgZone.run`.
   */
  scrolled(auditTimeInMs = DEFAULT_SCROLL_TIME) {
    if (!this._platform.isBrowser) {
      return of();
    }
    return new Observable((observer) => {
      if (!this._cleanupGlobalListener) {
        this._cleanupGlobalListener = this._ngZone.runOutsideAngular(() => this._renderer.listen("document", "scroll", () => this._scrolled.next()));
      }
      const subscription = auditTimeInMs > 0 ? this._scrolled.pipe(auditTime(auditTimeInMs)).subscribe(observer) : this._scrolled.subscribe(observer);
      this._scrolledCount++;
      return () => {
        subscription.unsubscribe();
        this._scrolledCount--;
        if (!this._scrolledCount) {
          this._cleanupGlobalListener?.();
          this._cleanupGlobalListener = void 0;
        }
      };
    });
  }
  ngOnDestroy() {
    this._cleanupGlobalListener?.();
    this._cleanupGlobalListener = void 0;
    this.scrollContainers.forEach((_, container) => this.deregister(container));
    this._scrolled.complete();
  }
  /**
   * Returns an observable that emits whenever any of the
   * scrollable ancestors of an element are scrolled.
   * @param elementOrElementRef Element whose ancestors to listen for.
   * @param auditTimeInMs Time to throttle the scroll events.
   */
  ancestorScrolled(elementOrElementRef, auditTimeInMs) {
    const ancestors = this.getAncestorScrollContainers(elementOrElementRef);
    return this.scrolled(auditTimeInMs).pipe(filter((target) => !target || ancestors.indexOf(target) > -1));
  }
  /** Returns all registered Scrollables that contain the provided element. */
  getAncestorScrollContainers(elementOrElementRef) {
    const scrollingContainers = [];
    this.scrollContainers.forEach((_subscription, scrollable) => {
      if (this._scrollableContainsElement(scrollable, elementOrElementRef)) {
        scrollingContainers.push(scrollable);
      }
    });
    return scrollingContainers;
  }
  /** Returns true if the element is contained within the provided Scrollable. */
  _scrollableContainsElement(scrollable, elementOrElementRef) {
    let element = coerceElement(elementOrElementRef);
    let scrollableElement = scrollable.getElementRef().nativeElement;
    do {
      if (element == scrollableElement) {
        return true;
      }
    } while (element = element.parentElement);
    return false;
  }
  static \u0275fac = function ScrollDispatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollDispatcher)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ScrollDispatcher,
    factory: _ScrollDispatcher.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CdkScrollable = class _CdkScrollable {
  elementRef = inject(ElementRef);
  scrollDispatcher = inject(ScrollDispatcher);
  ngZone = inject(NgZone);
  dir = inject(Directionality, {
    optional: true
  });
  _scrollElement = this.elementRef.nativeElement;
  _destroyed = new Subject();
  _renderer = inject(Renderer2);
  _cleanupScroll;
  _elementScrolled = new Subject();
  constructor() {
  }
  ngOnInit() {
    this._cleanupScroll = this.ngZone.runOutsideAngular(() => this._renderer.listen(this._scrollElement, "scroll", (event) => this._elementScrolled.next(event)));
    this.scrollDispatcher.register(this);
  }
  ngOnDestroy() {
    this._cleanupScroll?.();
    this._elementScrolled.complete();
    this.scrollDispatcher.deregister(this);
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** Returns observable that emits when a scroll event is fired on the host element. */
  elementScrolled() {
    return this._elementScrolled;
  }
  /** Gets the ElementRef for the viewport. */
  getElementRef() {
    return this.elementRef;
  }
  /**
   * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
   * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
   * left and right always refer to the left and right side of the scrolling container irrespective
   * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
   * in an RTL context.
   * @param options specified the offsets to scroll to.
   */
  scrollTo(options) {
    const el = this.elementRef.nativeElement;
    const isRtl = this.dir && this.dir.value == "rtl";
    if (options.left == null) {
      options.left = isRtl ? options.end : options.start;
    }
    if (options.right == null) {
      options.right = isRtl ? options.start : options.end;
    }
    if (options.bottom != null) {
      options.top = el.scrollHeight - el.clientHeight - options.bottom;
    }
    if (isRtl && getRtlScrollAxisType() != RtlScrollAxisType.NORMAL) {
      if (options.left != null) {
        options.right = el.scrollWidth - el.clientWidth - options.left;
      }
      if (getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
        options.left = options.right;
      } else if (getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
        options.left = options.right ? -options.right : options.right;
      }
    } else {
      if (options.right != null) {
        options.left = el.scrollWidth - el.clientWidth - options.right;
      }
    }
    this._applyScrollToOptions(options);
  }
  _applyScrollToOptions(options) {
    const el = this.elementRef.nativeElement;
    if (supportsScrollBehavior()) {
      el.scrollTo(options);
    } else {
      if (options.top != null) {
        el.scrollTop = options.top;
      }
      if (options.left != null) {
        el.scrollLeft = options.left;
      }
    }
  }
  /**
   * Measures the scroll offset relative to the specified edge of the viewport. This method can be
   * used instead of directly checking scrollLeft or scrollTop, since browsers are not consistent
   * about what scrollLeft means in RTL. The values returned by this method are normalized such that
   * left and right always refer to the left and right side of the scrolling container irrespective
   * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
   * in an RTL context.
   * @param from The edge to measure from.
   */
  measureScrollOffset(from) {
    const LEFT = "left";
    const RIGHT = "right";
    const el = this.elementRef.nativeElement;
    if (from == "top") {
      return el.scrollTop;
    }
    if (from == "bottom") {
      return el.scrollHeight - el.clientHeight - el.scrollTop;
    }
    const isRtl = this.dir && this.dir.value == "rtl";
    if (from == "start") {
      from = isRtl ? RIGHT : LEFT;
    } else if (from == "end") {
      from = isRtl ? LEFT : RIGHT;
    }
    if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
      if (from == LEFT) {
        return el.scrollWidth - el.clientWidth - el.scrollLeft;
      } else {
        return el.scrollLeft;
      }
    } else if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
      if (from == LEFT) {
        return el.scrollLeft + el.scrollWidth - el.clientWidth;
      } else {
        return -el.scrollLeft;
      }
    } else {
      if (from == LEFT) {
        return el.scrollLeft;
      } else {
        return el.scrollWidth - el.clientWidth - el.scrollLeft;
      }
    }
  }
  static \u0275fac = function CdkScrollable_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkScrollable)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkScrollable,
    selectors: [["", "cdk-scrollable", ""], ["", "cdkScrollable", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkScrollable, [{
    type: Directive,
    args: [{
      selector: "[cdk-scrollable], [cdkScrollable]"
    }]
  }], () => [], null);
})();
var DEFAULT_RESIZE_TIME = 20;
var ViewportRuler = class _ViewportRuler {
  _platform = inject(Platform);
  _listeners;
  /** Cached viewport dimensions. */
  _viewportSize;
  /** Stream of viewport change events. */
  _change = new Subject();
  /** Used to reference correct document/window */
  _document = inject(DOCUMENT);
  constructor() {
    const ngZone = inject(NgZone);
    const renderer = inject(RendererFactory2).createRenderer(null, null);
    ngZone.runOutsideAngular(() => {
      if (this._platform.isBrowser) {
        const changeListener = (event) => this._change.next(event);
        this._listeners = [renderer.listen("window", "resize", changeListener), renderer.listen("window", "orientationchange", changeListener)];
      }
      this.change().subscribe(() => this._viewportSize = null);
    });
  }
  ngOnDestroy() {
    this._listeners?.forEach((cleanup) => cleanup());
    this._change.complete();
  }
  /** Returns the viewport's width and height. */
  getViewportSize() {
    if (!this._viewportSize) {
      this._updateViewportSize();
    }
    const output = {
      width: this._viewportSize.width,
      height: this._viewportSize.height
    };
    if (!this._platform.isBrowser) {
      this._viewportSize = null;
    }
    return output;
  }
  /** Gets a DOMRect for the viewport's bounds. */
  getViewportRect() {
    const scrollPosition = this.getViewportScrollPosition();
    const {
      width,
      height
    } = this.getViewportSize();
    return {
      top: scrollPosition.top,
      left: scrollPosition.left,
      bottom: scrollPosition.top + height,
      right: scrollPosition.left + width,
      height,
      width
    };
  }
  /** Gets the (top, left) scroll position of the viewport. */
  getViewportScrollPosition() {
    if (!this._platform.isBrowser) {
      return {
        top: 0,
        left: 0
      };
    }
    const document2 = this._document;
    const window2 = this._getWindow();
    const documentElement = document2.documentElement;
    const documentRect = documentElement.getBoundingClientRect();
    const top = -documentRect.top || document2.body.scrollTop || window2.scrollY || documentElement.scrollTop || 0;
    const left = -documentRect.left || document2.body.scrollLeft || window2.scrollX || documentElement.scrollLeft || 0;
    return {
      top,
      left
    };
  }
  /**
   * Returns a stream that emits whenever the size of the viewport changes.
   * This stream emits outside of the Angular zone.
   * @param throttleTime Time in milliseconds to throttle the stream.
   */
  change(throttleTime = DEFAULT_RESIZE_TIME) {
    return throttleTime > 0 ? this._change.pipe(auditTime(throttleTime)) : this._change;
  }
  /** Use defaultView of injected document if available or fallback to global window reference */
  _getWindow() {
    return this._document.defaultView || window;
  }
  /** Updates the cached viewport size. */
  _updateViewportSize() {
    const window2 = this._getWindow();
    this._viewportSize = this._platform.isBrowser ? {
      width: window2.innerWidth,
      height: window2.innerHeight
    } : {
      width: 0,
      height: 0
    };
  }
  static \u0275fac = function ViewportRuler_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ViewportRuler)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ViewportRuler,
    factory: _ViewportRuler.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewportRuler, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var VIRTUAL_SCROLLABLE = new InjectionToken("VIRTUAL_SCROLLABLE");
var CdkVirtualScrollable = class _CdkVirtualScrollable extends CdkScrollable {
  constructor() {
    super();
  }
  /**
   * Measure the viewport size for the provided orientation.
   *
   * @param orientation The orientation to measure the size from.
   */
  measureViewportSize(orientation) {
    const viewportEl = this.elementRef.nativeElement;
    return orientation === "horizontal" ? viewportEl.clientWidth : viewportEl.clientHeight;
  }
  static \u0275fac = function CdkVirtualScrollable_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualScrollable)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkVirtualScrollable,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollable, [{
    type: Directive
  }], () => [], null);
})();
function rangesEqual(r1, r2) {
  return r1.start == r2.start && r1.end == r2.end;
}
var SCROLL_SCHEDULER = typeof requestAnimationFrame !== "undefined" ? animationFrameScheduler : asapScheduler;
var CdkVirtualScrollViewport = class _CdkVirtualScrollViewport extends CdkVirtualScrollable {
  elementRef = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _scrollStrategy = inject(VIRTUAL_SCROLL_STRATEGY, {
    optional: true
  });
  scrollable = inject(VIRTUAL_SCROLLABLE, {
    optional: true
  });
  _platform = inject(Platform);
  /** Emits when the viewport is detached from a CdkVirtualForOf. */
  _detachedSubject = new Subject();
  /** Emits when the rendered range changes. */
  _renderedRangeSubject = new Subject();
  /** The direction the viewport scrolls. */
  get orientation() {
    return this._orientation;
  }
  set orientation(orientation) {
    if (this._orientation !== orientation) {
      this._orientation = orientation;
      this._calculateSpacerSize();
    }
  }
  _orientation = "vertical";
  /**
   * Whether rendered items should persist in the DOM after scrolling out of view. By default, items
   * will be removed.
   */
  appendOnly = false;
  // Note: we don't use the typical EventEmitter here because we need to subscribe to the scroll
  // strategy lazily (i.e. only if the user is actually listening to the events). We do this because
  // depending on how the strategy calculates the scrolled index, it may come at a cost to
  // performance.
  /** Emits when the index of the first element visible in the viewport changes. */
  scrolledIndexChange = new Observable((observer) => this._scrollStrategy.scrolledIndexChange.subscribe((index) => Promise.resolve().then(() => this.ngZone.run(() => observer.next(index)))));
  /** The element that wraps the rendered content. */
  _contentWrapper;
  /** A stream that emits whenever the rendered range changes. */
  renderedRangeStream = this._renderedRangeSubject;
  /**
   * The total size of all content (in pixels), including content that is not currently rendered.
   */
  _totalContentSize = 0;
  /** A string representing the `style.width` property value to be used for the spacer element. */
  _totalContentWidth = signal("", ...ngDevMode ? [{
    debugName: "_totalContentWidth"
  }] : []);
  /** A string representing the `style.height` property value to be used for the spacer element. */
  _totalContentHeight = signal("", ...ngDevMode ? [{
    debugName: "_totalContentHeight"
  }] : []);
  /**
   * The CSS transform applied to the rendered subset of items so that they appear within the bounds
   * of the visible viewport.
   */
  _renderedContentTransform;
  /** The currently rendered range of indices. */
  _renderedRange = {
    start: 0,
    end: 0
  };
  /** The length of the data bound to this viewport (in number of items). */
  _dataLength = 0;
  /** The size of the viewport (in pixels). */
  _viewportSize = 0;
  /** the currently attached CdkVirtualScrollRepeater. */
  _forOf;
  /** The last rendered content offset that was set. */
  _renderedContentOffset = 0;
  /**
   * Whether the last rendered content offset was to the end of the content (and therefore needs to
   * be rewritten as an offset to the start of the content).
   */
  _renderedContentOffsetNeedsRewrite = false;
  _changeDetectionNeeded = signal(false, ...ngDevMode ? [{
    debugName: "_changeDetectionNeeded"
  }] : []);
  /** A list of functions to run after the next change detection cycle. */
  _runAfterChangeDetection = [];
  /** Subscription to changes in the viewport size. */
  _viewportChanges = Subscription.EMPTY;
  _injector = inject(Injector);
  _isDestroyed = false;
  constructor() {
    super();
    const viewportRuler = inject(ViewportRuler);
    if (!this._scrollStrategy && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error('Error: cdk-virtual-scroll-viewport requires the "itemSize" property to be set.');
    }
    this._viewportChanges = viewportRuler.change().subscribe(() => {
      this.checkViewportSize();
    });
    if (!this.scrollable) {
      this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable");
      this.scrollable = this;
    }
    const ref = effect(() => {
      if (this._changeDetectionNeeded()) {
        this._doChangeDetection();
      }
    }, ...ngDevMode ? [{
      debugName: "ref",
      injector: inject(ApplicationRef).injector
    }] : [
      // Using ApplicationRef injector is important here because we want this to be a root
      // effect that runs before change detection of any application views (since we're depending on markForCheck marking parents dirty)
      {
        injector: inject(ApplicationRef).injector
      }
    ]);
    inject(DestroyRef).onDestroy(() => void ref.destroy());
  }
  ngOnInit() {
    if (!this._platform.isBrowser) {
      return;
    }
    if (this.scrollable === this) {
      super.ngOnInit();
    }
    this.ngZone.runOutsideAngular(() => Promise.resolve().then(() => {
      this._measureViewportSize();
      this._scrollStrategy.attach(this);
      this.scrollable.elementScrolled().pipe(
        // Start off with a fake scroll event so we properly detect our initial position.
        startWith(null),
        // Collect multiple events into one until the next animation frame. This way if
        // there are multiple scroll events in the same frame we only need to recheck
        // our layout once.
        auditTime(0, SCROLL_SCHEDULER),
        // Usually `elementScrolled` is completed when the scrollable is destroyed, but
        // that may not be the case if a `CdkVirtualScrollableElement` is used so we have
        // to unsubscribe here just in case.
        takeUntil(this._destroyed)
      ).subscribe(() => this._scrollStrategy.onContentScrolled());
      this._markChangeDetectionNeeded();
    }));
  }
  ngOnDestroy() {
    this.detach();
    this._scrollStrategy.detach();
    this._renderedRangeSubject.complete();
    this._detachedSubject.complete();
    this._viewportChanges.unsubscribe();
    this._isDestroyed = true;
    super.ngOnDestroy();
  }
  /** Attaches a `CdkVirtualScrollRepeater` to this viewport. */
  attach(forOf) {
    if (this._forOf && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("CdkVirtualScrollViewport is already attached.");
    }
    this.ngZone.runOutsideAngular(() => {
      this._forOf = forOf;
      this._forOf.dataStream.pipe(takeUntil(this._detachedSubject)).subscribe((data) => {
        const newLength = data.length;
        if (newLength !== this._dataLength) {
          this._dataLength = newLength;
          this._scrollStrategy.onDataLengthChanged();
        }
        this._doChangeDetection();
      });
    });
  }
  /** Detaches the current `CdkVirtualForOf`. */
  detach() {
    this._forOf = null;
    this._detachedSubject.next();
  }
  /** Gets the length of the data bound to this viewport (in number of items). */
  getDataLength() {
    return this._dataLength;
  }
  /** Gets the size of the viewport (in pixels). */
  getViewportSize() {
    return this._viewportSize;
  }
  // TODO(mmalerba): This is technically out of sync with what's really rendered until a render
  // cycle happens. I'm being careful to only call it after the render cycle is complete and before
  // setting it to something else, but its error prone and should probably be split into
  // `pendingRange` and `renderedRange`, the latter reflecting whats actually in the DOM.
  /** Get the current rendered range of items. */
  getRenderedRange() {
    return this._renderedRange;
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from];
  }
  /**
   * Sets the total size of all content (in pixels), including content that is not currently
   * rendered.
   */
  setTotalContentSize(size) {
    if (this._totalContentSize !== size) {
      this._totalContentSize = size;
      this._calculateSpacerSize();
      this._markChangeDetectionNeeded();
    }
  }
  /** Sets the currently rendered range of indices. */
  setRenderedRange(range) {
    if (!rangesEqual(this._renderedRange, range)) {
      if (this.appendOnly) {
        range = {
          start: 0,
          end: Math.max(this._renderedRange.end, range.end)
        };
      }
      this._renderedRangeSubject.next(this._renderedRange = range);
      this._markChangeDetectionNeeded(() => this._scrollStrategy.onContentRendered());
    }
  }
  /**
   * Gets the offset from the start of the viewport to the start of the rendered data (in pixels).
   */
  getOffsetToRenderedContentStart() {
    return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset;
  }
  /**
   * Sets the offset from the start of the viewport to either the start or end of the rendered data
   * (in pixels).
   */
  setRenderedContentOffset(offset, to = "to-start") {
    offset = this.appendOnly && to === "to-start" ? 0 : offset;
    const isRtl = this.dir && this.dir.value == "rtl";
    const isHorizontal = this.orientation == "horizontal";
    const axis = isHorizontal ? "X" : "Y";
    const axisDirection = isHorizontal && isRtl ? -1 : 1;
    let transform = `translate${axis}(${Number(axisDirection * offset)}px)`;
    this._renderedContentOffset = offset;
    if (to === "to-end") {
      transform += ` translate${axis}(-100%)`;
      this._renderedContentOffsetNeedsRewrite = true;
    }
    if (this._renderedContentTransform != transform) {
      this._renderedContentTransform = transform;
      this._markChangeDetectionNeeded(() => {
        if (this._renderedContentOffsetNeedsRewrite) {
          this._renderedContentOffset -= this.measureRenderedContentSize();
          this._renderedContentOffsetNeedsRewrite = false;
          this.setRenderedContentOffset(this._renderedContentOffset);
        } else {
          this._scrollStrategy.onRenderedOffsetChanged();
        }
      });
    }
  }
  /**
   * Scrolls to the given offset from the start of the viewport. Please note that this is not always
   * the same as setting `scrollTop` or `scrollLeft`. In a horizontal viewport with right-to-left
   * direction, this would be the equivalent of setting a fictional `scrollRight` property.
   * @param offset The offset to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
   */
  scrollToOffset(offset, behavior = "auto") {
    const options = {
      behavior
    };
    if (this.orientation === "horizontal") {
      options.start = offset;
    } else {
      options.top = offset;
    }
    this.scrollable.scrollTo(options);
  }
  /**
   * Scrolls to the offset for the given index.
   * @param index The index of the element to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
   */
  scrollToIndex(index, behavior = "auto") {
    this._scrollStrategy.scrollToIndex(index, behavior);
  }
  /**
   * Gets the current scroll offset from the start of the scrollable (in pixels).
   * @param from The edge to measure the offset from. Defaults to 'top' in vertical mode and 'start'
   *     in horizontal mode.
   */
  measureScrollOffset(from) {
    let measureScrollOffset;
    if (this.scrollable == this) {
      measureScrollOffset = (_from) => super.measureScrollOffset(_from);
    } else {
      measureScrollOffset = (_from) => this.scrollable.measureScrollOffset(_from);
    }
    return Math.max(0, measureScrollOffset(from ?? (this.orientation === "horizontal" ? "start" : "top")) - this.measureViewportOffset());
  }
  /**
   * Measures the offset of the viewport from the scrolling container
   * @param from The edge to measure from.
   */
  measureViewportOffset(from) {
    let fromRect;
    const LEFT = "left";
    const RIGHT = "right";
    const isRtl = this.dir?.value == "rtl";
    if (from == "start") {
      fromRect = isRtl ? RIGHT : LEFT;
    } else if (from == "end") {
      fromRect = isRtl ? LEFT : RIGHT;
    } else if (from) {
      fromRect = from;
    } else {
      fromRect = this.orientation === "horizontal" ? "left" : "top";
    }
    const scrollerClientRect = this.scrollable.measureBoundingClientRectWithScrollOffset(fromRect);
    const viewportClientRect = this.elementRef.nativeElement.getBoundingClientRect()[fromRect];
    return viewportClientRect - scrollerClientRect;
  }
  /** Measure the combined size of all of the rendered items. */
  measureRenderedContentSize() {
    const contentEl = this._contentWrapper.nativeElement;
    return this.orientation === "horizontal" ? contentEl.offsetWidth : contentEl.offsetHeight;
  }
  /**
   * Measure the total combined size of the given range. Throws if the range includes items that are
   * not rendered.
   */
  measureRangeSize(range) {
    if (!this._forOf) {
      return 0;
    }
    return this._forOf.measureRangeSize(range, this.orientation);
  }
  /** Update the viewport dimensions and re-render. */
  checkViewportSize() {
    this._measureViewportSize();
    this._scrollStrategy.onDataLengthChanged();
  }
  /** Measure the viewport size. */
  _measureViewportSize() {
    this._viewportSize = this.scrollable.measureViewportSize(this.orientation);
  }
  /** Queue up change detection to run. */
  _markChangeDetectionNeeded(runAfter) {
    if (runAfter) {
      this._runAfterChangeDetection.push(runAfter);
    }
    if (untracked(this._changeDetectionNeeded)) {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      Promise.resolve().then(() => {
        this.ngZone.run(() => {
          this._changeDetectionNeeded.set(true);
        });
      });
    });
  }
  /** Run change detection. */
  _doChangeDetection() {
    if (this._isDestroyed) {
      return;
    }
    this.ngZone.run(() => {
      this._changeDetectorRef.markForCheck();
      this._contentWrapper.nativeElement.style.transform = this._renderedContentTransform;
      afterNextRender(() => {
        this._changeDetectionNeeded.set(false);
        const runAfterChangeDetection = this._runAfterChangeDetection;
        this._runAfterChangeDetection = [];
        for (const fn of runAfterChangeDetection) {
          fn();
        }
      }, {
        injector: this._injector
      });
    });
  }
  /** Calculates the `style.width` and `style.height` for the spacer element. */
  _calculateSpacerSize() {
    this._totalContentHeight.set(this.orientation === "horizontal" ? "" : `${this._totalContentSize}px`);
    this._totalContentWidth.set(this.orientation === "horizontal" ? `${this._totalContentSize}px` : "");
  }
  static \u0275fac = function CdkVirtualScrollViewport_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualScrollViewport)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CdkVirtualScrollViewport,
    selectors: [["cdk-virtual-scroll-viewport"]],
    viewQuery: function CdkVirtualScrollViewport_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._contentWrapper = _t.first);
      }
    },
    hostAttrs: [1, "cdk-virtual-scroll-viewport"],
    hostVars: 4,
    hostBindings: function CdkVirtualScrollViewport_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("cdk-virtual-scroll-orientation-horizontal", ctx.orientation === "horizontal")("cdk-virtual-scroll-orientation-vertical", ctx.orientation !== "horizontal");
      }
    },
    inputs: {
      orientation: "orientation",
      appendOnly: [2, "appendOnly", "appendOnly", booleanAttribute]
    },
    outputs: {
      scrolledIndexChange: "scrolledIndexChange"
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkScrollable,
      useFactory: (virtualScrollable, viewport) => virtualScrollable || viewport,
      deps: [[new Optional(), new Inject(VIRTUAL_SCROLLABLE)], _CdkVirtualScrollViewport]
    }]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c1,
    decls: 4,
    vars: 4,
    consts: [["contentWrapper", ""], [1, "cdk-virtual-scroll-content-wrapper"], [1, "cdk-virtual-scroll-spacer"]],
    template: function CdkVirtualScrollViewport_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domElementStart(0, "div", 1, 0);
        \u0275\u0275projection(2);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElement(3, "div", 2);
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275styleProp("width", ctx._totalContentWidth())("height", ctx._totalContentHeight());
      }
    },
    styles: ["cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollViewport, [{
    type: Component,
    args: [{
      selector: "cdk-virtual-scroll-viewport",
      host: {
        "class": "cdk-virtual-scroll-viewport",
        "[class.cdk-virtual-scroll-orientation-horizontal]": 'orientation === "horizontal"',
        "[class.cdk-virtual-scroll-orientation-vertical]": 'orientation !== "horizontal"'
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: CdkScrollable,
        useFactory: (virtualScrollable, viewport) => virtualScrollable || viewport,
        deps: [[new Optional(), new Inject(VIRTUAL_SCROLLABLE)], CdkVirtualScrollViewport]
      }],
      template: '<!--\n  Wrap the rendered content in an element that will be used to offset it based on the scroll\n  position.\n-->\n<div #contentWrapper class="cdk-virtual-scroll-content-wrapper">\n  <ng-content></ng-content>\n</div>\n<!--\n  Spacer used to force the scrolling container to the correct size for the *total* number of items\n  so that the scrollbar captures the size of the entire data set.\n-->\n<div class="cdk-virtual-scroll-spacer"\n     [style.width]="_totalContentWidth()" [style.height]="_totalContentHeight()"></div>\n',
      styles: ["cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}\n"]
    }]
  }], () => [], {
    orientation: [{
      type: Input
    }],
    appendOnly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    scrolledIndexChange: [{
      type: Output
    }],
    _contentWrapper: [{
      type: ViewChild,
      args: ["contentWrapper", {
        static: true
      }]
    }]
  });
})();
function getOffset(orientation, direction, node) {
  const el = node;
  if (!el.getBoundingClientRect) {
    return 0;
  }
  const rect = el.getBoundingClientRect();
  if (orientation === "horizontal") {
    return direction === "start" ? rect.left : rect.right;
  }
  return direction === "start" ? rect.top : rect.bottom;
}
var CdkVirtualForOf = class _CdkVirtualForOf {
  _viewContainerRef = inject(ViewContainerRef);
  _template = inject(TemplateRef);
  _differs = inject(IterableDiffers);
  _viewRepeater = inject(_VIEW_REPEATER_STRATEGY);
  _viewport = inject(CdkVirtualScrollViewport, {
    skipSelf: true
  });
  /** Emits when the rendered view of the data changes. */
  viewChange = new Subject();
  /** Subject that emits when a new DataSource instance is given. */
  _dataSourceChanges = new Subject();
  /** The DataSource to display. */
  get cdkVirtualForOf() {
    return this._cdkVirtualForOf;
  }
  set cdkVirtualForOf(value) {
    this._cdkVirtualForOf = value;
    if (isDataSource(value)) {
      this._dataSourceChanges.next(value);
    } else {
      this._dataSourceChanges.next(new ArrayDataSource(isObservable(value) ? value : Array.from(value || [])));
    }
  }
  _cdkVirtualForOf;
  /**
   * The `TrackByFunction` to use for tracking changes. The `TrackByFunction` takes the index and
   * the item and produces a value to be used as the item's identity when tracking changes.
   */
  get cdkVirtualForTrackBy() {
    return this._cdkVirtualForTrackBy;
  }
  set cdkVirtualForTrackBy(fn) {
    this._needsUpdate = true;
    this._cdkVirtualForTrackBy = fn ? (index, item) => fn(index + (this._renderedRange ? this._renderedRange.start : 0), item) : void 0;
  }
  _cdkVirtualForTrackBy;
  /** The template used to stamp out new elements. */
  set cdkVirtualForTemplate(value) {
    if (value) {
      this._needsUpdate = true;
      this._template = value;
    }
  }
  /**
   * The size of the cache used to store templates that are not being used for re-use later.
   * Setting the cache size to `0` will disable caching. Defaults to 20 templates.
   */
  get cdkVirtualForTemplateCacheSize() {
    return this._viewRepeater.viewCacheSize;
  }
  set cdkVirtualForTemplateCacheSize(size) {
    this._viewRepeater.viewCacheSize = coerceNumberProperty(size);
  }
  /** Emits whenever the data in the current DataSource changes. */
  dataStream = this._dataSourceChanges.pipe(
    // Start off with null `DataSource`.
    startWith(null),
    // Bundle up the previous and current data sources so we can work with both.
    pairwise(),
    // Use `_changeDataSource` to disconnect from the previous data source and connect to the
    // new one, passing back a stream of data changes which we run through `switchMap` to give
    // us a data stream that emits the latest data from whatever the current `DataSource` is.
    switchMap(([prev, cur]) => this._changeDataSource(prev, cur)),
    // Replay the last emitted data when someone subscribes.
    shareReplay(1)
  );
  /** The differ used to calculate changes to the data. */
  _differ = null;
  /** The most recent data emitted from the DataSource. */
  _data;
  /** The currently rendered items. */
  _renderedItems;
  /** The currently rendered range of indices. */
  _renderedRange;
  /** Whether the rendered data should be updated during the next ngDoCheck cycle. */
  _needsUpdate = false;
  _destroyed = new Subject();
  constructor() {
    const ngZone = inject(NgZone);
    this.dataStream.subscribe((data) => {
      this._data = data;
      this._onRenderedDataChange();
    });
    this._viewport.renderedRangeStream.pipe(takeUntil(this._destroyed)).subscribe((range) => {
      this._renderedRange = range;
      if (this.viewChange.observers.length) {
        ngZone.run(() => this.viewChange.next(this._renderedRange));
      }
      this._onRenderedDataChange();
    });
    this._viewport.attach(this);
  }
  /**
   * Measures the combined size (width for horizontal orientation, height for vertical) of all items
   * in the specified range. Throws an error if the range includes items that are not currently
   * rendered.
   */
  measureRangeSize(range, orientation) {
    if (range.start >= range.end) {
      return 0;
    }
    if ((range.start < this._renderedRange.start || range.end > this._renderedRange.end) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`Error: attempted to measure an item that isn't rendered.`);
    }
    const renderedStartIndex = range.start - this._renderedRange.start;
    const rangeLen = range.end - range.start;
    let firstNode;
    let lastNode;
    for (let i = 0; i < rangeLen; i++) {
      const view = this._viewContainerRef.get(i + renderedStartIndex);
      if (view && view.rootNodes.length) {
        firstNode = lastNode = view.rootNodes[0];
        break;
      }
    }
    for (let i = rangeLen - 1; i > -1; i--) {
      const view = this._viewContainerRef.get(i + renderedStartIndex);
      if (view && view.rootNodes.length) {
        lastNode = view.rootNodes[view.rootNodes.length - 1];
        break;
      }
    }
    return firstNode && lastNode ? getOffset(orientation, "end", lastNode) - getOffset(orientation, "start", firstNode) : 0;
  }
  ngDoCheck() {
    if (this._differ && this._needsUpdate) {
      const changes = this._differ.diff(this._renderedItems);
      if (!changes) {
        this._updateContext();
      } else {
        this._applyChanges(changes);
      }
      this._needsUpdate = false;
    }
  }
  ngOnDestroy() {
    this._viewport.detach();
    this._dataSourceChanges.next(void 0);
    this._dataSourceChanges.complete();
    this.viewChange.complete();
    this._destroyed.next();
    this._destroyed.complete();
    this._viewRepeater.detach();
  }
  /** React to scroll state changes in the viewport. */
  _onRenderedDataChange() {
    if (!this._renderedRange) {
      return;
    }
    this._renderedItems = this._data.slice(this._renderedRange.start, this._renderedRange.end);
    if (!this._differ) {
      this._differ = this._differs.find(this._renderedItems).create((index, item) => {
        return this.cdkVirtualForTrackBy ? this.cdkVirtualForTrackBy(index, item) : item;
      });
    }
    this._needsUpdate = true;
  }
  /** Swap out one `DataSource` for another. */
  _changeDataSource(oldDs, newDs) {
    if (oldDs) {
      oldDs.disconnect(this);
    }
    this._needsUpdate = true;
    return newDs ? newDs.connect(this) : of();
  }
  /** Update the `CdkVirtualForOfContext` for all views. */
  _updateContext() {
    const count = this._data.length;
    let i = this._viewContainerRef.length;
    while (i--) {
      const view = this._viewContainerRef.get(i);
      view.context.index = this._renderedRange.start + i;
      view.context.count = count;
      this._updateComputedContextProperties(view.context);
      view.detectChanges();
    }
  }
  /** Apply changes to the DOM. */
  _applyChanges(changes) {
    this._viewRepeater.applyChanges(changes, this._viewContainerRef, (record, _adjustedPreviousIndex, currentIndex) => this._getEmbeddedViewArgs(record, currentIndex), (record) => record.item);
    changes.forEachIdentityChange((record) => {
      const view = this._viewContainerRef.get(record.currentIndex);
      view.context.$implicit = record.item;
    });
    const count = this._data.length;
    let i = this._viewContainerRef.length;
    while (i--) {
      const view = this._viewContainerRef.get(i);
      view.context.index = this._renderedRange.start + i;
      view.context.count = count;
      this._updateComputedContextProperties(view.context);
    }
  }
  /** Update the computed properties on the `CdkVirtualForOfContext`. */
  _updateComputedContextProperties(context) {
    context.first = context.index === 0;
    context.last = context.index === context.count - 1;
    context.even = context.index % 2 === 0;
    context.odd = !context.even;
  }
  _getEmbeddedViewArgs(record, index) {
    return {
      templateRef: this._template,
      context: {
        $implicit: record.item,
        // It's guaranteed that the iterable is not "undefined" or "null" because we only
        // generate views for elements if the "cdkVirtualForOf" iterable has elements.
        cdkVirtualForOf: this._cdkVirtualForOf,
        index: -1,
        count: -1,
        first: false,
        last: false,
        odd: false,
        even: false
      },
      index
    };
  }
  static ngTemplateContextGuard(directive, context) {
    return true;
  }
  static \u0275fac = function CdkVirtualForOf_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualForOf)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkVirtualForOf,
    selectors: [["", "cdkVirtualFor", "", "cdkVirtualForOf", ""]],
    inputs: {
      cdkVirtualForOf: "cdkVirtualForOf",
      cdkVirtualForTrackBy: "cdkVirtualForTrackBy",
      cdkVirtualForTemplate: "cdkVirtualForTemplate",
      cdkVirtualForTemplateCacheSize: "cdkVirtualForTemplateCacheSize"
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: _VIEW_REPEATER_STRATEGY,
      useClass: _RecycleViewRepeaterStrategy
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualForOf, [{
    type: Directive,
    args: [{
      selector: "[cdkVirtualFor][cdkVirtualForOf]",
      providers: [{
        provide: _VIEW_REPEATER_STRATEGY,
        useClass: _RecycleViewRepeaterStrategy
      }]
    }]
  }], () => [], {
    cdkVirtualForOf: [{
      type: Input
    }],
    cdkVirtualForTrackBy: [{
      type: Input
    }],
    cdkVirtualForTemplate: [{
      type: Input
    }],
    cdkVirtualForTemplateCacheSize: [{
      type: Input
    }]
  });
})();
var CdkVirtualScrollableElement = class _CdkVirtualScrollableElement extends CdkVirtualScrollable {
  constructor() {
    super();
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from] - this.measureScrollOffset(from);
  }
  static \u0275fac = function CdkVirtualScrollableElement_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualScrollableElement)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkVirtualScrollableElement,
    selectors: [["", "cdkVirtualScrollingElement", ""]],
    hostAttrs: [1, "cdk-virtual-scrollable"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: VIRTUAL_SCROLLABLE,
      useExisting: _CdkVirtualScrollableElement
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollableElement, [{
    type: Directive,
    args: [{
      selector: "[cdkVirtualScrollingElement]",
      providers: [{
        provide: VIRTUAL_SCROLLABLE,
        useExisting: CdkVirtualScrollableElement
      }],
      host: {
        "class": "cdk-virtual-scrollable"
      }
    }]
  }], () => [], null);
})();
var CdkVirtualScrollableWindow = class _CdkVirtualScrollableWindow extends CdkVirtualScrollable {
  constructor() {
    super();
    const document2 = inject(DOCUMENT);
    this.elementRef = new ElementRef(document2.documentElement);
    this._scrollElement = document2;
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from];
  }
  static \u0275fac = function CdkVirtualScrollableWindow_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualScrollableWindow)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkVirtualScrollableWindow,
    selectors: [["cdk-virtual-scroll-viewport", "scrollWindow", ""]],
    features: [\u0275\u0275ProvidersFeature([{
      provide: VIRTUAL_SCROLLABLE,
      useExisting: _CdkVirtualScrollableWindow
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollableWindow, [{
    type: Directive,
    args: [{
      selector: "cdk-virtual-scroll-viewport[scrollWindow]",
      providers: [{
        provide: VIRTUAL_SCROLLABLE,
        useExisting: CdkVirtualScrollableWindow
      }]
    }]
  }], () => [], null);
})();
var CdkScrollableModule = class _CdkScrollableModule {
  static \u0275fac = function CdkScrollableModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkScrollableModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _CdkScrollableModule,
    imports: [CdkScrollable],
    exports: [CdkScrollable]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkScrollableModule, [{
    type: NgModule,
    args: [{
      exports: [CdkScrollable],
      imports: [CdkScrollable]
    }]
  }], null, null);
})();
var ScrollingModule = class _ScrollingModule {
  static \u0275fac = function ScrollingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _ScrollingModule,
    imports: [BidiModule, CdkScrollableModule, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollableWindow, CdkVirtualScrollableElement],
    exports: [BidiModule, CdkScrollableModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, CdkVirtualScrollableWindow, CdkVirtualScrollableElement]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [BidiModule, CdkScrollableModule, BidiModule, CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollingModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule, CdkScrollableModule, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollableWindow, CdkVirtualScrollableElement],
      exports: [BidiModule, CdkScrollableModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, CdkVirtualScrollableWindow, CdkVirtualScrollableElement]
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/layout.mjs
var LayoutModule = class _LayoutModule {
  static \u0275fac = function LayoutModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LayoutModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _LayoutModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/animation.mjs
var MATERIAL_ANIMATIONS = new InjectionToken("MATERIAL_ANIMATIONS");
var reducedMotion = null;
function _getAnimationsState() {
  if (inject(MATERIAL_ANIMATIONS, { optional: true })?.animationsDisabled || inject(ANIMATION_MODULE_TYPE, { optional: true }) === "NoopAnimations") {
    return "di-disabled";
  }
  reducedMotion ??= inject(MediaMatcher).matchMedia("(prefers-reduced-motion)").matches;
  return reducedMotion ? "reduced-motion" : "enabled";
}
function _animationsDisabled() {
  return _getAnimationsState() !== "enabled";
}

// node_modules/@angular/cdk/fesm2022/portal.mjs
function throwNullPortalError() {
  throw Error("Must provide a portal to attach");
}
function throwPortalAlreadyAttachedError() {
  throw Error("Host already has a portal attached");
}
function throwPortalOutletAlreadyDisposedError() {
  throw Error("This PortalOutlet has already been disposed");
}
function throwUnknownPortalTypeError() {
  throw Error("Attempting to attach an unknown Portal type. BasePortalOutlet accepts either a ComponentPortal or a TemplatePortal.");
}
function throwNullPortalOutletError() {
  throw Error("Attempting to attach a portal to a null PortalOutlet");
}
function throwNoPortalAttachedError() {
  throw Error("Attempting to detach a portal that is not attached to a host");
}
var Portal = class {
  _attachedHost;
  /** Attach this portal to a host. */
  attach(host) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (host == null) {
        throwNullPortalOutletError();
      }
      if (host.hasAttached()) {
        throwPortalAlreadyAttachedError();
      }
    }
    this._attachedHost = host;
    return host.attach(this);
  }
  /** Detach this portal from its host */
  detach() {
    let host = this._attachedHost;
    if (host != null) {
      this._attachedHost = null;
      host.detach();
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throwNoPortalAttachedError();
    }
  }
  /** Whether this portal is attached to a host. */
  get isAttached() {
    return this._attachedHost != null;
  }
  /**
   * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
   * the PortalOutlet when it is performing an `attach()` or `detach()`.
   */
  setAttachedHost(host) {
    this._attachedHost = host;
  }
};
var ComponentPortal = class extends Portal {
  /** The type of the component that will be instantiated for attachment. */
  component;
  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This is different from where the component *renders*, which is determined by the PortalOutlet.
   * The origin is necessary when the host is outside of the Angular application context.
   */
  viewContainerRef;
  /** Injector used for the instantiation of the component. */
  injector;
  /**
   * List of DOM nodes that should be projected through `<ng-content>` of the attached component.
   */
  projectableNodes;
  constructor(component, viewContainerRef, injector, projectableNodes) {
    super();
    this.component = component;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.projectableNodes = projectableNodes;
  }
};
var TemplatePortal = class extends Portal {
  templateRef;
  viewContainerRef;
  context;
  injector;
  constructor(templateRef, viewContainerRef, context, injector) {
    super();
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.context = context;
    this.injector = injector;
  }
  get origin() {
    return this.templateRef.elementRef;
  }
  /**
   * Attach the portal to the provided `PortalOutlet`.
   * When a context is provided it will override the `context` property of the `TemplatePortal`
   * instance.
   */
  attach(host, context = this.context) {
    this.context = context;
    return super.attach(host);
  }
  detach() {
    this.context = void 0;
    return super.detach();
  }
};
var DomPortal = class extends Portal {
  /** DOM node hosting the portal's content. */
  element;
  constructor(element) {
    super();
    this.element = element instanceof ElementRef ? element.nativeElement : element;
  }
};
var BasePortalOutlet = class {
  /** The portal currently attached to the host. */
  _attachedPortal;
  /** A function that will permanently dispose this host. */
  _disposeFn;
  /** Whether this host has already been permanently disposed. */
  _isDisposed = false;
  /** Whether this host has an attached portal. */
  hasAttached() {
    return !!this._attachedPortal;
  }
  /** Attaches a portal. */
  attach(portal) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!portal) {
        throwNullPortalError();
      }
      if (this.hasAttached()) {
        throwPortalAlreadyAttachedError();
      }
      if (this._isDisposed) {
        throwPortalOutletAlreadyDisposedError();
      }
    }
    if (portal instanceof ComponentPortal) {
      this._attachedPortal = portal;
      return this.attachComponentPortal(portal);
    } else if (portal instanceof TemplatePortal) {
      this._attachedPortal = portal;
      return this.attachTemplatePortal(portal);
    } else if (this.attachDomPortal && portal instanceof DomPortal) {
      this._attachedPortal = portal;
      return this.attachDomPortal(portal);
    }
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      throwUnknownPortalTypeError();
    }
  }
  // @breaking-change 10.0.0 `attachDomPortal` to become a required abstract method.
  attachDomPortal = null;
  /** Detaches a previously attached portal. */
  detach() {
    if (this._attachedPortal) {
      this._attachedPortal.setAttachedHost(null);
      this._attachedPortal = null;
    }
    this._invokeDisposeFn();
  }
  /** Permanently dispose of this portal host. */
  dispose() {
    if (this.hasAttached()) {
      this.detach();
    }
    this._invokeDisposeFn();
    this._isDisposed = true;
  }
  /** @docs-private */
  setDisposeFn(fn) {
    this._disposeFn = fn;
  }
  _invokeDisposeFn() {
    if (this._disposeFn) {
      this._disposeFn();
      this._disposeFn = null;
    }
  }
};
var DomPortalOutlet = class extends BasePortalOutlet {
  outletElement;
  _appRef;
  _defaultInjector;
  /**
   * @param outletElement Element into which the content is projected.
   * @param _appRef Reference to the application. Only used in component portals when there
   *   is no `ViewContainerRef` available.
   * @param _defaultInjector Injector to use as a fallback when the portal being attached doesn't
   *   have one. Only used for component portals.
   */
  constructor(outletElement, _appRef, _defaultInjector) {
    super();
    this.outletElement = outletElement;
    this._appRef = _appRef;
    this._defaultInjector = _defaultInjector;
  }
  /**
   * Attach the given ComponentPortal to DOM element.
   * @param portal Portal to be attached
   * @returns Reference to the created component.
   */
  attachComponentPortal(portal) {
    let componentRef;
    if (portal.viewContainerRef) {
      const injector = portal.injector || portal.viewContainerRef.injector;
      const ngModuleRef = injector.get(NgModuleRef$1, null, {
        optional: true
      }) || void 0;
      componentRef = portal.viewContainerRef.createComponent(portal.component, {
        index: portal.viewContainerRef.length,
        injector,
        ngModuleRef,
        projectableNodes: portal.projectableNodes || void 0
      });
      this.setDisposeFn(() => componentRef.destroy());
    } else {
      if ((typeof ngDevMode === "undefined" || ngDevMode) && !this._appRef) {
        throw Error("Cannot attach component portal to outlet without an ApplicationRef.");
      }
      const appRef = this._appRef;
      const elementInjector = portal.injector || this._defaultInjector || Injector.NULL;
      const environmentInjector = elementInjector.get(EnvironmentInjector, appRef.injector);
      componentRef = createComponent(portal.component, {
        elementInjector,
        environmentInjector,
        projectableNodes: portal.projectableNodes || void 0
      });
      appRef.attachView(componentRef.hostView);
      this.setDisposeFn(() => {
        if (appRef.viewCount > 0) {
          appRef.detachView(componentRef.hostView);
        }
        componentRef.destroy();
      });
    }
    this.outletElement.appendChild(this._getComponentRootNode(componentRef));
    this._attachedPortal = portal;
    return componentRef;
  }
  /**
   * Attaches a template portal to the DOM as an embedded view.
   * @param portal Portal to be attached.
   * @returns Reference to the created embedded view.
   */
  attachTemplatePortal(portal) {
    let viewContainer = portal.viewContainerRef;
    let viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context, {
      injector: portal.injector
    });
    viewRef.rootNodes.forEach((rootNode) => this.outletElement.appendChild(rootNode));
    viewRef.detectChanges();
    this.setDisposeFn(() => {
      let index = viewContainer.indexOf(viewRef);
      if (index !== -1) {
        viewContainer.remove(index);
      }
    });
    this._attachedPortal = portal;
    return viewRef;
  }
  /**
   * Attaches a DOM portal by transferring its content into the outlet.
   * @param portal Portal to be attached.
   * @deprecated To be turned into a method.
   * @breaking-change 10.0.0
   */
  attachDomPortal = (portal) => {
    const element = portal.element;
    if (!element.parentNode && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("DOM portal content must be attached to a parent node.");
    }
    const anchorNode = this.outletElement.ownerDocument.createComment("dom-portal");
    element.parentNode.insertBefore(anchorNode, element);
    this.outletElement.appendChild(element);
    this._attachedPortal = portal;
    super.setDisposeFn(() => {
      if (anchorNode.parentNode) {
        anchorNode.parentNode.replaceChild(element, anchorNode);
      }
    });
  };
  /**
   * Clears out a portal from the DOM.
   */
  dispose() {
    super.dispose();
    this.outletElement.remove();
  }
  /** Gets the root HTMLElement for an instantiated component. */
  _getComponentRootNode(componentRef) {
    return componentRef.hostView.rootNodes[0];
  }
};
var CdkPortal = class _CdkPortal extends TemplatePortal {
  constructor() {
    const templateRef = inject(TemplateRef);
    const viewContainerRef = inject(ViewContainerRef);
    super(templateRef, viewContainerRef);
  }
  static \u0275fac = function CdkPortal_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkPortal)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkPortal,
    selectors: [["", "cdkPortal", ""]],
    exportAs: ["cdkPortal"],
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkPortal, [{
    type: Directive,
    args: [{
      selector: "[cdkPortal]",
      exportAs: "cdkPortal"
    }]
  }], () => [], null);
})();
var TemplatePortalDirective = class _TemplatePortalDirective extends CdkPortal {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275TemplatePortalDirective_BaseFactory;
    return function TemplatePortalDirective_Factory(__ngFactoryType__) {
      return (\u0275TemplatePortalDirective_BaseFactory || (\u0275TemplatePortalDirective_BaseFactory = \u0275\u0275getInheritedFactory(_TemplatePortalDirective)))(__ngFactoryType__ || _TemplatePortalDirective);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _TemplatePortalDirective,
    selectors: [["", "cdk-portal", ""], ["", "portal", ""]],
    exportAs: ["cdkPortal"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkPortal,
      useExisting: _TemplatePortalDirective
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TemplatePortalDirective, [{
    type: Directive,
    args: [{
      selector: "[cdk-portal], [portal]",
      exportAs: "cdkPortal",
      providers: [{
        provide: CdkPortal,
        useExisting: TemplatePortalDirective
      }]
    }]
  }], null, null);
})();
var CdkPortalOutlet = class _CdkPortalOutlet extends BasePortalOutlet {
  _moduleRef = inject(NgModuleRef$1, {
    optional: true
  });
  _document = inject(DOCUMENT);
  _viewContainerRef = inject(ViewContainerRef);
  /** Whether the portal component is initialized. */
  _isInitialized = false;
  /** Reference to the currently-attached component/view ref. */
  _attachedRef;
  constructor() {
    super();
  }
  /** Portal associated with the Portal outlet. */
  get portal() {
    return this._attachedPortal;
  }
  set portal(portal) {
    if (this.hasAttached() && !portal && !this._isInitialized) {
      return;
    }
    if (this.hasAttached()) {
      super.detach();
    }
    if (portal) {
      super.attach(portal);
    }
    this._attachedPortal = portal || null;
  }
  /** Emits when a portal is attached to the outlet. */
  attached = new EventEmitter();
  /** Component or view reference that is attached to the portal. */
  get attachedRef() {
    return this._attachedRef;
  }
  ngOnInit() {
    this._isInitialized = true;
  }
  ngOnDestroy() {
    super.dispose();
    this._attachedRef = this._attachedPortal = null;
  }
  /**
   * Attach the given ComponentPortal to this PortalOutlet.
   *
   * @param portal Portal to be attached to the portal outlet.
   * @returns Reference to the created component.
   */
  attachComponentPortal(portal) {
    portal.setAttachedHost(this);
    const viewContainerRef = portal.viewContainerRef != null ? portal.viewContainerRef : this._viewContainerRef;
    const ref = viewContainerRef.createComponent(portal.component, {
      index: viewContainerRef.length,
      injector: portal.injector || viewContainerRef.injector,
      projectableNodes: portal.projectableNodes || void 0,
      ngModuleRef: this._moduleRef || void 0
    });
    if (viewContainerRef !== this._viewContainerRef) {
      this._getRootNode().appendChild(ref.hostView.rootNodes[0]);
    }
    super.setDisposeFn(() => ref.destroy());
    this._attachedPortal = portal;
    this._attachedRef = ref;
    this.attached.emit(ref);
    return ref;
  }
  /**
   * Attach the given TemplatePortal to this PortalHost as an embedded View.
   * @param portal Portal to be attached.
   * @returns Reference to the created embedded view.
   */
  attachTemplatePortal(portal) {
    portal.setAttachedHost(this);
    const viewRef = this._viewContainerRef.createEmbeddedView(portal.templateRef, portal.context, {
      injector: portal.injector
    });
    super.setDisposeFn(() => this._viewContainerRef.clear());
    this._attachedPortal = portal;
    this._attachedRef = viewRef;
    this.attached.emit(viewRef);
    return viewRef;
  }
  /**
   * Attaches the given DomPortal to this PortalHost by moving all of the portal content into it.
   * @param portal Portal to be attached.
   * @deprecated To be turned into a method.
   * @breaking-change 10.0.0
   */
  attachDomPortal = (portal) => {
    const element = portal.element;
    if (!element.parentNode && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("DOM portal content must be attached to a parent node.");
    }
    const anchorNode = this._document.createComment("dom-portal");
    portal.setAttachedHost(this);
    element.parentNode.insertBefore(anchorNode, element);
    this._getRootNode().appendChild(element);
    this._attachedPortal = portal;
    super.setDisposeFn(() => {
      if (anchorNode.parentNode) {
        anchorNode.parentNode.replaceChild(element, anchorNode);
      }
    });
  };
  /** Gets the root node of the portal outlet. */
  _getRootNode() {
    const nativeElement = this._viewContainerRef.element.nativeElement;
    return nativeElement.nodeType === nativeElement.ELEMENT_NODE ? nativeElement : nativeElement.parentNode;
  }
  static \u0275fac = function CdkPortalOutlet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkPortalOutlet)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkPortalOutlet,
    selectors: [["", "cdkPortalOutlet", ""]],
    inputs: {
      portal: [0, "cdkPortalOutlet", "portal"]
    },
    outputs: {
      attached: "attached"
    },
    exportAs: ["cdkPortalOutlet"],
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkPortalOutlet, [{
    type: Directive,
    args: [{
      selector: "[cdkPortalOutlet]",
      exportAs: "cdkPortalOutlet"
    }]
  }], () => [], {
    portal: [{
      type: Input,
      args: ["cdkPortalOutlet"]
    }],
    attached: [{
      type: Output
    }]
  });
})();
var PortalHostDirective = class _PortalHostDirective extends CdkPortalOutlet {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275PortalHostDirective_BaseFactory;
    return function PortalHostDirective_Factory(__ngFactoryType__) {
      return (\u0275PortalHostDirective_BaseFactory || (\u0275PortalHostDirective_BaseFactory = \u0275\u0275getInheritedFactory(_PortalHostDirective)))(__ngFactoryType__ || _PortalHostDirective);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _PortalHostDirective,
    selectors: [["", "cdkPortalHost", ""], ["", "portalHost", ""]],
    inputs: {
      portal: [0, "cdkPortalHost", "portal"]
    },
    exportAs: ["cdkPortalHost"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkPortalOutlet,
      useExisting: _PortalHostDirective
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PortalHostDirective, [{
    type: Directive,
    args: [{
      selector: "[cdkPortalHost], [portalHost]",
      exportAs: "cdkPortalHost",
      inputs: [{
        name: "portal",
        alias: "cdkPortalHost"
      }],
      providers: [{
        provide: CdkPortalOutlet,
        useExisting: PortalHostDirective
      }]
    }]
  }], null, null);
})();
var PortalModule = class _PortalModule {
  static \u0275fac = function PortalModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PortalModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _PortalModule,
    imports: [CdkPortal, CdkPortalOutlet, TemplatePortalDirective, PortalHostDirective],
    exports: [CdkPortal, CdkPortalOutlet, TemplatePortalDirective, PortalHostDirective]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PortalModule, [{
    type: NgModule,
    args: [{
      imports: [CdkPortal, CdkPortalOutlet, TemplatePortalDirective, PortalHostDirective],
      exports: [CdkPortal, CdkPortalOutlet, TemplatePortalDirective, PortalHostDirective]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/structural-styles.mjs
var _StructuralStylesLoader = class __StructuralStylesLoader {
  static \u0275fac = function _StructuralStylesLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __StructuralStylesLoader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: __StructuralStylesLoader,
    selectors: [["structural-styles"]],
    decls: 0,
    vars: 0,
    template: function _StructuralStylesLoader_Template(rf, ctx) {
    },
    styles: ['.mat-focus-indicator{position:relative}.mat-focus-indicator::before{top:0;left:0;right:0;bottom:0;position:absolute;box-sizing:border-box;pointer-events:none;display:var(--mat-focus-indicator-display, none);border-width:var(--mat-focus-indicator-border-width, 3px);border-style:var(--mat-focus-indicator-border-style, solid);border-color:var(--mat-focus-indicator-border-color, transparent);border-radius:var(--mat-focus-indicator-border-radius, 4px)}.mat-focus-indicator:focus::before{content:""}@media(forced-colors: active){html{--mat-focus-indicator-display: block}}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_StructuralStylesLoader, [{
    type: Component,
    args: [{
      selector: "structural-styles",
      encapsulation: ViewEncapsulation.None,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: ['.mat-focus-indicator{position:relative}.mat-focus-indicator::before{top:0;left:0;right:0;bottom:0;position:absolute;box-sizing:border-box;pointer-events:none;display:var(--mat-focus-indicator-display, none);border-width:var(--mat-focus-indicator-border-width, 3px);border-style:var(--mat-focus-indicator-border-style, solid);border-color:var(--mat-focus-indicator-border-color, transparent);border-radius:var(--mat-focus-indicator-border-radius, 4px)}.mat-focus-indicator:focus::before{content:""}@media(forced-colors: active){html{--mat-focus-indicator-display: block}}\n']
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/css-pixel-value.mjs
function coerceCssPixelValue(value) {
  if (value == null) {
    return "";
  }
  return typeof value === "string" ? value : `${value}px`;
}

// node_modules/@angular/cdk/fesm2022/coercion.mjs
function coerceBooleanProperty(value) {
  return value != null && `${value}` !== "false";
}

// node_modules/@angular/material/fesm2022/ripple.mjs
var RippleState;
(function(RippleState2) {
  RippleState2[RippleState2["FADING_IN"] = 0] = "FADING_IN";
  RippleState2[RippleState2["VISIBLE"] = 1] = "VISIBLE";
  RippleState2[RippleState2["FADING_OUT"] = 2] = "FADING_OUT";
  RippleState2[RippleState2["HIDDEN"] = 3] = "HIDDEN";
})(RippleState || (RippleState = {}));
var RippleRef = class {
  _renderer;
  element;
  config;
  _animationForciblyDisabledThroughCss;
  /** Current state of the ripple. */
  state = RippleState.HIDDEN;
  constructor(_renderer, element, config, _animationForciblyDisabledThroughCss = false) {
    this._renderer = _renderer;
    this.element = element;
    this.config = config;
    this._animationForciblyDisabledThroughCss = _animationForciblyDisabledThroughCss;
  }
  /** Fades out the ripple element. */
  fadeOut() {
    this._renderer.fadeOutRipple(this);
  }
};
var passiveCapturingEventOptions$1 = normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
var RippleEventManager = class {
  _events = /* @__PURE__ */ new Map();
  /** Adds an event handler. */
  addHandler(ngZone, name, element, handler) {
    const handlersForEvent = this._events.get(name);
    if (handlersForEvent) {
      const handlersForElement = handlersForEvent.get(element);
      if (handlersForElement) {
        handlersForElement.add(handler);
      } else {
        handlersForEvent.set(element, /* @__PURE__ */ new Set([handler]));
      }
    } else {
      this._events.set(name, /* @__PURE__ */ new Map([[element, /* @__PURE__ */ new Set([handler])]]));
      ngZone.runOutsideAngular(() => {
        document.addEventListener(name, this._delegateEventHandler, passiveCapturingEventOptions$1);
      });
    }
  }
  /** Removes an event handler. */
  removeHandler(name, element, handler) {
    const handlersForEvent = this._events.get(name);
    if (!handlersForEvent) {
      return;
    }
    const handlersForElement = handlersForEvent.get(element);
    if (!handlersForElement) {
      return;
    }
    handlersForElement.delete(handler);
    if (handlersForElement.size === 0) {
      handlersForEvent.delete(element);
    }
    if (handlersForEvent.size === 0) {
      this._events.delete(name);
      document.removeEventListener(name, this._delegateEventHandler, passiveCapturingEventOptions$1);
    }
  }
  /** Event handler that is bound and which dispatches the events to the different targets. */
  _delegateEventHandler = (event) => {
    const target = _getEventTarget(event);
    if (target) {
      this._events.get(event.type)?.forEach((handlers, element) => {
        if (element === target || element.contains(target)) {
          handlers.forEach((handler) => handler.handleEvent(event));
        }
      });
    }
  };
};
var defaultRippleAnimationConfig = {
  enterDuration: 225,
  exitDuration: 150
};
var ignoreMouseEventsTimeout = 800;
var passiveCapturingEventOptions = normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
var pointerDownEvents = ["mousedown", "touchstart"];
var pointerUpEvents = ["mouseup", "mouseleave", "touchend", "touchcancel"];
var _MatRippleStylesLoader = class __MatRippleStylesLoader {
  static \u0275fac = function _MatRippleStylesLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __MatRippleStylesLoader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: __MatRippleStylesLoader,
    selectors: [["ng-component"]],
    hostAttrs: ["mat-ripple-style-loader", ""],
    decls: 0,
    vars: 0,
    template: function _MatRippleStylesLoader_Template(rf, ctx) {
    },
    styles: [".mat-ripple{overflow:hidden;position:relative}.mat-ripple:not(:empty){transform:translateZ(0)}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;transition:opacity,transform 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale3d(0, 0, 0);background-color:var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent))}@media(forced-colors: active){.mat-ripple-element{display:none}}.cdk-drag-preview .mat-ripple-element,.cdk-drag-placeholder .mat-ripple-element{display:none}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatRippleStylesLoader, [{
    type: Component,
    args: [{
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "mat-ripple-style-loader": ""
      },
      styles: [".mat-ripple{overflow:hidden;position:relative}.mat-ripple:not(:empty){transform:translateZ(0)}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;transition:opacity,transform 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale3d(0, 0, 0);background-color:var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent))}@media(forced-colors: active){.mat-ripple-element{display:none}}.cdk-drag-preview .mat-ripple-element,.cdk-drag-placeholder .mat-ripple-element{display:none}\n"]
    }]
  }], null, null);
})();
var RippleRenderer = class _RippleRenderer {
  _target;
  _ngZone;
  _platform;
  /** Element where the ripples are being added to. */
  _containerElement;
  /** Element which triggers the ripple elements on mouse events. */
  _triggerElement;
  /** Whether the pointer is currently down or not. */
  _isPointerDown = false;
  /**
   * Map of currently active ripple references.
   * The ripple reference is mapped to its element event listeners.
   * The reason why `| null` is used is that event listeners are added only
   * when the condition is truthy (see the `_startFadeOutTransition` method).
   */
  _activeRipples = /* @__PURE__ */ new Map();
  /** Latest non-persistent ripple that was triggered. */
  _mostRecentTransientRipple;
  /** Time in milliseconds when the last touchstart event happened. */
  _lastTouchStartEvent;
  /** Whether pointer-up event listeners have been registered. */
  _pointerUpEventsRegistered = false;
  /**
   * Cached dimensions of the ripple container. Set when the first
   * ripple is shown and cleared once no more ripples are visible.
   */
  _containerRect;
  static _eventManager = new RippleEventManager();
  constructor(_target, _ngZone, elementOrElementRef, _platform, injector) {
    this._target = _target;
    this._ngZone = _ngZone;
    this._platform = _platform;
    if (_platform.isBrowser) {
      this._containerElement = coerceElement(elementOrElementRef);
    }
    if (injector) {
      injector.get(_CdkPrivateStyleLoader).load(_MatRippleStylesLoader);
    }
  }
  /**
   * Fades in a ripple at the given coordinates.
   * @param x Coordinate within the element, along the X axis at which to start the ripple.
   * @param y Coordinate within the element, along the Y axis at which to start the ripple.
   * @param config Extra ripple options.
   */
  fadeInRipple(x, y, config = {}) {
    const containerRect = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect();
    const animationConfig = __spreadValues(__spreadValues({}, defaultRippleAnimationConfig), config.animation);
    if (config.centered) {
      x = containerRect.left + containerRect.width / 2;
      y = containerRect.top + containerRect.height / 2;
    }
    const radius = config.radius || distanceToFurthestCorner(x, y, containerRect);
    const offsetX = x - containerRect.left;
    const offsetY = y - containerRect.top;
    const enterDuration = animationConfig.enterDuration;
    const ripple = document.createElement("div");
    ripple.classList.add("mat-ripple-element");
    ripple.style.left = `${offsetX - radius}px`;
    ripple.style.top = `${offsetY - radius}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.width = `${radius * 2}px`;
    if (config.color != null) {
      ripple.style.backgroundColor = config.color;
    }
    ripple.style.transitionDuration = `${enterDuration}ms`;
    this._containerElement.appendChild(ripple);
    const computedStyles = window.getComputedStyle(ripple);
    const userTransitionProperty = computedStyles.transitionProperty;
    const userTransitionDuration = computedStyles.transitionDuration;
    const animationForciblyDisabledThroughCss = userTransitionProperty === "none" || // Note: The canonical unit for serialized CSS `<time>` properties is seconds. Additionally
    // some browsers expand the duration for every property (in our case `opacity` and `transform`).
    userTransitionDuration === "0s" || userTransitionDuration === "0s, 0s" || // If the container is 0x0, it's likely `display: none`.
    containerRect.width === 0 && containerRect.height === 0;
    const rippleRef = new RippleRef(this, ripple, config, animationForciblyDisabledThroughCss);
    ripple.style.transform = "scale3d(1, 1, 1)";
    rippleRef.state = RippleState.FADING_IN;
    if (!config.persistent) {
      this._mostRecentTransientRipple = rippleRef;
    }
    let eventListeners = null;
    if (!animationForciblyDisabledThroughCss && (enterDuration || animationConfig.exitDuration)) {
      this._ngZone.runOutsideAngular(() => {
        const onTransitionEnd = () => {
          if (eventListeners) {
            eventListeners.fallbackTimer = null;
          }
          clearTimeout(fallbackTimer);
          this._finishRippleTransition(rippleRef);
        };
        const onTransitionCancel = () => this._destroyRipple(rippleRef);
        const fallbackTimer = setTimeout(onTransitionCancel, enterDuration + 100);
        ripple.addEventListener("transitionend", onTransitionEnd);
        ripple.addEventListener("transitioncancel", onTransitionCancel);
        eventListeners = {
          onTransitionEnd,
          onTransitionCancel,
          fallbackTimer
        };
      });
    }
    this._activeRipples.set(rippleRef, eventListeners);
    if (animationForciblyDisabledThroughCss || !enterDuration) {
      this._finishRippleTransition(rippleRef);
    }
    return rippleRef;
  }
  /** Fades out a ripple reference. */
  fadeOutRipple(rippleRef) {
    if (rippleRef.state === RippleState.FADING_OUT || rippleRef.state === RippleState.HIDDEN) {
      return;
    }
    const rippleEl = rippleRef.element;
    const animationConfig = __spreadValues(__spreadValues({}, defaultRippleAnimationConfig), rippleRef.config.animation);
    rippleEl.style.transitionDuration = `${animationConfig.exitDuration}ms`;
    rippleEl.style.opacity = "0";
    rippleRef.state = RippleState.FADING_OUT;
    if (rippleRef._animationForciblyDisabledThroughCss || !animationConfig.exitDuration) {
      this._finishRippleTransition(rippleRef);
    }
  }
  /** Fades out all currently active ripples. */
  fadeOutAll() {
    this._getActiveRipples().forEach((ripple) => ripple.fadeOut());
  }
  /** Fades out all currently active non-persistent ripples. */
  fadeOutAllNonPersistent() {
    this._getActiveRipples().forEach((ripple) => {
      if (!ripple.config.persistent) {
        ripple.fadeOut();
      }
    });
  }
  /** Sets up the trigger event listeners */
  setupTriggerEvents(elementOrElementRef) {
    const element = coerceElement(elementOrElementRef);
    if (!this._platform.isBrowser || !element || element === this._triggerElement) {
      return;
    }
    this._removeTriggerEvents();
    this._triggerElement = element;
    pointerDownEvents.forEach((type) => {
      _RippleRenderer._eventManager.addHandler(this._ngZone, type, element, this);
    });
  }
  /**
   * Handles all registered events.
   * @docs-private
   */
  handleEvent(event) {
    if (event.type === "mousedown") {
      this._onMousedown(event);
    } else if (event.type === "touchstart") {
      this._onTouchStart(event);
    } else {
      this._onPointerUp();
    }
    if (!this._pointerUpEventsRegistered) {
      this._ngZone.runOutsideAngular(() => {
        pointerUpEvents.forEach((type) => {
          this._triggerElement.addEventListener(type, this, passiveCapturingEventOptions);
        });
      });
      this._pointerUpEventsRegistered = true;
    }
  }
  /** Method that will be called if the fade-in or fade-in transition completed. */
  _finishRippleTransition(rippleRef) {
    if (rippleRef.state === RippleState.FADING_IN) {
      this._startFadeOutTransition(rippleRef);
    } else if (rippleRef.state === RippleState.FADING_OUT) {
      this._destroyRipple(rippleRef);
    }
  }
  /**
   * Starts the fade-out transition of the given ripple if it's not persistent and the pointer
   * is not held down anymore.
   */
  _startFadeOutTransition(rippleRef) {
    const isMostRecentTransientRipple = rippleRef === this._mostRecentTransientRipple;
    const {
      persistent
    } = rippleRef.config;
    rippleRef.state = RippleState.VISIBLE;
    if (!persistent && (!isMostRecentTransientRipple || !this._isPointerDown)) {
      rippleRef.fadeOut();
    }
  }
  /** Destroys the given ripple by removing it from the DOM and updating its state. */
  _destroyRipple(rippleRef) {
    const eventListeners = this._activeRipples.get(rippleRef) ?? null;
    this._activeRipples.delete(rippleRef);
    if (!this._activeRipples.size) {
      this._containerRect = null;
    }
    if (rippleRef === this._mostRecentTransientRipple) {
      this._mostRecentTransientRipple = null;
    }
    rippleRef.state = RippleState.HIDDEN;
    if (eventListeners !== null) {
      rippleRef.element.removeEventListener("transitionend", eventListeners.onTransitionEnd);
      rippleRef.element.removeEventListener("transitioncancel", eventListeners.onTransitionCancel);
      if (eventListeners.fallbackTimer !== null) {
        clearTimeout(eventListeners.fallbackTimer);
      }
    }
    rippleRef.element.remove();
  }
  /** Function being called whenever the trigger is being pressed using mouse. */
  _onMousedown(event) {
    const isFakeMousedown = isFakeMousedownFromScreenReader(event);
    const isSyntheticEvent = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;
    if (!this._target.rippleDisabled && !isFakeMousedown && !isSyntheticEvent) {
      this._isPointerDown = true;
      this.fadeInRipple(event.clientX, event.clientY, this._target.rippleConfig);
    }
  }
  /** Function being called whenever the trigger is being pressed using touch. */
  _onTouchStart(event) {
    if (!this._target.rippleDisabled && !isFakeTouchstartFromScreenReader(event)) {
      this._lastTouchStartEvent = Date.now();
      this._isPointerDown = true;
      const touches = event.changedTouches;
      if (touches) {
        for (let i = 0; i < touches.length; i++) {
          this.fadeInRipple(touches[i].clientX, touches[i].clientY, this._target.rippleConfig);
        }
      }
    }
  }
  /** Function being called whenever the trigger is being released. */
  _onPointerUp() {
    if (!this._isPointerDown) {
      return;
    }
    this._isPointerDown = false;
    this._getActiveRipples().forEach((ripple) => {
      const isVisible = ripple.state === RippleState.VISIBLE || ripple.config.terminateOnPointerUp && ripple.state === RippleState.FADING_IN;
      if (!ripple.config.persistent && isVisible) {
        ripple.fadeOut();
      }
    });
  }
  _getActiveRipples() {
    return Array.from(this._activeRipples.keys());
  }
  /** Removes previously registered event listeners from the trigger element. */
  _removeTriggerEvents() {
    const trigger2 = this._triggerElement;
    if (trigger2) {
      pointerDownEvents.forEach((type) => _RippleRenderer._eventManager.removeHandler(type, trigger2, this));
      if (this._pointerUpEventsRegistered) {
        pointerUpEvents.forEach((type) => trigger2.removeEventListener(type, this, passiveCapturingEventOptions));
        this._pointerUpEventsRegistered = false;
      }
    }
  }
};
function distanceToFurthestCorner(x, y, rect) {
  const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
  const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
  return Math.sqrt(distX * distX + distY * distY);
}
var MAT_RIPPLE_GLOBAL_OPTIONS = new InjectionToken("mat-ripple-global-options");
var MatRipple = class _MatRipple {
  _elementRef = inject(ElementRef);
  _animationsDisabled = _animationsDisabled();
  /** Custom color for all ripples. */
  color;
  /** Whether the ripples should be visible outside the component's bounds. */
  unbounded;
  /**
   * Whether the ripple always originates from the center of the host element's bounds, rather
   * than originating from the location of the click event.
   */
  centered;
  /**
   * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
   * will be the distance from the center of the ripple to the furthest corner of the host element's
   * bounding rectangle.
   */
  radius = 0;
  /**
   * Configuration for the ripple animation. Allows modifying the enter and exit animation
   * duration of the ripples. The animation durations will be overwritten if the
   * `NoopAnimationsModule` is being used.
   */
  animation;
  /**
   * Whether click events will not trigger the ripple. Ripples can be still launched manually
   * by using the `launch()` method.
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    if (value) {
      this.fadeOutAllNonPersistent();
    }
    this._disabled = value;
    this._setupTriggerEventsIfEnabled();
  }
  _disabled = false;
  /**
   * The element that triggers the ripple when click events are received.
   * Defaults to the directive's host element.
   */
  get trigger() {
    return this._trigger || this._elementRef.nativeElement;
  }
  set trigger(trigger2) {
    this._trigger = trigger2;
    this._setupTriggerEventsIfEnabled();
  }
  _trigger;
  /** Renderer for the ripple DOM manipulations. */
  _rippleRenderer;
  /** Options that are set globally for all ripples. */
  _globalOptions;
  /** @docs-private Whether ripple directive is initialized and the input bindings are set. */
  _isInitialized = false;
  constructor() {
    const ngZone = inject(NgZone);
    const platform = inject(Platform);
    const globalOptions = inject(MAT_RIPPLE_GLOBAL_OPTIONS, {
      optional: true
    });
    const injector = inject(Injector);
    this._globalOptions = globalOptions || {};
    this._rippleRenderer = new RippleRenderer(this, ngZone, this._elementRef, platform, injector);
  }
  ngOnInit() {
    this._isInitialized = true;
    this._setupTriggerEventsIfEnabled();
  }
  ngOnDestroy() {
    this._rippleRenderer._removeTriggerEvents();
  }
  /** Fades out all currently showing ripple elements. */
  fadeOutAll() {
    this._rippleRenderer.fadeOutAll();
  }
  /** Fades out all currently showing non-persistent ripple elements. */
  fadeOutAllNonPersistent() {
    this._rippleRenderer.fadeOutAllNonPersistent();
  }
  /**
   * Ripple configuration from the directive's input values.
   * @docs-private Implemented as part of RippleTarget
   */
  get rippleConfig() {
    return {
      centered: this.centered,
      radius: this.radius,
      color: this.color,
      animation: __spreadValues(__spreadValues(__spreadValues({}, this._globalOptions.animation), this._animationsDisabled ? {
        enterDuration: 0,
        exitDuration: 0
      } : {}), this.animation),
      terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
    };
  }
  /**
   * Whether ripples on pointer-down are disabled or not.
   * @docs-private Implemented as part of RippleTarget
   */
  get rippleDisabled() {
    return this.disabled || !!this._globalOptions.disabled;
  }
  /** Sets up the trigger event listeners if ripples are enabled. */
  _setupTriggerEventsIfEnabled() {
    if (!this.disabled && this._isInitialized) {
      this._rippleRenderer.setupTriggerEvents(this.trigger);
    }
  }
  /** Launches a manual ripple at the specified coordinated or just by the ripple config. */
  launch(configOrX, y = 0, config) {
    if (typeof configOrX === "number") {
      return this._rippleRenderer.fadeInRipple(configOrX, y, __spreadValues(__spreadValues({}, this.rippleConfig), config));
    } else {
      return this._rippleRenderer.fadeInRipple(0, 0, __spreadValues(__spreadValues({}, this.rippleConfig), configOrX));
    }
  }
  static \u0275fac = function MatRipple_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatRipple)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatRipple,
    selectors: [["", "mat-ripple", ""], ["", "matRipple", ""]],
    hostAttrs: [1, "mat-ripple"],
    hostVars: 2,
    hostBindings: function MatRipple_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-ripple-unbounded", ctx.unbounded);
      }
    },
    inputs: {
      color: [0, "matRippleColor", "color"],
      unbounded: [0, "matRippleUnbounded", "unbounded"],
      centered: [0, "matRippleCentered", "centered"],
      radius: [0, "matRippleRadius", "radius"],
      animation: [0, "matRippleAnimation", "animation"],
      disabled: [0, "matRippleDisabled", "disabled"],
      trigger: [0, "matRippleTrigger", "trigger"]
    },
    exportAs: ["matRipple"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRipple, [{
    type: Directive,
    args: [{
      selector: "[mat-ripple], [matRipple]",
      exportAs: "matRipple",
      host: {
        "class": "mat-ripple",
        "[class.mat-ripple-unbounded]": "unbounded"
      }
    }]
  }], () => [], {
    color: [{
      type: Input,
      args: ["matRippleColor"]
    }],
    unbounded: [{
      type: Input,
      args: ["matRippleUnbounded"]
    }],
    centered: [{
      type: Input,
      args: ["matRippleCentered"]
    }],
    radius: [{
      type: Input,
      args: ["matRippleRadius"]
    }],
    animation: [{
      type: Input,
      args: ["matRippleAnimation"]
    }],
    disabled: [{
      type: Input,
      args: ["matRippleDisabled"]
    }],
    trigger: [{
      type: Input,
      args: ["matRippleTrigger"]
    }]
  });
})();

// node_modules/@angular/material/fesm2022/tabs.mjs
var _c02 = ["*"];
function MatTab_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
var _c12 = ["tabListContainer"];
var _c2 = ["tabList"];
var _c3 = ["tabListInner"];
var _c4 = ["nextPaginator"];
var _c5 = ["previousPaginator"];
var _c6 = ["content"];
function MatTabBody_ng_template_2_Template(rf, ctx) {
}
var _c7 = ["tabBodyWrapper"];
var _c8 = ["tabHeader"];
function MatTabGroup_For_3_Conditional_6_ng_template_0_Template(rf, ctx) {
}
function MatTabGroup_For_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatTabGroup_For_3_Conditional_6_ng_template_0_Template, 0, 0, "ng-template", 12);
  }
  if (rf & 2) {
    const tab_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("cdkPortalOutlet", tab_r4.templateLabel);
  }
}
function MatTabGroup_For_3_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const tab_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate(tab_r4.textLabel);
  }
}
function MatTabGroup_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7, 2);
    \u0275\u0275listener("click", function MatTabGroup_For_3_Template_div_click_0_listener() {
      const ctx_r2 = \u0275\u0275restoreView(_r2);
      const tab_r4 = ctx_r2.$implicit;
      const $index_r5 = ctx_r2.$index;
      const ctx_r5 = \u0275\u0275nextContext();
      const tabHeader_r7 = \u0275\u0275reference(1);
      return \u0275\u0275resetView(ctx_r5._handleClick(tab_r4, tabHeader_r7, $index_r5));
    })("cdkFocusChange", function MatTabGroup_For_3_Template_div_cdkFocusChange_0_listener($event) {
      const $index_r5 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5._tabFocusChanged($event, $index_r5));
    });
    \u0275\u0275element(2, "span", 8)(3, "div", 9);
    \u0275\u0275elementStart(4, "span", 10)(5, "span", 11);
    \u0275\u0275conditionalCreate(6, MatTabGroup_For_3_Conditional_6_Template, 1, 1, null, 12)(7, MatTabGroup_For_3_Conditional_7_Template, 1, 1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    const $index_r5 = ctx.$index;
    const tabNode_r8 = \u0275\u0275reference(1);
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275classMap(tab_r4.labelClass);
    \u0275\u0275classProp("mdc-tab--active", ctx_r5.selectedIndex === $index_r5);
    \u0275\u0275property("id", ctx_r5._getTabLabelId(tab_r4, $index_r5))("disabled", tab_r4.disabled)("fitInkBarToContent", ctx_r5.fitInkBarToContent);
    \u0275\u0275attribute("tabIndex", ctx_r5._getTabIndex($index_r5))("aria-posinset", $index_r5 + 1)("aria-setsize", ctx_r5._tabs.length)("aria-controls", ctx_r5._getTabContentId($index_r5))("aria-selected", ctx_r5.selectedIndex === $index_r5)("aria-label", tab_r4.ariaLabel || null)("aria-labelledby", !tab_r4.ariaLabel && tab_r4.ariaLabelledby ? tab_r4.ariaLabelledby : null);
    \u0275\u0275advance(3);
    \u0275\u0275property("matRippleTrigger", tabNode_r8)("matRippleDisabled", tab_r4.disabled || ctx_r5.disableRipple);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(tab_r4.templateLabel ? 6 : 7);
  }
}
function MatTabGroup_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function MatTabGroup_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-tab-body", 13);
    \u0275\u0275listener("_onCentered", function MatTabGroup_For_8_Template_mat_tab_body__onCentered_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5._removeTabBodyWrapperHeight());
    })("_onCentering", function MatTabGroup_For_8_Template_mat_tab_body__onCentering_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5._setTabBodyWrapperHeight($event));
    })("_beforeCentering", function MatTabGroup_For_8_Template_mat_tab_body__beforeCentering_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5._bodyCentered($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r10 = ctx.$implicit;
    const $index_r11 = ctx.$index;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275classMap(tab_r10.bodyClass);
    \u0275\u0275property("id", ctx_r5._getTabContentId($index_r11))("content", tab_r10.content)("position", tab_r10.position)("animationDuration", ctx_r5.animationDuration)("preserveContent", ctx_r5.preserveContent);
    \u0275\u0275attribute("tabindex", ctx_r5.contentTabIndex != null && ctx_r5.selectedIndex === $index_r11 ? ctx_r5.contentTabIndex : null)("aria-labelledby", ctx_r5._getTabLabelId(tab_r10, $index_r11))("aria-hidden", ctx_r5.selectedIndex !== $index_r11);
  }
}
var _c9 = ["mat-tab-nav-bar", ""];
var _c10 = ["mat-tab-link", ""];
var MAT_TAB_CONTENT = new InjectionToken("MatTabContent");
var MatTabContent = class _MatTabContent {
  template = inject(TemplateRef);
  constructor() {
  }
  static \u0275fac = function MatTabContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTabContent)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTabContent,
    selectors: [["", "matTabContent", ""]],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_TAB_CONTENT,
      useExisting: _MatTabContent
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabContent, [{
    type: Directive,
    args: [{
      selector: "[matTabContent]",
      providers: [{
        provide: MAT_TAB_CONTENT,
        useExisting: MatTabContent
      }]
    }]
  }], () => [], null);
})();
var MAT_TAB_LABEL = new InjectionToken("MatTabLabel");
var MAT_TAB = new InjectionToken("MAT_TAB");
var MatTabLabel = class _MatTabLabel extends CdkPortal {
  _closestTab = inject(MAT_TAB, {
    optional: true
  });
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatTabLabel_BaseFactory;
    return function MatTabLabel_Factory(__ngFactoryType__) {
      return (\u0275MatTabLabel_BaseFactory || (\u0275MatTabLabel_BaseFactory = \u0275\u0275getInheritedFactory(_MatTabLabel)))(__ngFactoryType__ || _MatTabLabel);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTabLabel,
    selectors: [["", "mat-tab-label", ""], ["", "matTabLabel", ""]],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_TAB_LABEL,
      useExisting: _MatTabLabel
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabLabel, [{
    type: Directive,
    args: [{
      selector: "[mat-tab-label], [matTabLabel]",
      providers: [{
        provide: MAT_TAB_LABEL,
        useExisting: MatTabLabel
      }]
    }]
  }], null, null);
})();
var MAT_TAB_GROUP = new InjectionToken("MAT_TAB_GROUP");
var MatTab = class _MatTab {
  _viewContainerRef = inject(ViewContainerRef);
  _closestTabGroup = inject(MAT_TAB_GROUP, {
    optional: true
  });
  /** whether the tab is disabled. */
  disabled = false;
  /** Content for the tab label given by `<ng-template mat-tab-label>`. */
  get templateLabel() {
    return this._templateLabel;
  }
  set templateLabel(value) {
    this._setTemplateLabelInput(value);
  }
  _templateLabel;
  /**
   * Template provided in the tab content that will be used if present, used to enable lazy-loading
   */
  _explicitContent = void 0;
  /** Template inside the MatTab view that contains an `<ng-content>`. */
  _implicitContent;
  /** Plain text label for the tab, used when there is no template label. */
  textLabel = "";
  /** Aria label for the tab. */
  ariaLabel;
  /**
   * Reference to the element that the tab is labelled by.
   * Will be cleared if `aria-label` is set at the same time.
   */
  ariaLabelledby;
  /** Classes to be passed to the tab label inside the mat-tab-header container. */
  labelClass;
  /** Classes to be passed to the tab mat-tab-body container. */
  bodyClass;
  /**
   * Custom ID for the tab, overriding the auto-generated one by Material.
   * Note that when using this input, it's your responsibility to ensure that the ID is unique.
   */
  id = null;
  /** Portal that will be the hosted content of the tab */
  _contentPortal = null;
  /** @docs-private */
  get content() {
    return this._contentPortal;
  }
  /** Emits whenever the internal state of the tab changes. */
  _stateChanges = new Subject();
  /**
   * The relatively indexed position where 0 represents the center, negative is left, and positive
   * represents the right.
   */
  position = null;
  // TODO(crisbeto): we no longer use this, but some internal apps appear to rely on it.
  /**
   * The initial relatively index origin of the tab if it was created and selected after there
   * was already a selected tab. Provides context of what position the tab should originate from.
   */
  origin = null;
  /**
   * Whether the tab is currently active.
   */
  isActive = false;
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
  }
  ngOnChanges(changes) {
    if (changes.hasOwnProperty("textLabel") || changes.hasOwnProperty("disabled")) {
      this._stateChanges.next();
    }
  }
  ngOnDestroy() {
    this._stateChanges.complete();
  }
  ngOnInit() {
    this._contentPortal = new TemplatePortal(this._explicitContent || this._implicitContent, this._viewContainerRef);
  }
  /**
   * This has been extracted to a util because of TS 4 and VE.
   * View Engine doesn't support property rename inheritance.
   * TS 4.0 doesn't allow properties to override accessors or vice-versa.
   * @docs-private
   */
  _setTemplateLabelInput(value) {
    if (value && value._closestTab === this) {
      this._templateLabel = value;
    }
  }
  static \u0275fac = function MatTab_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTab)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatTab,
    selectors: [["mat-tab"]],
    contentQueries: function MatTab_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatTabLabel, 5);
        \u0275\u0275contentQuery(dirIndex, MatTabContent, 7, TemplateRef);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templateLabel = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._explicitContent = _t.first);
      }
    },
    viewQuery: function MatTab_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(TemplateRef, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._implicitContent = _t.first);
      }
    },
    hostAttrs: ["hidden", ""],
    hostVars: 1,
    hostBindings: function MatTab_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("id", null);
      }
    },
    inputs: {
      disabled: [2, "disabled", "disabled", booleanAttribute],
      textLabel: [0, "label", "textLabel"],
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
      labelClass: "labelClass",
      bodyClass: "bodyClass",
      id: "id"
    },
    exportAs: ["matTab"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_TAB,
      useExisting: _MatTab
    }]), \u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c02,
    decls: 1,
    vars: 0,
    template: function MatTab_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domTemplate(0, MatTab_ng_template_0_Template, 1, 0, "ng-template");
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTab, [{
    type: Component,
    args: [{
      selector: "mat-tab",
      changeDetection: ChangeDetectionStrategy.Default,
      encapsulation: ViewEncapsulation.None,
      exportAs: "matTab",
      providers: [{
        provide: MAT_TAB,
        useExisting: MatTab
      }],
      host: {
        // This element will be rendered on the server in order to support hydration.
        // Hide it so it doesn't cause a layout shift when it's removed on the client.
        "hidden": "",
        // Clear any custom IDs from the tab since they'll be forwarded to the actual tab.
        "[attr.id]": "null"
      },
      template: "<!-- Create a template for the content of the <mat-tab> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the tab content in the appropriate place in the\n    tab-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n"
    }]
  }], () => [], {
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    templateLabel: [{
      type: ContentChild,
      args: [MatTabLabel]
    }],
    _explicitContent: [{
      type: ContentChild,
      args: [MatTabContent, {
        read: TemplateRef,
        static: true
      }]
    }],
    _implicitContent: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    textLabel: [{
      type: Input,
      args: ["label"]
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    labelClass: [{
      type: Input
    }],
    bodyClass: [{
      type: Input
    }],
    id: [{
      type: Input
    }]
  });
})();
var ACTIVE_CLASS = "mdc-tab-indicator--active";
var NO_TRANSITION_CLASS = "mdc-tab-indicator--no-transition";
var MatInkBar = class {
  _items;
  /** Item to which the ink bar is aligned currently. */
  _currentItem;
  constructor(_items) {
    this._items = _items;
  }
  /** Hides the ink bar. */
  hide() {
    this._items.forEach((item) => item.deactivateInkBar());
    this._currentItem = void 0;
  }
  /** Aligns the ink bar to a DOM node. */
  alignToElement(element) {
    const correspondingItem = this._items.find((item) => item.elementRef.nativeElement === element);
    const currentItem = this._currentItem;
    if (correspondingItem === currentItem) {
      return;
    }
    currentItem?.deactivateInkBar();
    if (correspondingItem) {
      const domRect = currentItem?.elementRef.nativeElement.getBoundingClientRect?.();
      correspondingItem.activateInkBar(domRect);
      this._currentItem = correspondingItem;
    }
  }
};
var InkBarItem = class _InkBarItem {
  _elementRef = inject(ElementRef);
  _inkBarElement;
  _inkBarContentElement;
  _fitToContent = false;
  /** Whether the ink bar should fit to the entire tab or just its content. */
  get fitInkBarToContent() {
    return this._fitToContent;
  }
  set fitInkBarToContent(newValue) {
    if (this._fitToContent !== newValue) {
      this._fitToContent = newValue;
      if (this._inkBarElement) {
        this._appendInkBarElement();
      }
    }
  }
  /** Aligns the ink bar to the current item. */
  activateInkBar(previousIndicatorClientRect) {
    const element = this._elementRef.nativeElement;
    if (!previousIndicatorClientRect || !element.getBoundingClientRect || !this._inkBarContentElement) {
      element.classList.add(ACTIVE_CLASS);
      return;
    }
    const currentClientRect = element.getBoundingClientRect();
    const widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
    const xPosition = previousIndicatorClientRect.left - currentClientRect.left;
    element.classList.add(NO_TRANSITION_CLASS);
    this._inkBarContentElement.style.setProperty("transform", `translateX(${xPosition}px) scaleX(${widthDelta})`);
    element.getBoundingClientRect();
    element.classList.remove(NO_TRANSITION_CLASS);
    element.classList.add(ACTIVE_CLASS);
    this._inkBarContentElement.style.setProperty("transform", "");
  }
  /** Removes the ink bar from the current item. */
  deactivateInkBar() {
    this._elementRef.nativeElement.classList.remove(ACTIVE_CLASS);
  }
  /** Initializes the foundation. */
  ngOnInit() {
    this._createInkBarElement();
  }
  /** Destroys the foundation. */
  ngOnDestroy() {
    this._inkBarElement?.remove();
    this._inkBarElement = this._inkBarContentElement = null;
  }
  /** Creates and appends the ink bar element. */
  _createInkBarElement() {
    const documentNode = this._elementRef.nativeElement.ownerDocument || document;
    const inkBarElement = this._inkBarElement = documentNode.createElement("span");
    const inkBarContentElement = this._inkBarContentElement = documentNode.createElement("span");
    inkBarElement.className = "mdc-tab-indicator";
    inkBarContentElement.className = "mdc-tab-indicator__content mdc-tab-indicator__content--underline";
    inkBarElement.appendChild(this._inkBarContentElement);
    this._appendInkBarElement();
  }
  /**
   * Appends the ink bar to the tab host element or content, depending on whether
   * the ink bar should fit to content.
   */
  _appendInkBarElement() {
    if (!this._inkBarElement && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("Ink bar element has not been created and cannot be appended");
    }
    const parentElement = this._fitToContent ? this._elementRef.nativeElement.querySelector(".mdc-tab__content") : this._elementRef.nativeElement;
    if (!parentElement && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("Missing element to host the ink bar");
    }
    parentElement.appendChild(this._inkBarElement);
  }
  static \u0275fac = function InkBarItem_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InkBarItem)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _InkBarItem,
    inputs: {
      fitInkBarToContent: [2, "fitInkBarToContent", "fitInkBarToContent", booleanAttribute]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InkBarItem, [{
    type: Directive
  }], null, {
    fitInkBarToContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
function _MAT_INK_BAR_POSITIONER_FACTORY() {
  const method = (element) => ({
    left: element ? (element.offsetLeft || 0) + "px" : "0",
    width: element ? (element.offsetWidth || 0) + "px" : "0"
  });
  return method;
}
var _MAT_INK_BAR_POSITIONER = new InjectionToken("MatInkBarPositioner", {
  providedIn: "root",
  factory: _MAT_INK_BAR_POSITIONER_FACTORY
});
var MatTabLabelWrapper = class _MatTabLabelWrapper extends InkBarItem {
  elementRef = inject(ElementRef);
  /** Whether the tab is disabled. */
  disabled = false;
  /** Sets focus on the wrapper element */
  focus() {
    this.elementRef.nativeElement.focus();
  }
  getOffsetLeft() {
    return this.elementRef.nativeElement.offsetLeft;
  }
  getOffsetWidth() {
    return this.elementRef.nativeElement.offsetWidth;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatTabLabelWrapper_BaseFactory;
    return function MatTabLabelWrapper_Factory(__ngFactoryType__) {
      return (\u0275MatTabLabelWrapper_BaseFactory || (\u0275MatTabLabelWrapper_BaseFactory = \u0275\u0275getInheritedFactory(_MatTabLabelWrapper)))(__ngFactoryType__ || _MatTabLabelWrapper);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTabLabelWrapper,
    selectors: [["", "matTabLabelWrapper", ""]],
    hostVars: 3,
    hostBindings: function MatTabLabelWrapper_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-disabled", !!ctx.disabled);
        \u0275\u0275classProp("mat-mdc-tab-disabled", ctx.disabled);
      }
    },
    inputs: {
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabLabelWrapper, [{
    type: Directive,
    args: [{
      selector: "[matTabLabelWrapper]",
      host: {
        "[class.mat-mdc-tab-disabled]": "disabled",
        "[attr.aria-disabled]": "!!disabled"
      }
    }]
  }], null, {
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var passiveEventListenerOptions = {
  passive: true
};
var HEADER_SCROLL_DELAY = 650;
var HEADER_SCROLL_INTERVAL = 100;
var MatPaginatedTabHeader = class _MatPaginatedTabHeader {
  _elementRef = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _viewportRuler = inject(ViewportRuler);
  _dir = inject(Directionality, {
    optional: true
  });
  _ngZone = inject(NgZone);
  _platform = inject(Platform);
  _sharedResizeObserver = inject(SharedResizeObserver);
  _injector = inject(Injector);
  _renderer = inject(Renderer2);
  _animationsDisabled = _animationsDisabled();
  _eventCleanups;
  /** The distance in pixels that the tab labels should be translated to the left. */
  _scrollDistance = 0;
  /** Whether the header should scroll to the selected index after the view has been checked. */
  _selectedIndexChanged = false;
  /** Emits when the component is destroyed. */
  _destroyed = new Subject();
  /** Whether the controls for pagination should be displayed */
  _showPaginationControls = false;
  /** Whether the tab list can be scrolled more towards the end of the tab label list. */
  _disableScrollAfter = true;
  /** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
  _disableScrollBefore = true;
  /**
   * The number of tab labels that are displayed on the header. When this changes, the header
   * should re-evaluate the scroll position.
   */
  _tabLabelCount;
  /** Whether the scroll distance has changed and should be applied after the view is checked. */
  _scrollDistanceChanged;
  /** Used to manage focus between the tabs. */
  _keyManager;
  /** Cached text content of the header. */
  _currentTextContent;
  /** Stream that will stop the automated scrolling. */
  _stopScrolling = new Subject();
  /**
   * Whether pagination should be disabled. This can be used to avoid unnecessary
   * layout recalculations if it's known that pagination won't be required.
   */
  disablePagination = false;
  /** The index of the active tab. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(v) {
    const value = isNaN(v) ? 0 : v;
    if (this._selectedIndex != value) {
      this._selectedIndexChanged = true;
      this._selectedIndex = value;
      if (this._keyManager) {
        this._keyManager.updateActiveItem(value);
      }
    }
  }
  _selectedIndex = 0;
  /** Event emitted when the option is selected. */
  selectFocusedIndex = new EventEmitter();
  /** Event emitted when a label is focused. */
  indexFocused = new EventEmitter();
  constructor() {
    this._eventCleanups = this._ngZone.runOutsideAngular(() => [this._renderer.listen(this._elementRef.nativeElement, "mouseleave", () => this._stopInterval())]);
  }
  ngAfterViewInit() {
    this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement, "touchstart", () => this._handlePaginatorPress("before"), passiveEventListenerOptions), this._renderer.listen(this._nextPaginator.nativeElement, "touchstart", () => this._handlePaginatorPress("after"), passiveEventListenerOptions));
  }
  ngAfterContentInit() {
    const dirChange = this._dir ? this._dir.change : of("ltr");
    const resize = this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(debounceTime(32), takeUntil(this._destroyed));
    const viewportResize = this._viewportRuler.change(150).pipe(takeUntil(this._destroyed));
    const realign = () => {
      this.updatePagination();
      this._alignInkBarToSelectedTab();
    };
    this._keyManager = new FocusKeyManager(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(() => false);
    this._keyManager.updateActiveItem(Math.max(this._selectedIndex, 0));
    afterNextRender(realign, {
      injector: this._injector
    });
    merge(dirChange, viewportResize, resize, this._items.changes, this._itemsResized()).pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._ngZone.run(() => {
        Promise.resolve().then(() => {
          this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), this._scrollDistance));
          realign();
        });
      });
      this._keyManager?.withHorizontalOrientation(this._getLayoutDirection());
    });
    this._keyManager.change.subscribe((newFocusIndex) => {
      this.indexFocused.emit(newFocusIndex);
      this._setTabFocus(newFocusIndex);
    });
  }
  /** Sends any changes that could affect the layout of the items. */
  _itemsResized() {
    if (typeof ResizeObserver !== "function") {
      return EMPTY;
    }
    return this._items.changes.pipe(
      startWith(this._items),
      switchMap((tabItems) => new Observable((observer) => this._ngZone.runOutsideAngular(() => {
        const resizeObserver = new ResizeObserver((entries) => observer.next(entries));
        tabItems.forEach((item) => resizeObserver.observe(item.elementRef.nativeElement));
        return () => {
          resizeObserver.disconnect();
        };
      }))),
      // Skip the first emit since the resize observer emits when an item
      // is observed for new items when the tab is already inserted
      skip(1),
      // Skip emissions where all the elements are invisible since we don't want
      // the header to try and re-render with invalid measurements. See #25574.
      filter((entries) => entries.some((e) => e.contentRect.width > 0 && e.contentRect.height > 0))
    );
  }
  ngAfterContentChecked() {
    if (this._tabLabelCount != this._items.length) {
      this.updatePagination();
      this._tabLabelCount = this._items.length;
      this._changeDetectorRef.markForCheck();
    }
    if (this._selectedIndexChanged) {
      this._scrollToLabel(this._selectedIndex);
      this._checkScrollingControls();
      this._alignInkBarToSelectedTab();
      this._selectedIndexChanged = false;
      this._changeDetectorRef.markForCheck();
    }
    if (this._scrollDistanceChanged) {
      this._updateTabScrollPosition();
      this._scrollDistanceChanged = false;
      this._changeDetectorRef.markForCheck();
    }
  }
  ngOnDestroy() {
    this._eventCleanups.forEach((cleanup) => cleanup());
    this._keyManager?.destroy();
    this._destroyed.next();
    this._destroyed.complete();
    this._stopScrolling.complete();
  }
  /** Handles keyboard events on the header. */
  _handleKeydown(event) {
    if (hasModifierKey(event)) {
      return;
    }
    switch (event.keyCode) {
      case ENTER:
      case SPACE:
        if (this.focusIndex !== this.selectedIndex) {
          const item = this._items.get(this.focusIndex);
          if (item && !item.disabled) {
            this.selectFocusedIndex.emit(this.focusIndex);
            this._itemSelected(event);
          }
        }
        break;
      default:
        this._keyManager?.onKeydown(event);
    }
  }
  /**
   * Callback for when the MutationObserver detects that the content has changed.
   */
  _onContentChanges() {
    const textContent = this._elementRef.nativeElement.textContent;
    if (textContent !== this._currentTextContent) {
      this._currentTextContent = textContent || "";
      this._ngZone.run(() => {
        this.updatePagination();
        this._alignInkBarToSelectedTab();
        this._changeDetectorRef.markForCheck();
      });
    }
  }
  /**
   * Updates the view whether pagination should be enabled or not.
   *
   * WARNING: Calling this method can be very costly in terms of performance. It should be called
   * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
   * page.
   */
  updatePagination() {
    this._checkPaginationEnabled();
    this._checkScrollingControls();
    this._updateTabScrollPosition();
  }
  /** Tracks which element has focus; used for keyboard navigation */
  get focusIndex() {
    return this._keyManager ? this._keyManager.activeItemIndex : 0;
  }
  /** When the focus index is set, we must manually send focus to the correct label */
  set focusIndex(value) {
    if (!this._isValidIndex(value) || this.focusIndex === value || !this._keyManager) {
      return;
    }
    this._keyManager.setActiveItem(value);
  }
  /**
   * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
   * providing a valid index and return true.
   */
  _isValidIndex(index) {
    return this._items ? !!this._items.toArray()[index] : true;
  }
  /**
   * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
   * scrolling is enabled.
   */
  _setTabFocus(tabIndex) {
    if (this._showPaginationControls) {
      this._scrollToLabel(tabIndex);
    }
    if (this._items && this._items.length) {
      this._items.toArray()[tabIndex].focus();
      const containerEl = this._tabListContainer.nativeElement;
      const dir = this._getLayoutDirection();
      if (dir == "ltr") {
        containerEl.scrollLeft = 0;
      } else {
        containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
      }
    }
  }
  /** The layout direction of the containing app. */
  _getLayoutDirection() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
  _updateTabScrollPosition() {
    if (this.disablePagination) {
      return;
    }
    const scrollDistance = this.scrollDistance;
    const translateX = this._getLayoutDirection() === "ltr" ? -scrollDistance : scrollDistance;
    this._tabList.nativeElement.style.transform = `translateX(${Math.round(translateX)}px)`;
    if (this._platform.TRIDENT || this._platform.EDGE) {
      this._tabListContainer.nativeElement.scrollLeft = 0;
    }
  }
  /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
  get scrollDistance() {
    return this._scrollDistance;
  }
  set scrollDistance(value) {
    this._scrollTo(value);
  }
  /**
   * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
   * the end of the list, respectively). The distance to scroll is computed to be a third of the
   * length of the tab list view window.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _scrollHeader(direction) {
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    const scrollAmount = (direction == "before" ? -1 : 1) * viewLength / 3;
    return this._scrollTo(this._scrollDistance + scrollAmount);
  }
  /** Handles click events on the pagination arrows. */
  _handlePaginatorClick(direction) {
    this._stopInterval();
    this._scrollHeader(direction);
  }
  /**
   * Moves the tab list such that the desired tab label (marked by index) is moved into view.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _scrollToLabel(labelIndex) {
    if (this.disablePagination) {
      return;
    }
    const selectedLabel = this._items ? this._items.toArray()[labelIndex] : null;
    if (!selectedLabel) {
      return;
    }
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    const {
      offsetLeft,
      offsetWidth
    } = selectedLabel.elementRef.nativeElement;
    let labelBeforePos, labelAfterPos;
    if (this._getLayoutDirection() == "ltr") {
      labelBeforePos = offsetLeft;
      labelAfterPos = labelBeforePos + offsetWidth;
    } else {
      labelAfterPos = this._tabListInner.nativeElement.offsetWidth - offsetLeft;
      labelBeforePos = labelAfterPos - offsetWidth;
    }
    const beforeVisiblePos = this.scrollDistance;
    const afterVisiblePos = this.scrollDistance + viewLength;
    if (labelBeforePos < beforeVisiblePos) {
      this.scrollDistance -= beforeVisiblePos - labelBeforePos;
    } else if (labelAfterPos > afterVisiblePos) {
      this.scrollDistance += Math.min(labelAfterPos - afterVisiblePos, labelBeforePos - beforeVisiblePos);
    }
  }
  /**
   * Evaluate whether the pagination controls should be displayed. If the scroll width of the
   * tab list is wider than the size of the header container, then the pagination controls should
   * be shown.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _checkPaginationEnabled() {
    if (this.disablePagination) {
      this._showPaginationControls = false;
    } else {
      const scrollWidth = this._tabListInner.nativeElement.scrollWidth;
      const containerWidth = this._elementRef.nativeElement.offsetWidth;
      const isEnabled = scrollWidth - containerWidth >= 5;
      if (!isEnabled) {
        this.scrollDistance = 0;
      }
      if (isEnabled !== this._showPaginationControls) {
        this._showPaginationControls = isEnabled;
        this._changeDetectorRef.markForCheck();
      }
    }
  }
  /**
   * Evaluate whether the before and after controls should be enabled or disabled.
   * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
   * before button. If the header is at the end of the list (scroll distance is equal to the
   * maximum distance we can scroll), then disable the after button.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _checkScrollingControls() {
    if (this.disablePagination) {
      this._disableScrollAfter = this._disableScrollBefore = true;
    } else {
      this._disableScrollBefore = this.scrollDistance == 0;
      this._disableScrollAfter = this.scrollDistance == this._getMaxScrollDistance();
      this._changeDetectorRef.markForCheck();
    }
  }
  /**
   * Determines what is the maximum length in pixels that can be set for the scroll distance. This
   * is equal to the difference in width between the tab list container and tab header container.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _getMaxScrollDistance() {
    const lengthOfTabList = this._tabListInner.nativeElement.scrollWidth;
    const viewLength = this._tabListContainer.nativeElement.offsetWidth;
    return lengthOfTabList - viewLength || 0;
  }
  /** Tells the ink-bar to align itself to the current label wrapper */
  _alignInkBarToSelectedTab() {
    const selectedItem = this._items && this._items.length ? this._items.toArray()[this.selectedIndex] : null;
    const selectedLabelWrapper = selectedItem ? selectedItem.elementRef.nativeElement : null;
    if (selectedLabelWrapper) {
      this._inkBar.alignToElement(selectedLabelWrapper);
    } else {
      this._inkBar.hide();
    }
  }
  /** Stops the currently-running paginator interval.  */
  _stopInterval() {
    this._stopScrolling.next();
  }
  /**
   * Handles the user pressing down on one of the paginators.
   * Starts scrolling the header after a certain amount of time.
   * @param direction In which direction the paginator should be scrolled.
   */
  _handlePaginatorPress(direction, mouseEvent) {
    if (mouseEvent && mouseEvent.button != null && mouseEvent.button !== 0) {
      return;
    }
    this._stopInterval();
    timer(HEADER_SCROLL_DELAY, HEADER_SCROLL_INTERVAL).pipe(takeUntil(merge(this._stopScrolling, this._destroyed))).subscribe(() => {
      const {
        maxScrollDistance,
        distance
      } = this._scrollHeader(direction);
      if (distance === 0 || distance >= maxScrollDistance) {
        this._stopInterval();
      }
    });
  }
  /**
   * Scrolls the header to a given position.
   * @param position Position to which to scroll.
   * @returns Information on the current scroll distance and the maximum.
   */
  _scrollTo(position) {
    if (this.disablePagination) {
      return {
        maxScrollDistance: 0,
        distance: 0
      };
    }
    const maxScrollDistance = this._getMaxScrollDistance();
    this._scrollDistance = Math.max(0, Math.min(maxScrollDistance, position));
    this._scrollDistanceChanged = true;
    this._checkScrollingControls();
    return {
      maxScrollDistance,
      distance: this._scrollDistance
    };
  }
  static \u0275fac = function MatPaginatedTabHeader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginatedTabHeader)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatPaginatedTabHeader,
    inputs: {
      disablePagination: [2, "disablePagination", "disablePagination", booleanAttribute],
      selectedIndex: [2, "selectedIndex", "selectedIndex", numberAttribute]
    },
    outputs: {
      selectFocusedIndex: "selectFocusedIndex",
      indexFocused: "indexFocused"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginatedTabHeader, [{
    type: Directive
  }], () => [], {
    disablePagination: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectedIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    selectFocusedIndex: [{
      type: Output
    }],
    indexFocused: [{
      type: Output
    }]
  });
})();
var MatTabHeader = class _MatTabHeader extends MatPaginatedTabHeader {
  _items;
  _tabListContainer;
  _tabList;
  _tabListInner;
  _nextPaginator;
  _previousPaginator;
  _inkBar;
  /** Aria label of the header. */
  ariaLabel;
  /** Sets the `aria-labelledby` of the header. */
  ariaLabelledby;
  /** Whether the ripple effect is disabled or not. */
  disableRipple = false;
  ngAfterContentInit() {
    this._inkBar = new MatInkBar(this._items);
    super.ngAfterContentInit();
  }
  _itemSelected(event) {
    event.preventDefault();
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatTabHeader_BaseFactory;
    return function MatTabHeader_Factory(__ngFactoryType__) {
      return (\u0275MatTabHeader_BaseFactory || (\u0275MatTabHeader_BaseFactory = \u0275\u0275getInheritedFactory(_MatTabHeader)))(__ngFactoryType__ || _MatTabHeader);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatTabHeader,
    selectors: [["mat-tab-header"]],
    contentQueries: function MatTabHeader_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatTabLabelWrapper, 4);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._items = _t);
      }
    },
    viewQuery: function MatTabHeader_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c12, 7);
        \u0275\u0275viewQuery(_c2, 7);
        \u0275\u0275viewQuery(_c3, 7);
        \u0275\u0275viewQuery(_c4, 5);
        \u0275\u0275viewQuery(_c5, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabListContainer = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabList = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabListInner = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._nextPaginator = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._previousPaginator = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-tab-header"],
    hostVars: 4,
    hostBindings: function MatTabHeader_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-mdc-tab-header-pagination-controls-enabled", ctx._showPaginationControls)("mat-mdc-tab-header-rtl", ctx._getLayoutDirection() == "rtl");
      }
    },
    inputs: {
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute]
    },
    features: [\u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c02,
    decls: 13,
    vars: 10,
    consts: [["previousPaginator", ""], ["tabListContainer", ""], ["tabList", ""], ["tabListInner", ""], ["nextPaginator", ""], ["mat-ripple", "", 1, "mat-mdc-tab-header-pagination", "mat-mdc-tab-header-pagination-before", 3, "click", "mousedown", "touchend", "matRippleDisabled"], [1, "mat-mdc-tab-header-pagination-chevron"], [1, "mat-mdc-tab-label-container", 3, "keydown"], ["role", "tablist", 1, "mat-mdc-tab-list", 3, "cdkObserveContent"], [1, "mat-mdc-tab-labels"], ["mat-ripple", "", 1, "mat-mdc-tab-header-pagination", "mat-mdc-tab-header-pagination-after", 3, "mousedown", "click", "touchend", "matRippleDisabled"]],
    template: function MatTabHeader_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "div", 5, 0);
        \u0275\u0275listener("click", function MatTabHeader_Template_div_click_0_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handlePaginatorClick("before"));
        })("mousedown", function MatTabHeader_Template_div_mousedown_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handlePaginatorPress("before", $event));
        })("touchend", function MatTabHeader_Template_div_touchend_0_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._stopInterval());
        });
        \u0275\u0275element(2, "div", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 7, 1);
        \u0275\u0275listener("keydown", function MatTabHeader_Template_div_keydown_3_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handleKeydown($event));
        });
        \u0275\u0275elementStart(5, "div", 8, 2);
        \u0275\u0275listener("cdkObserveContent", function MatTabHeader_Template_div_cdkObserveContent_5_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._onContentChanges());
        });
        \u0275\u0275elementStart(7, "div", 9, 3);
        \u0275\u0275projection(9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "div", 10, 4);
        \u0275\u0275listener("mousedown", function MatTabHeader_Template_div_mousedown_10_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handlePaginatorPress("after", $event));
        })("click", function MatTabHeader_Template_div_click_10_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handlePaginatorClick("after"));
        })("touchend", function MatTabHeader_Template_div_touchend_10_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._stopInterval());
        });
        \u0275\u0275element(12, "div", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("mat-mdc-tab-header-pagination-disabled", ctx._disableScrollBefore);
        \u0275\u0275property("matRippleDisabled", ctx._disableScrollBefore || ctx.disableRipple);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("_mat-animation-noopable", ctx._animationsDisabled);
        \u0275\u0275advance(2);
        \u0275\u0275attribute("aria-label", ctx.ariaLabel || null)("aria-labelledby", ctx.ariaLabelledby || null);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("mat-mdc-tab-header-pagination-disabled", ctx._disableScrollAfter);
        \u0275\u0275property("matRippleDisabled", ctx._disableScrollAfter || ctx.disableRipple);
      }
    },
    dependencies: [MatRipple, CdkObserveContent],
    styles: [".mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;outline:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-pagination-icon-color, var(--mat-sys-on-surface))}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}.mat-mdc-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1;border-bottom-style:solid;border-bottom-width:var(--mat-tab-divider-height, 1px);border-bottom-color:var(--mat-tab-divider-color, var(--mat-sys-surface-variant))}.mat-mdc-tab-group-inverted-header .mat-mdc-tab-label-container{border-bottom:none;border-top-style:solid;border-top-width:var(--mat-tab-divider-height, 1px);border-top-color:var(--mat-tab-divider-color, var(--mat-sys-surface-variant))}.mat-mdc-tab-labels{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:flex-end}.cdk-drop-list .mat-mdc-tab-labels,.mat-mdc-tab-labels.cdk-drop-list{min-height:var(--mat-tab-container-height, 48px)}.mat-mdc-tab::before{margin:5px}@media(forced-colors: active){.mat-mdc-tab[aria-disabled=true]{color:GrayText}}\n"],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabHeader, [{
    type: Component,
    args: [{
      selector: "mat-tab-header",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.Default,
      host: {
        "class": "mat-mdc-tab-header",
        "[class.mat-mdc-tab-header-pagination-controls-enabled]": "_showPaginationControls",
        "[class.mat-mdc-tab-header-rtl]": "_getLayoutDirection() == 'rtl'"
      },
      imports: [MatRipple, CdkObserveContent],
      template: `<!--
 Note that this intentionally uses a \`div\` instead of a \`button\`, because it's not part of
 the regular tabs flow and is only here to support mouse users. It should also not be focusable.
-->
<div class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before"
     #previousPaginator
     mat-ripple
     [matRippleDisabled]="_disableScrollBefore || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollBefore"
     (click)="_handlePaginatorClick('before')"
     (mousedown)="_handlePaginatorPress('before', $event)"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</div>

<div
  class="mat-mdc-tab-label-container"
  #tabListContainer
  (keydown)="_handleKeydown($event)"
  [class._mat-animation-noopable]="_animationsDisabled">
  <div
    #tabList
    class="mat-mdc-tab-list"
    role="tablist"
    [attr.aria-label]="ariaLabel || null"
    [attr.aria-labelledby]="ariaLabelledby || null"
    (cdkObserveContent)="_onContentChanges()">
    <div class="mat-mdc-tab-labels" #tabListInner>
      <ng-content></ng-content>
    </div>
  </div>
</div>

<div class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after"
     #nextPaginator
     mat-ripple
     [matRippleDisabled]="_disableScrollAfter || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollAfter"
     (mousedown)="_handlePaginatorPress('after', $event)"
     (click)="_handlePaginatorClick('after')"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</div>
`,
      styles: [".mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;outline:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-pagination-icon-color, var(--mat-sys-on-surface))}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}.mat-mdc-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1;border-bottom-style:solid;border-bottom-width:var(--mat-tab-divider-height, 1px);border-bottom-color:var(--mat-tab-divider-color, var(--mat-sys-surface-variant))}.mat-mdc-tab-group-inverted-header .mat-mdc-tab-label-container{border-bottom:none;border-top-style:solid;border-top-width:var(--mat-tab-divider-height, 1px);border-top-color:var(--mat-tab-divider-color, var(--mat-sys-surface-variant))}.mat-mdc-tab-labels{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-header .mat-mdc-tab-labels{justify-content:flex-end}.cdk-drop-list .mat-mdc-tab-labels,.mat-mdc-tab-labels.cdk-drop-list{min-height:var(--mat-tab-container-height, 48px)}.mat-mdc-tab::before{margin:5px}@media(forced-colors: active){.mat-mdc-tab[aria-disabled=true]{color:GrayText}}\n"]
    }]
  }], null, {
    _items: [{
      type: ContentChildren,
      args: [MatTabLabelWrapper, {
        descendants: false
      }]
    }],
    _tabListContainer: [{
      type: ViewChild,
      args: ["tabListContainer", {
        static: true
      }]
    }],
    _tabList: [{
      type: ViewChild,
      args: ["tabList", {
        static: true
      }]
    }],
    _tabListInner: [{
      type: ViewChild,
      args: ["tabListInner", {
        static: true
      }]
    }],
    _nextPaginator: [{
      type: ViewChild,
      args: ["nextPaginator"]
    }],
    _previousPaginator: [{
      type: ViewChild,
      args: ["previousPaginator"]
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MAT_TABS_CONFIG = new InjectionToken("MAT_TABS_CONFIG");
var MatTabBodyPortal = class _MatTabBodyPortal extends CdkPortalOutlet {
  _host = inject(MatTabBody);
  _ngZone = inject(NgZone);
  /** Subscription to events for when the tab body begins centering. */
  _centeringSub = Subscription.EMPTY;
  /** Subscription to events for when the tab body finishes leaving from center position. */
  _leavingSub = Subscription.EMPTY;
  constructor() {
    super();
  }
  /** Set initial visibility or set up subscription for changing visibility. */
  ngOnInit() {
    super.ngOnInit();
    this._centeringSub = this._host._beforeCentering.pipe(startWith(this._host._isCenterPosition())).subscribe((isCentering) => {
      if (this._host._content && isCentering && !this.hasAttached()) {
        this._ngZone.run(() => {
          Promise.resolve().then();
          this.attach(this._host._content);
        });
      }
    });
    this._leavingSub = this._host._afterLeavingCenter.subscribe(() => {
      if (!this._host.preserveContent) {
        this._ngZone.run(() => this.detach());
      }
    });
  }
  /** Clean up centering subscription. */
  ngOnDestroy() {
    super.ngOnDestroy();
    this._centeringSub.unsubscribe();
    this._leavingSub.unsubscribe();
  }
  static \u0275fac = function MatTabBodyPortal_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTabBodyPortal)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTabBodyPortal,
    selectors: [["", "matTabBodyHost", ""]],
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabBodyPortal, [{
    type: Directive,
    args: [{
      selector: "[matTabBodyHost]"
    }]
  }], () => [], null);
})();
var MatTabBody = class _MatTabBody {
  _elementRef = inject(ElementRef);
  _dir = inject(Directionality, {
    optional: true
  });
  _ngZone = inject(NgZone);
  _injector = inject(Injector);
  _renderer = inject(Renderer2);
  _diAnimationsDisabled = _animationsDisabled();
  _eventCleanups;
  _initialized;
  _fallbackTimer;
  /** Current position of the tab-body in the tab-group. Zero means that the tab is visible. */
  _positionIndex;
  /** Subscription to the directionality change observable. */
  _dirChangeSubscription = Subscription.EMPTY;
  /** Current position of the body within the tab group. */
  _position;
  /** Previous position of the body. */
  _previousPosition;
  /** Event emitted when the tab begins to animate towards the center as the active tab. */
  _onCentering = new EventEmitter();
  /** Event emitted before the centering of the tab begins. */
  _beforeCentering = new EventEmitter();
  /** Event emitted before the centering of the tab begins. */
  _afterLeavingCenter = new EventEmitter();
  /** Event emitted when the tab completes its animation towards the center. */
  _onCentered = new EventEmitter(true);
  /** The portal host inside of this container into which the tab body content will be loaded. */
  _portalHost;
  /** Element in which the content is rendered. */
  _contentElement;
  /** The tab body content to display. */
  _content;
  // Note that the default value will always be overwritten by `MatTabBody`, but we need one
  // anyway to prevent the animations module from throwing an error if the body is used on its own.
  /** Duration for the tab's animation. */
  animationDuration = "500ms";
  /** Whether the tab's content should be kept in the DOM while it's off-screen. */
  preserveContent = false;
  /** The shifted index position of the tab body, where zero represents the active center tab. */
  set position(position) {
    this._positionIndex = position;
    this._computePositionAnimationState();
  }
  constructor() {
    if (this._dir) {
      const changeDetectorRef = inject(ChangeDetectorRef);
      this._dirChangeSubscription = this._dir.change.subscribe((dir) => {
        this._computePositionAnimationState(dir);
        changeDetectorRef.markForCheck();
      });
    }
  }
  ngOnInit() {
    this._bindTransitionEvents();
    if (this._position === "center") {
      this._setActiveClass(true);
      afterNextRender(() => this._onCentering.emit(this._elementRef.nativeElement.clientHeight), {
        injector: this._injector
      });
    }
    this._initialized = true;
  }
  ngOnDestroy() {
    clearTimeout(this._fallbackTimer);
    this._eventCleanups?.forEach((cleanup) => cleanup());
    this._dirChangeSubscription.unsubscribe();
  }
  /** Sets up the transition events. */
  _bindTransitionEvents() {
    this._ngZone.runOutsideAngular(() => {
      const element = this._elementRef.nativeElement;
      const transitionDone = (event) => {
        if (event.target === this._contentElement?.nativeElement) {
          this._elementRef.nativeElement.classList.remove("mat-tab-body-animating");
          if (event.type === "transitionend") {
            this._transitionDone();
          }
        }
      };
      this._eventCleanups = [this._renderer.listen(element, "transitionstart", (event) => {
        if (event.target === this._contentElement?.nativeElement) {
          this._elementRef.nativeElement.classList.add("mat-tab-body-animating");
          this._transitionStarted();
        }
      }), this._renderer.listen(element, "transitionend", transitionDone), this._renderer.listen(element, "transitioncancel", transitionDone)];
    });
  }
  /** Called when a transition has started. */
  _transitionStarted() {
    clearTimeout(this._fallbackTimer);
    const isCentering = this._position === "center";
    this._beforeCentering.emit(isCentering);
    if (isCentering) {
      this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
    }
  }
  /** Called when a transition is done. */
  _transitionDone() {
    if (this._position === "center") {
      this._onCentered.emit();
    } else if (this._previousPosition === "center") {
      this._afterLeavingCenter.emit();
    }
  }
  /** Sets the active styling on the tab body based on its current position. */
  _setActiveClass(isActive) {
    this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active", isActive);
  }
  /** The text direction of the containing app. */
  _getLayoutDirection() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Whether the provided position state is considered center, regardless of origin. */
  _isCenterPosition() {
    return this._positionIndex === 0;
  }
  /** Computes the position state that will be used for the tab-body animation trigger. */
  _computePositionAnimationState(dir = this._getLayoutDirection()) {
    this._previousPosition = this._position;
    if (this._positionIndex < 0) {
      this._position = dir == "ltr" ? "left" : "right";
    } else if (this._positionIndex > 0) {
      this._position = dir == "ltr" ? "right" : "left";
    } else {
      this._position = "center";
    }
    if (this._animationsDisabled()) {
      this._simulateTransitionEvents();
    } else if (this._initialized && (this._position === "center" || this._previousPosition === "center")) {
      clearTimeout(this._fallbackTimer);
      this._fallbackTimer = this._ngZone.runOutsideAngular(() => setTimeout(() => this._simulateTransitionEvents(), 100));
    }
  }
  /** Simulates the body's transition events in an environment where they might not fire. */
  _simulateTransitionEvents() {
    this._transitionStarted();
    afterNextRender(() => this._transitionDone(), {
      injector: this._injector
    });
  }
  /** Whether animations are disabled for the tab group. */
  _animationsDisabled() {
    return this._diAnimationsDisabled || this.animationDuration === "0ms" || this.animationDuration === "0s";
  }
  static \u0275fac = function MatTabBody_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTabBody)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatTabBody,
    selectors: [["mat-tab-body"]],
    viewQuery: function MatTabBody_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(MatTabBodyPortal, 5);
        \u0275\u0275viewQuery(_c6, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._portalHost = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._contentElement = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-tab-body"],
    hostVars: 1,
    hostBindings: function MatTabBody_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("inert", ctx._position === "center" ? null : "");
      }
    },
    inputs: {
      _content: [0, "content", "_content"],
      animationDuration: "animationDuration",
      preserveContent: "preserveContent",
      position: "position"
    },
    outputs: {
      _onCentering: "_onCentering",
      _beforeCentering: "_beforeCentering",
      _onCentered: "_onCentered"
    },
    decls: 3,
    vars: 6,
    consts: [["content", ""], ["cdkScrollable", "", 1, "mat-mdc-tab-body-content"], ["matTabBodyHost", ""]],
    template: function MatTabBody_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1, 0);
        \u0275\u0275template(2, MatTabBody_ng_template_2_Template, 0, 0, "ng-template", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("mat-tab-body-content-left", ctx._position === "left")("mat-tab-body-content-right", ctx._position === "right")("mat-tab-body-content-can-animate", ctx._position === "center" || ctx._previousPosition === "center");
      }
    },
    dependencies: [MatTabBodyPortal, CdkScrollable],
    styles: [".mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;outline:0;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto;transform:none;visibility:hidden}.mat-tab-body-animating>.mat-mdc-tab-body-content,.mat-mdc-tab-body-active>.mat-mdc-tab-body-content{visibility:visible}.mat-tab-body-animating>.mat-mdc-tab-body-content{min-height:1px}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}.mat-tab-body-content-can-animate{transition:transform var(--mat-tab-animation-duration) 1ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-mdc-tab-body-wrapper._mat-animation-noopable .mat-tab-body-content-can-animate{transition:none}.mat-tab-body-content-left{transform:translate3d(-100%, 0, 0)}.mat-tab-body-content-right{transform:translate3d(100%, 0, 0)}\n"],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabBody, [{
    type: Component,
    args: [{
      selector: "mat-tab-body",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.Default,
      host: {
        "class": "mat-mdc-tab-body",
        // In most cases the `hidden` that we set on the off-screen content is enough
        // to stop interactions with it, but if a child element sets its own `visibility`, it'll
        // override the one from the parent. This ensures that even those elements will be removed
        // from the accessibility tree.
        "[attr.inert]": '_position === "center" ? null : ""'
      },
      imports: [MatTabBodyPortal, CdkScrollable],
      template: `<div
   class="mat-mdc-tab-body-content"
   #content
   cdkScrollable
   [class.mat-tab-body-content-left]="_position === 'left'"
   [class.mat-tab-body-content-right]="_position === 'right'"
   [class.mat-tab-body-content-can-animate]="_position === 'center' || _previousPosition === 'center'">
  <ng-template matTabBodyHost></ng-template>
</div>
`,
      styles: [".mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;outline:0;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto;transform:none;visibility:hidden}.mat-tab-body-animating>.mat-mdc-tab-body-content,.mat-mdc-tab-body-active>.mat-mdc-tab-body-content{visibility:visible}.mat-tab-body-animating>.mat-mdc-tab-body-content{min-height:1px}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}.mat-tab-body-content-can-animate{transition:transform var(--mat-tab-animation-duration) 1ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-mdc-tab-body-wrapper._mat-animation-noopable .mat-tab-body-content-can-animate{transition:none}.mat-tab-body-content-left{transform:translate3d(-100%, 0, 0)}.mat-tab-body-content-right{transform:translate3d(100%, 0, 0)}\n"]
    }]
  }], () => [], {
    _onCentering: [{
      type: Output
    }],
    _beforeCentering: [{
      type: Output
    }],
    _onCentered: [{
      type: Output
    }],
    _portalHost: [{
      type: ViewChild,
      args: [MatTabBodyPortal]
    }],
    _contentElement: [{
      type: ViewChild,
      args: ["content"]
    }],
    _content: [{
      type: Input,
      args: ["content"]
    }],
    animationDuration: [{
      type: Input
    }],
    preserveContent: [{
      type: Input
    }],
    position: [{
      type: Input
    }]
  });
})();
var MatTabGroup = class _MatTabGroup {
  _elementRef = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _ngZone = inject(NgZone);
  _tabsSubscription = Subscription.EMPTY;
  _tabLabelSubscription = Subscription.EMPTY;
  _tabBodySubscription = Subscription.EMPTY;
  _diAnimationsDisabled = _animationsDisabled();
  /**
   * All tabs inside the tab group. This includes tabs that belong to groups that are nested
   * inside the current one. We filter out only the tabs that belong to this group in `_tabs`.
   */
  _allTabs;
  _tabBodies;
  _tabBodyWrapper;
  _tabHeader;
  /** All of the tabs that belong to the group. */
  _tabs = new QueryList();
  /** The tab index that should be selected after the content has been checked. */
  _indexToSelect = 0;
  /** Index of the tab that was focused last. */
  _lastFocusedTabIndex = null;
  /** Snapshot of the height of the tab body wrapper before another tab is activated. */
  _tabBodyWrapperHeight = 0;
  /**
   * Theme color of the tab group. This API is supported in M2 themes only, it
   * has no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/tabs/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  color;
  /** Whether the ink bar should fit its width to the size of the tab label content. */
  get fitInkBarToContent() {
    return this._fitInkBarToContent;
  }
  set fitInkBarToContent(value) {
    this._fitInkBarToContent = value;
    this._changeDetectorRef.markForCheck();
  }
  _fitInkBarToContent = false;
  /** Whether tabs should be stretched to fill the header. */
  stretchTabs = true;
  /** Alignment for tabs label. */
  alignTabs = null;
  /** Whether the tab group should grow to the size of the active tab. */
  dynamicHeight = false;
  /** The index of the active tab. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(value) {
    this._indexToSelect = isNaN(value) ? null : value;
  }
  _selectedIndex = null;
  /** Position of the tab header. */
  headerPosition = "above";
  /** Duration for the tab animation. Will be normalized to milliseconds if no units are set. */
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    const stringValue = value + "";
    this._animationDuration = /^\d+$/.test(stringValue) ? value + "ms" : stringValue;
  }
  _animationDuration;
  /**
   * `tabindex` to be set on the inner element that wraps the tab content. Can be used for improved
   * accessibility when the tab does not have focusable elements or if it has scrollable content.
   * The `tabindex` will be removed automatically for inactive tabs.
   * Read more at https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
   */
  get contentTabIndex() {
    return this._contentTabIndex;
  }
  set contentTabIndex(value) {
    this._contentTabIndex = isNaN(value) ? null : value;
  }
  _contentTabIndex;
  /**
   * Whether pagination should be disabled. This can be used to avoid unnecessary
   * layout recalculations if it's known that pagination won't be required.
   */
  disablePagination = false;
  /** Whether ripples in the tab group are disabled. */
  disableRipple = false;
  /**
   * By default tabs remove their content from the DOM while it's off-screen.
   * Setting this to `true` will keep it in the DOM which will prevent elements
   * like iframes and videos from reloading next time it comes back into the view.
   */
  preserveContent = false;
  /**
   * Theme color of the background of the tab group. This API is supported in M2 themes only, it
   * has no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/tabs/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   *
   * @deprecated The background color should be customized through Sass theming APIs.
   * @breaking-change 20.0.0 Remove this input
   */
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove("mat-tabs-with-background", `mat-background-${this.backgroundColor}`);
    if (value) {
      classList.add("mat-tabs-with-background", `mat-background-${value}`);
    }
    this._backgroundColor = value;
  }
  _backgroundColor;
  /** Aria label of the inner `tablist` of the group. */
  ariaLabel;
  /** Sets the `aria-labelledby` of the inner `tablist` of the group. */
  ariaLabelledby;
  /** Output to enable support for two-way binding on `[(selectedIndex)]` */
  selectedIndexChange = new EventEmitter();
  /** Event emitted when focus has changed within a tab group. */
  focusChange = new EventEmitter();
  /** Event emitted when the body animation has completed */
  animationDone = new EventEmitter();
  /** Event emitted when the tab selection has changed. */
  selectedTabChange = new EventEmitter(true);
  _groupId;
  /** Whether the tab group is rendered on the server. */
  _isServer = !inject(Platform).isBrowser;
  constructor() {
    const defaultConfig = inject(MAT_TABS_CONFIG, {
      optional: true
    });
    this._groupId = inject(_IdGenerator).getId("mat-tab-group-");
    this.animationDuration = defaultConfig && defaultConfig.animationDuration ? defaultConfig.animationDuration : "500ms";
    this.disablePagination = defaultConfig && defaultConfig.disablePagination != null ? defaultConfig.disablePagination : false;
    this.dynamicHeight = defaultConfig && defaultConfig.dynamicHeight != null ? defaultConfig.dynamicHeight : false;
    if (defaultConfig?.contentTabIndex != null) {
      this.contentTabIndex = defaultConfig.contentTabIndex;
    }
    this.preserveContent = !!defaultConfig?.preserveContent;
    this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ? defaultConfig.fitInkBarToContent : false;
    this.stretchTabs = defaultConfig && defaultConfig.stretchTabs != null ? defaultConfig.stretchTabs : true;
    this.alignTabs = defaultConfig && defaultConfig.alignTabs != null ? defaultConfig.alignTabs : null;
  }
  /**
   * After the content is checked, this component knows what tabs have been defined
   * and what the selected index should be. This is where we can know exactly what position
   * each tab should be in according to the new selected index, and additionally we know how
   * a new selected tab should transition in (from the left or right).
   */
  ngAfterContentChecked() {
    const indexToSelect = this._indexToSelect = this._clampTabIndex(this._indexToSelect);
    if (this._selectedIndex != indexToSelect) {
      const isFirstRun = this._selectedIndex == null;
      if (!isFirstRun) {
        this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
        const wrapper = this._tabBodyWrapper.nativeElement;
        wrapper.style.minHeight = wrapper.clientHeight + "px";
      }
      Promise.resolve().then(() => {
        this._tabs.forEach((tab, index) => tab.isActive = index === indexToSelect);
        if (!isFirstRun) {
          this.selectedIndexChange.emit(indexToSelect);
          this._tabBodyWrapper.nativeElement.style.minHeight = "";
        }
      });
    }
    this._tabs.forEach((tab, index) => {
      tab.position = index - indexToSelect;
      if (this._selectedIndex != null && tab.position == 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });
    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this._lastFocusedTabIndex = null;
      this._changeDetectorRef.markForCheck();
    }
  }
  ngAfterContentInit() {
    this._subscribeToAllTabChanges();
    this._subscribeToTabLabels();
    this._tabsSubscription = this._tabs.changes.subscribe(() => {
      const indexToSelect = this._clampTabIndex(this._indexToSelect);
      if (indexToSelect === this._selectedIndex) {
        const tabs = this._tabs.toArray();
        let selectedTab;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            this._indexToSelect = this._selectedIndex = i;
            this._lastFocusedTabIndex = null;
            selectedTab = tabs[i];
            break;
          }
        }
        if (!selectedTab && tabs[indexToSelect]) {
          Promise.resolve().then(() => {
            tabs[indexToSelect].isActive = true;
            this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
          });
        }
      }
      this._changeDetectorRef.markForCheck();
    });
  }
  ngAfterViewInit() {
    this._tabBodySubscription = this._tabBodies.changes.subscribe(() => this._bodyCentered(true));
  }
  /** Listens to changes in all of the tabs. */
  _subscribeToAllTabChanges() {
    this._allTabs.changes.pipe(startWith(this._allTabs)).subscribe((tabs) => {
      this._tabs.reset(tabs.filter((tab) => {
        return tab._closestTabGroup === this || !tab._closestTabGroup;
      }));
      this._tabs.notifyOnChanges();
    });
  }
  ngOnDestroy() {
    this._tabs.destroy();
    this._tabsSubscription.unsubscribe();
    this._tabLabelSubscription.unsubscribe();
    this._tabBodySubscription.unsubscribe();
  }
  /** Re-aligns the ink bar to the selected tab element. */
  realignInkBar() {
    if (this._tabHeader) {
      this._tabHeader._alignInkBarToSelectedTab();
    }
  }
  /**
   * Recalculates the tab group's pagination dimensions.
   *
   * WARNING: Calling this method can be very costly in terms of performance. It should be called
   * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
   * page.
   */
  updatePagination() {
    if (this._tabHeader) {
      this._tabHeader.updatePagination();
    }
  }
  /**
   * Sets focus to a particular tab.
   * @param index Index of the tab to be focused.
   */
  focusTab(index) {
    const header = this._tabHeader;
    if (header) {
      header.focusIndex = index;
    }
  }
  _focusChanged(index) {
    this._lastFocusedTabIndex = index;
    this.focusChange.emit(this._createChangeEvent(index));
  }
  _createChangeEvent(index) {
    const event = new MatTabChangeEvent();
    event.index = index;
    if (this._tabs && this._tabs.length) {
      event.tab = this._tabs.toArray()[index];
    }
    return event;
  }
  /**
   * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
   * on the MatTab component, whereas the data binding is inside the MatTabGroup. In order for the
   * binding to be updated, we need to subscribe to changes in it and trigger change detection
   * manually.
   */
  _subscribeToTabLabels() {
    if (this._tabLabelSubscription) {
      this._tabLabelSubscription.unsubscribe();
    }
    this._tabLabelSubscription = merge(...this._tabs.map((tab) => tab._stateChanges)).subscribe(() => this._changeDetectorRef.markForCheck());
  }
  /** Clamps the given index to the bounds of 0 and the tabs length. */
  _clampTabIndex(index) {
    return Math.min(this._tabs.length - 1, Math.max(index || 0, 0));
  }
  /** Returns a unique id for each tab label element */
  _getTabLabelId(tab, index) {
    return tab.id || `${this._groupId}-label-${index}`;
  }
  /** Returns a unique id for each tab content element */
  _getTabContentId(index) {
    return `${this._groupId}-content-${index}`;
  }
  /**
   * Sets the height of the body wrapper to the height of the activating tab if dynamic
   * height property is true.
   */
  _setTabBodyWrapperHeight(tabHeight) {
    if (!this.dynamicHeight || !this._tabBodyWrapperHeight) {
      this._tabBodyWrapperHeight = tabHeight;
      return;
    }
    const wrapper = this._tabBodyWrapper.nativeElement;
    wrapper.style.height = this._tabBodyWrapperHeight + "px";
    if (this._tabBodyWrapper.nativeElement.offsetHeight) {
      wrapper.style.height = tabHeight + "px";
    }
  }
  /** Removes the height of the tab body wrapper. */
  _removeTabBodyWrapperHeight() {
    const wrapper = this._tabBodyWrapper.nativeElement;
    this._tabBodyWrapperHeight = wrapper.clientHeight;
    wrapper.style.height = "";
    this._ngZone.run(() => this.animationDone.emit());
  }
  /** Handle click events, setting new selected index if appropriate. */
  _handleClick(tab, tabHeader, index) {
    tabHeader.focusIndex = index;
    if (!tab.disabled) {
      this.selectedIndex = index;
    }
  }
  /** Retrieves the tabindex for the tab. */
  _getTabIndex(index) {
    const targetIndex = this._lastFocusedTabIndex ?? this.selectedIndex;
    return index === targetIndex ? 0 : -1;
  }
  /** Callback for when the focused state of a tab has changed. */
  _tabFocusChanged(focusOrigin, index) {
    if (focusOrigin && focusOrigin !== "mouse" && focusOrigin !== "touch") {
      this._tabHeader.focusIndex = index;
    }
  }
  /**
   * Callback invoked when the centered state of a tab body changes.
   * @param isCenter Whether the tab will be in the center.
   */
  _bodyCentered(isCenter) {
    if (isCenter) {
      this._tabBodies?.forEach((body, i) => body._setActiveClass(i === this._selectedIndex));
    }
  }
  _animationsDisabled() {
    return this._diAnimationsDisabled || this.animationDuration === "0" || this.animationDuration === "0ms";
  }
  static \u0275fac = function MatTabGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTabGroup)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatTabGroup,
    selectors: [["mat-tab-group"]],
    contentQueries: function MatTabGroup_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatTab, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._allTabs = _t);
      }
    },
    viewQuery: function MatTabGroup_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c7, 5);
        \u0275\u0275viewQuery(_c8, 5);
        \u0275\u0275viewQuery(MatTabBody, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabBodyWrapper = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabHeader = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabBodies = _t);
      }
    },
    hostAttrs: [1, "mat-mdc-tab-group"],
    hostVars: 11,
    hostBindings: function MatTabGroup_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("mat-align-tabs", ctx.alignTabs);
        \u0275\u0275classMap("mat-" + (ctx.color || "primary"));
        \u0275\u0275styleProp("--mat-tab-animation-duration", ctx.animationDuration);
        \u0275\u0275classProp("mat-mdc-tab-group-dynamic-height", ctx.dynamicHeight)("mat-mdc-tab-group-inverted-header", ctx.headerPosition === "below")("mat-mdc-tab-group-stretch-tabs", ctx.stretchTabs);
      }
    },
    inputs: {
      color: "color",
      fitInkBarToContent: [2, "fitInkBarToContent", "fitInkBarToContent", booleanAttribute],
      stretchTabs: [2, "mat-stretch-tabs", "stretchTabs", booleanAttribute],
      alignTabs: [0, "mat-align-tabs", "alignTabs"],
      dynamicHeight: [2, "dynamicHeight", "dynamicHeight", booleanAttribute],
      selectedIndex: [2, "selectedIndex", "selectedIndex", numberAttribute],
      headerPosition: "headerPosition",
      animationDuration: "animationDuration",
      contentTabIndex: [2, "contentTabIndex", "contentTabIndex", numberAttribute],
      disablePagination: [2, "disablePagination", "disablePagination", booleanAttribute],
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      preserveContent: [2, "preserveContent", "preserveContent", booleanAttribute],
      backgroundColor: "backgroundColor",
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"]
    },
    outputs: {
      selectedIndexChange: "selectedIndexChange",
      focusChange: "focusChange",
      animationDone: "animationDone",
      selectedTabChange: "selectedTabChange"
    },
    exportAs: ["matTabGroup"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_TAB_GROUP,
      useExisting: _MatTabGroup
    }])],
    ngContentSelectors: _c02,
    decls: 9,
    vars: 8,
    consts: [["tabHeader", ""], ["tabBodyWrapper", ""], ["tabNode", ""], [3, "indexFocused", "selectFocusedIndex", "selectedIndex", "disableRipple", "disablePagination", "aria-label", "aria-labelledby"], ["role", "tab", "matTabLabelWrapper", "", "cdkMonitorElementFocus", "", 1, "mdc-tab", "mat-mdc-tab", "mat-focus-indicator", 3, "id", "mdc-tab--active", "class", "disabled", "fitInkBarToContent"], [1, "mat-mdc-tab-body-wrapper"], ["role", "tabpanel", 3, "id", "class", "content", "position", "animationDuration", "preserveContent"], ["role", "tab", "matTabLabelWrapper", "", "cdkMonitorElementFocus", "", 1, "mdc-tab", "mat-mdc-tab", "mat-focus-indicator", 3, "click", "cdkFocusChange", "id", "disabled", "fitInkBarToContent"], [1, "mdc-tab__ripple"], ["mat-ripple", "", 1, "mat-mdc-tab-ripple", 3, "matRippleTrigger", "matRippleDisabled"], [1, "mdc-tab__content"], [1, "mdc-tab__text-label"], [3, "cdkPortalOutlet"], ["role", "tabpanel", 3, "_onCentered", "_onCentering", "_beforeCentering", "id", "content", "position", "animationDuration", "preserveContent"]],
    template: function MatTabGroup_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "mat-tab-header", 3, 0);
        \u0275\u0275listener("indexFocused", function MatTabGroup_Template_mat_tab_header_indexFocused_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._focusChanged($event));
        })("selectFocusedIndex", function MatTabGroup_Template_mat_tab_header_selectFocusedIndex_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.selectedIndex = $event);
        });
        \u0275\u0275repeaterCreate(2, MatTabGroup_For_3_Template, 8, 17, "div", 4, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(4, MatTabGroup_Conditional_4_Template, 1, 0);
        \u0275\u0275elementStart(5, "div", 5, 1);
        \u0275\u0275repeaterCreate(7, MatTabGroup_For_8_Template, 1, 10, "mat-tab-body", 6, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275property("selectedIndex", ctx.selectedIndex || 0)("disableRipple", ctx.disableRipple)("disablePagination", ctx.disablePagination);
        \u0275\u0275ariaProperty("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledby);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx._tabs);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx._isServer ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("_mat-animation-noopable", ctx._animationsDisabled());
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx._tabs);
      }
    },
    dependencies: [MatTabHeader, MatTabLabelWrapper, CdkMonitorFocus, MatRipple, CdkPortalOutlet, MatTabBody],
    styles: ['.mdc-tab{min-width:90px;padding:0 24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;z-index:1;touch-action:manipulation}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab--active .mdc-tab__text-label{transition-delay:100ms}._mat-animation-noopable .mdc-tab__text-label{transition:none}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transition:var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}._mat-animation-noopable .mdc-tab-indicator__content,.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mat-mdc-tab-ripple.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;height:var(--mat-tab-container-height, 48px);font-family:var(--mat-tab-label-text-font, var(--mat-sys-title-small-font));font-size:var(--mat-tab-label-text-size, var(--mat-sys-title-small-size));letter-spacing:var(--mat-tab-label-text-tracking, var(--mat-sys-title-small-tracking));line-height:var(--mat-tab-label-text-line-height, var(--mat-sys-title-small-line-height));font-weight:var(--mat-tab-label-text-weight, var(--mat-sys-title-small-weight))}.mat-mdc-tab.mdc-tab{flex-grow:0}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mat-tab-active-indicator-height, 2px);border-radius:var(--mat-tab-active-indicator-shape, 0)}.mat-mdc-tab:hover .mdc-tab__text-label{color:var(--mat-tab-inactive-hover-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab:focus .mdc-tab__text-label{color:var(--mat-tab-inactive-focus-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-active-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-active-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-active-hover-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-active-hover-indicator-color, var(--mat-sys-primary))}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-active-focus-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-active-focus-indicator-color, var(--mat-sys-primary))}.mat-mdc-tab.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-disabled-ripple-color, var(--mat-sys-on-surface-variant))}.mat-mdc-tab .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-inactive-label-text-color, var(--mat-sys-on-surface));display:inline-flex;align-items:center}.mat-mdc-tab .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-background-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-focus-indicator::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-focus-indicator::before{border-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mdc-tab__ripple::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-mdc-tab-body-wrapper._mat-animation-noopable{transition:none !important;animation:none !important}\n'],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabGroup, [{
    type: Component,
    args: [{
      selector: "mat-tab-group",
      exportAs: "matTabGroup",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.Default,
      providers: [{
        provide: MAT_TAB_GROUP,
        useExisting: MatTabGroup
      }],
      host: {
        "class": "mat-mdc-tab-group",
        "[class]": '"mat-" + (color || "primary")',
        "[class.mat-mdc-tab-group-dynamic-height]": "dynamicHeight",
        "[class.mat-mdc-tab-group-inverted-header]": 'headerPosition === "below"',
        "[class.mat-mdc-tab-group-stretch-tabs]": "stretchTabs",
        "[attr.mat-align-tabs]": "alignTabs",
        "[style.--mat-tab-animation-duration]": "animationDuration"
      },
      imports: [MatTabHeader, MatTabLabelWrapper, CdkMonitorFocus, MatRipple, CdkPortalOutlet, MatTabBody],
      template: '<mat-tab-header #tabHeader\n                [selectedIndex]="selectedIndex || 0"\n                [disableRipple]="disableRipple"\n                [disablePagination]="disablePagination"\n                [aria-label]="ariaLabel"\n                [aria-labelledby]="ariaLabelledby"\n                (indexFocused)="_focusChanged($event)"\n                (selectFocusedIndex)="selectedIndex = $event">\n\n  @for (tab of _tabs; track tab) {\n    <div class="mdc-tab mat-mdc-tab mat-focus-indicator"\n        #tabNode\n        role="tab"\n        matTabLabelWrapper\n        cdkMonitorElementFocus\n        [id]="_getTabLabelId(tab, $index)"\n        [attr.tabIndex]="_getTabIndex($index)"\n        [attr.aria-posinset]="$index + 1"\n        [attr.aria-setsize]="_tabs.length"\n        [attr.aria-controls]="_getTabContentId($index)"\n        [attr.aria-selected]="selectedIndex === $index"\n        [attr.aria-label]="tab.ariaLabel || null"\n        [attr.aria-labelledby]="(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null"\n        [class.mdc-tab--active]="selectedIndex === $index"\n        [class]="tab.labelClass"\n        [disabled]="tab.disabled"\n        [fitInkBarToContent]="fitInkBarToContent"\n        (click)="_handleClick(tab, tabHeader, $index)"\n        (cdkFocusChange)="_tabFocusChanged($event, $index)">\n      <span class="mdc-tab__ripple"></span>\n\n      <!-- Needs to be a separate element, because we can\'t put\n          `overflow: hidden` on tab due to the ink bar. -->\n      <div\n        class="mat-mdc-tab-ripple"\n        mat-ripple\n        [matRippleTrigger]="tabNode"\n        [matRippleDisabled]="tab.disabled || disableRipple"></div>\n\n      <span class="mdc-tab__content">\n        <span class="mdc-tab__text-label">\n          <!--\n            If there is a label template, use it, otherwise fall back to the text label.\n            Note that we don\'t have indentation around the text label, because it adds\n            whitespace around the text which breaks some internal tests.\n          -->\n          @if (tab.templateLabel) {\n            <ng-template [cdkPortalOutlet]="tab.templateLabel"></ng-template>\n          } @else {{{tab.textLabel}}}\n        </span>\n      </span>\n    </div>\n  }\n</mat-tab-header>\n\n<!--\n  We need to project the content somewhere to avoid hydration errors. Some observations:\n  1. This is only necessary on the server.\n  2. We get a hydration error if there aren\'t any nodes after the `ng-content`.\n  3. We get a hydration error if `ng-content` is wrapped in another element.\n-->\n@if (_isServer) {\n  <ng-content/>\n}\n\n<div\n  class="mat-mdc-tab-body-wrapper"\n  [class._mat-animation-noopable]="_animationsDisabled()"\n  #tabBodyWrapper>\n  @for (tab of _tabs; track tab;) {\n    <mat-tab-body role="tabpanel"\n                 [id]="_getTabContentId($index)"\n                 [attr.tabindex]="(contentTabIndex != null && selectedIndex === $index) ? contentTabIndex : null"\n                 [attr.aria-labelledby]="_getTabLabelId(tab, $index)"\n                 [attr.aria-hidden]="selectedIndex !== $index"\n                 [class]="tab.bodyClass"\n                 [content]="tab.content!"\n                 [position]="tab.position!"\n                 [animationDuration]="animationDuration"\n                 [preserveContent]="preserveContent"\n                 (_onCentered)="_removeTabBodyWrapperHeight()"\n                 (_onCentering)="_setTabBodyWrapperHeight($event)"\n                 (_beforeCentering)="_bodyCentered($event)"/>\n  }\n</div>\n',
      styles: ['.mdc-tab{min-width:90px;padding:0 24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;z-index:1;touch-action:manipulation}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab--active .mdc-tab__text-label{transition-delay:100ms}._mat-animation-noopable .mdc-tab__text-label{transition:none}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transition:var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}._mat-animation-noopable .mdc-tab-indicator__content,.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mat-mdc-tab-ripple.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;height:var(--mat-tab-container-height, 48px);font-family:var(--mat-tab-label-text-font, var(--mat-sys-title-small-font));font-size:var(--mat-tab-label-text-size, var(--mat-sys-title-small-size));letter-spacing:var(--mat-tab-label-text-tracking, var(--mat-sys-title-small-tracking));line-height:var(--mat-tab-label-text-line-height, var(--mat-sys-title-small-line-height));font-weight:var(--mat-tab-label-text-weight, var(--mat-sys-title-small-weight))}.mat-mdc-tab.mdc-tab{flex-grow:0}.mat-mdc-tab .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mat-tab-active-indicator-height, 2px);border-radius:var(--mat-tab-active-indicator-shape, 0)}.mat-mdc-tab:hover .mdc-tab__text-label{color:var(--mat-tab-inactive-hover-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab:focus .mdc-tab__text-label{color:var(--mat-tab-inactive-focus-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-active-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-active-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-active-hover-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-active-hover-indicator-color, var(--mat-sys-primary))}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-active-focus-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-active-focus-indicator-color, var(--mat-sys-primary))}.mat-mdc-tab.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-disabled-ripple-color, var(--mat-sys-on-surface-variant))}.mat-mdc-tab .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-inactive-label-text-color, var(--mat-sys-on-surface));display:inline-flex;align-items:center}.mat-mdc-tab .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-background-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label{color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background.mat-primary>.mat-mdc-tab-header .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-focus-indicator::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-focus-indicator::before{border-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mdc-tab__ripple::before,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-group.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-foreground-color)}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-mdc-tab-body-wrapper._mat-animation-noopable{transition:none !important;animation:none !important}\n']
    }]
  }], () => [], {
    _allTabs: [{
      type: ContentChildren,
      args: [MatTab, {
        descendants: true
      }]
    }],
    _tabBodies: [{
      type: ViewChildren,
      args: [MatTabBody]
    }],
    _tabBodyWrapper: [{
      type: ViewChild,
      args: ["tabBodyWrapper"]
    }],
    _tabHeader: [{
      type: ViewChild,
      args: ["tabHeader"]
    }],
    color: [{
      type: Input
    }],
    fitInkBarToContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    stretchTabs: [{
      type: Input,
      args: [{
        alias: "mat-stretch-tabs",
        transform: booleanAttribute
      }]
    }],
    alignTabs: [{
      type: Input,
      args: [{
        alias: "mat-align-tabs"
      }]
    }],
    dynamicHeight: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectedIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    headerPosition: [{
      type: Input
    }],
    animationDuration: [{
      type: Input
    }],
    contentTabIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    disablePagination: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    preserveContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    backgroundColor: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    selectedIndexChange: [{
      type: Output
    }],
    focusChange: [{
      type: Output
    }],
    animationDone: [{
      type: Output
    }],
    selectedTabChange: [{
      type: Output
    }]
  });
})();
var MatTabChangeEvent = class {
  /** Index of the currently-selected tab. */
  index;
  /** Reference to the currently-selected tab. */
  tab;
};
var MatTabNav = class _MatTabNav extends MatPaginatedTabHeader {
  _focusedItem = signal(null, ...ngDevMode ? [{
    debugName: "_focusedItem"
  }] : []);
  /** Whether the ink bar should fit its width to the size of the tab label content. */
  get fitInkBarToContent() {
    return this._fitInkBarToContent.value;
  }
  set fitInkBarToContent(value) {
    this._fitInkBarToContent.next(value);
    this._changeDetectorRef.markForCheck();
  }
  _fitInkBarToContent = new BehaviorSubject(false);
  /** Whether tabs should be stretched to fill the header. */
  stretchTabs = true;
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    const stringValue = value + "";
    this._animationDuration = /^\d+$/.test(stringValue) ? value + "ms" : stringValue;
  }
  _animationDuration;
  /** Query list of all tab links of the tab navigation. */
  _items;
  /**
   * Theme color of the background of the tab nav. This API is supported in M2 themes only, it
   * has no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/tabs/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove("mat-tabs-with-background", `mat-background-${this.backgroundColor}`);
    if (value) {
      classList.add("mat-tabs-with-background", `mat-background-${value}`);
    }
    this._backgroundColor = value;
  }
  _backgroundColor;
  /** Whether the ripple effect is disabled or not. */
  get disableRipple() {
    return this._disableRipple();
  }
  set disableRipple(value) {
    this._disableRipple.set(value);
  }
  _disableRipple = signal(false, ...ngDevMode ? [{
    debugName: "_disableRipple"
  }] : []);
  /**
   * Theme color of the nav bar. This API is supported in M2 themes only, it has
   * no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/tabs/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  color = "primary";
  /**
   * Associated tab panel controlled by the nav bar. If not provided, then the nav bar
   * follows the ARIA link / navigation landmark pattern. If provided, it follows the
   * ARIA tabs design pattern.
   */
  tabPanel;
  _tabListContainer;
  _tabList;
  _tabListInner;
  _nextPaginator;
  _previousPaginator;
  _inkBar;
  constructor() {
    const defaultConfig = inject(MAT_TABS_CONFIG, {
      optional: true
    });
    super();
    this.disablePagination = defaultConfig && defaultConfig.disablePagination != null ? defaultConfig.disablePagination : false;
    this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ? defaultConfig.fitInkBarToContent : false;
    this.stretchTabs = defaultConfig && defaultConfig.stretchTabs != null ? defaultConfig.stretchTabs : true;
  }
  _itemSelected() {
  }
  ngAfterContentInit() {
    this._inkBar = new MatInkBar(this._items);
    this._items.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => this.updateActiveLink());
    super.ngAfterContentInit();
    this._keyManager.change.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => this._focusedItem.set(this._keyManager?.activeItem || null));
  }
  ngAfterViewInit() {
    if (!this.tabPanel && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw new Error("A mat-tab-nav-panel must be specified via [tabPanel].");
    }
    super.ngAfterViewInit();
  }
  /** Notifies the component that the active link has been changed. */
  updateActiveLink() {
    if (!this._items) {
      return;
    }
    const items = this._items.toArray();
    for (let i = 0; i < items.length; i++) {
      if (items[i].active) {
        this.selectedIndex = i;
        if (this.tabPanel) {
          this.tabPanel._activeTabId = items[i].id;
        }
        this._focusedItem.set(items[i]);
        this._changeDetectorRef.markForCheck();
        return;
      }
    }
    this.selectedIndex = -1;
  }
  _getRole() {
    return this.tabPanel ? "tablist" : this._elementRef.nativeElement.getAttribute("role");
  }
  _hasFocus(link) {
    return this._keyManager?.activeItem === link;
  }
  static \u0275fac = function MatTabNav_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTabNav)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatTabNav,
    selectors: [["", "mat-tab-nav-bar", ""]],
    contentQueries: function MatTabNav_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatTabLink, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._items = _t);
      }
    },
    viewQuery: function MatTabNav_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c12, 7);
        \u0275\u0275viewQuery(_c2, 7);
        \u0275\u0275viewQuery(_c3, 7);
        \u0275\u0275viewQuery(_c4, 5);
        \u0275\u0275viewQuery(_c5, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabListContainer = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabList = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tabListInner = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._nextPaginator = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._previousPaginator = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-tab-nav-bar", "mat-mdc-tab-header"],
    hostVars: 17,
    hostBindings: function MatTabNav_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("role", ctx._getRole());
        \u0275\u0275styleProp("--mat-tab-animation-duration", ctx.animationDuration);
        \u0275\u0275classProp("mat-mdc-tab-header-pagination-controls-enabled", ctx._showPaginationControls)("mat-mdc-tab-header-rtl", ctx._getLayoutDirection() == "rtl")("mat-mdc-tab-nav-bar-stretch-tabs", ctx.stretchTabs)("mat-primary", ctx.color !== "warn" && ctx.color !== "accent")("mat-accent", ctx.color === "accent")("mat-warn", ctx.color === "warn")("_mat-animation-noopable", ctx._animationsDisabled);
      }
    },
    inputs: {
      fitInkBarToContent: [2, "fitInkBarToContent", "fitInkBarToContent", booleanAttribute],
      stretchTabs: [2, "mat-stretch-tabs", "stretchTabs", booleanAttribute],
      animationDuration: "animationDuration",
      backgroundColor: "backgroundColor",
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      color: "color",
      tabPanel: "tabPanel"
    },
    exportAs: ["matTabNavBar", "matTabNav"],
    features: [\u0275\u0275InheritDefinitionFeature],
    attrs: _c9,
    ngContentSelectors: _c02,
    decls: 13,
    vars: 6,
    consts: [["previousPaginator", ""], ["tabListContainer", ""], ["tabList", ""], ["tabListInner", ""], ["nextPaginator", ""], ["mat-ripple", "", 1, "mat-mdc-tab-header-pagination", "mat-mdc-tab-header-pagination-before", 3, "click", "mousedown", "touchend", "matRippleDisabled"], [1, "mat-mdc-tab-header-pagination-chevron"], [1, "mat-mdc-tab-link-container", 3, "keydown"], [1, "mat-mdc-tab-list", 3, "cdkObserveContent"], [1, "mat-mdc-tab-links"], ["mat-ripple", "", 1, "mat-mdc-tab-header-pagination", "mat-mdc-tab-header-pagination-after", 3, "mousedown", "click", "touchend", "matRippleDisabled"]],
    template: function MatTabNav_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "div", 5, 0);
        \u0275\u0275listener("click", function MatTabNav_Template_div_click_0_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handlePaginatorClick("before"));
        })("mousedown", function MatTabNav_Template_div_mousedown_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handlePaginatorPress("before", $event));
        })("touchend", function MatTabNav_Template_div_touchend_0_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._stopInterval());
        });
        \u0275\u0275element(2, "div", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 7, 1);
        \u0275\u0275listener("keydown", function MatTabNav_Template_div_keydown_3_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handleKeydown($event));
        });
        \u0275\u0275elementStart(5, "div", 8, 2);
        \u0275\u0275listener("cdkObserveContent", function MatTabNav_Template_div_cdkObserveContent_5_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._onContentChanges());
        });
        \u0275\u0275elementStart(7, "div", 9, 3);
        \u0275\u0275projection(9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "div", 10, 4);
        \u0275\u0275listener("mousedown", function MatTabNav_Template_div_mousedown_10_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handlePaginatorPress("after", $event));
        })("click", function MatTabNav_Template_div_click_10_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handlePaginatorClick("after"));
        })("touchend", function MatTabNav_Template_div_touchend_10_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._stopInterval());
        });
        \u0275\u0275element(12, "div", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("mat-mdc-tab-header-pagination-disabled", ctx._disableScrollBefore);
        \u0275\u0275property("matRippleDisabled", ctx._disableScrollBefore || ctx.disableRipple);
        \u0275\u0275advance(10);
        \u0275\u0275classProp("mat-mdc-tab-header-pagination-disabled", ctx._disableScrollAfter);
        \u0275\u0275property("matRippleDisabled", ctx._disableScrollAfter || ctx.disableRipple);
      }
    },
    dependencies: [MatRipple, CdkObserveContent],
    styles: [".mdc-tab{min-width:90px;padding:0 24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;z-index:1;touch-action:manipulation}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab--active .mdc-tab__text-label{transition-delay:100ms}._mat-animation-noopable .mdc-tab__text-label{transition:none}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transition:var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}._mat-animation-noopable .mdc-tab-indicator__content,.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mat-mdc-tab-ripple.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;outline:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-pagination-icon-color, var(--mat-sys-on-surface))}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.cdk-drop-list .mat-mdc-tab-links,.mat-mdc-tab-links.cdk-drop-list{min-height:var(--mat-tab-container-height, 48px)}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1;border-bottom-style:solid;border-bottom-width:var(--mat-tab-divider-height, 1px);border-bottom-color:var(--mat-tab-divider-color, var(--mat-sys-surface-variant))}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-background-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-focus-indicator::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-focus-indicator::before{border-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mdc-tab__ripple::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-foreground-color)}\n"],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabNav, [{
    type: Component,
    args: [{
      selector: "[mat-tab-nav-bar]",
      exportAs: "matTabNavBar, matTabNav",
      host: {
        "[attr.role]": "_getRole()",
        "class": "mat-mdc-tab-nav-bar mat-mdc-tab-header",
        "[class.mat-mdc-tab-header-pagination-controls-enabled]": "_showPaginationControls",
        "[class.mat-mdc-tab-header-rtl]": "_getLayoutDirection() == 'rtl'",
        "[class.mat-mdc-tab-nav-bar-stretch-tabs]": "stretchTabs",
        "[class.mat-primary]": 'color !== "warn" && color !== "accent"',
        "[class.mat-accent]": 'color === "accent"',
        "[class.mat-warn]": 'color === "warn"',
        "[class._mat-animation-noopable]": "_animationsDisabled",
        "[style.--mat-tab-animation-duration]": "animationDuration"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.Default,
      imports: [MatRipple, CdkObserveContent],
      template: `<!--
 Note that this intentionally uses a \`div\` instead of a \`button\`, because it's not part of
 the regular tabs flow and is only here to support mouse users. It should also not be focusable.
-->
<div class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before"
     #previousPaginator
     mat-ripple
     [matRippleDisabled]="_disableScrollBefore || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollBefore"
     (click)="_handlePaginatorClick('before')"
     (mousedown)="_handlePaginatorPress('before', $event)"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</div>

<div class="mat-mdc-tab-link-container" #tabListContainer (keydown)="_handleKeydown($event)">
  <div class="mat-mdc-tab-list" #tabList (cdkObserveContent)="_onContentChanges()">
    <div class="mat-mdc-tab-links" #tabListInner>
      <ng-content></ng-content>
    </div>
  </div>
</div>

<div class="mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after"
     #nextPaginator
     mat-ripple
     [matRippleDisabled]="_disableScrollAfter || disableRipple"
     [class.mat-mdc-tab-header-pagination-disabled]="_disableScrollAfter"
     (mousedown)="_handlePaginatorPress('after', $event)"
     (click)="_handlePaginatorClick('after')"
     (touchend)="_stopInterval()">
  <div class="mat-mdc-tab-header-pagination-chevron"></div>
</div>
`,
      styles: [".mdc-tab{min-width:90px;padding:0 24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;z-index:1;touch-action:manipulation}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab--active .mdc-tab__text-label{transition-delay:100ms}._mat-animation-noopable .mdc-tab__text-label{transition:none}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transition:var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}._mat-animation-noopable .mdc-tab-indicator__content,.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mat-mdc-tab-ripple.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;outline:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-pagination-icon-color, var(--mat-sys-on-surface))}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.cdk-drop-list .mat-mdc-tab-links,.mat-mdc-tab-links.cdk-drop-list{min-height:var(--mat-tab-container-height, 48px)}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1;border-bottom-style:solid;border-bottom-width:var(--mat-tab-divider-height, 1px);border-bottom-color:var(--mat-tab-divider-color, var(--mat-sys-surface-variant))}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-background-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-focus-indicator::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-focus-indicator::before{border-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mdc-tab__ripple::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-foreground-color)}\n"]
    }]
  }], () => [], {
    fitInkBarToContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    stretchTabs: [{
      type: Input,
      args: [{
        alias: "mat-stretch-tabs",
        transform: booleanAttribute
      }]
    }],
    animationDuration: [{
      type: Input
    }],
    _items: [{
      type: ContentChildren,
      args: [forwardRef(() => MatTabLink), {
        descendants: true
      }]
    }],
    backgroundColor: [{
      type: Input
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    color: [{
      type: Input
    }],
    tabPanel: [{
      type: Input
    }],
    _tabListContainer: [{
      type: ViewChild,
      args: ["tabListContainer", {
        static: true
      }]
    }],
    _tabList: [{
      type: ViewChild,
      args: ["tabList", {
        static: true
      }]
    }],
    _tabListInner: [{
      type: ViewChild,
      args: ["tabListInner", {
        static: true
      }]
    }],
    _nextPaginator: [{
      type: ViewChild,
      args: ["nextPaginator"]
    }],
    _previousPaginator: [{
      type: ViewChild,
      args: ["previousPaginator"]
    }]
  });
})();
var MatTabLink = class _MatTabLink extends InkBarItem {
  _tabNavBar = inject(MatTabNav);
  elementRef = inject(ElementRef);
  _focusMonitor = inject(FocusMonitor);
  _destroyed = new Subject();
  /** Whether the tab link is active or not. */
  _isActive = false;
  _tabIndex = computed(() => this._tabNavBar._focusedItem() === this ? this.tabIndex : -1, ...ngDevMode ? [{
    debugName: "_tabIndex"
  }] : []);
  /** Whether the link is active. */
  get active() {
    return this._isActive;
  }
  set active(value) {
    if (value !== this._isActive) {
      this._isActive = value;
      this._tabNavBar.updateActiveLink();
    }
  }
  /** Whether the tab link is disabled. */
  disabled = false;
  /** Whether ripples are disabled on the tab link. */
  get disableRipple() {
    return this._disableRipple();
  }
  set disableRipple(value) {
    this._disableRipple.set(value);
  }
  _disableRipple = signal(false, ...ngDevMode ? [{
    debugName: "_disableRipple"
  }] : []);
  tabIndex = 0;
  /**
   * Ripple configuration for ripples that are launched on pointer down. The ripple config
   * is set to the global ripple options since we don't have any configurable options for
   * the tab link ripples.
   * @docs-private
   */
  rippleConfig;
  /**
   * Whether ripples are disabled on interaction.
   * @docs-private
   */
  get rippleDisabled() {
    return this.disabled || this.disableRipple || this._tabNavBar.disableRipple || !!this.rippleConfig.disabled;
  }
  /** Unique id for the tab. */
  id = inject(_IdGenerator).getId("mat-tab-link-");
  constructor() {
    super();
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    const globalRippleOptions = inject(MAT_RIPPLE_GLOBAL_OPTIONS, {
      optional: true
    });
    const tabIndex = inject(new HostAttributeToken("tabindex"), {
      optional: true
    });
    this.rippleConfig = globalRippleOptions || {};
    this.tabIndex = tabIndex == null ? 0 : parseInt(tabIndex) || 0;
    if (_animationsDisabled()) {
      this.rippleConfig.animation = {
        enterDuration: 0,
        exitDuration: 0
      };
    }
    this._tabNavBar._fitInkBarToContent.pipe(takeUntil(this._destroyed)).subscribe((fitInkBarToContent) => {
      this.fitInkBarToContent = fitInkBarToContent;
    });
  }
  /** Focuses the tab link. */
  focus() {
    this.elementRef.nativeElement.focus();
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this.elementRef);
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
    super.ngOnDestroy();
    this._focusMonitor.stopMonitoring(this.elementRef);
  }
  _handleFocus() {
    this._tabNavBar.focusIndex = this._tabNavBar._items.toArray().indexOf(this);
  }
  _handleKeydown(event) {
    if (event.keyCode === SPACE || event.keyCode === ENTER) {
      if (this.disabled) {
        event.preventDefault();
      } else if (this._tabNavBar.tabPanel) {
        if (event.keyCode === SPACE) {
          event.preventDefault();
        }
        this.elementRef.nativeElement.click();
      }
    }
  }
  _getAriaControls() {
    return this._tabNavBar.tabPanel ? this._tabNavBar.tabPanel?.id : this.elementRef.nativeElement.getAttribute("aria-controls");
  }
  _getAriaSelected() {
    if (this._tabNavBar.tabPanel) {
      return this.active ? "true" : "false";
    } else {
      return this.elementRef.nativeElement.getAttribute("aria-selected");
    }
  }
  _getAriaCurrent() {
    return this.active && !this._tabNavBar.tabPanel ? "page" : null;
  }
  _getRole() {
    return this._tabNavBar.tabPanel ? "tab" : this.elementRef.nativeElement.getAttribute("role");
  }
  static \u0275fac = function MatTabLink_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTabLink)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatTabLink,
    selectors: [["", "mat-tab-link", ""], ["", "matTabLink", ""]],
    hostAttrs: [1, "mdc-tab", "mat-mdc-tab-link", "mat-focus-indicator"],
    hostVars: 11,
    hostBindings: function MatTabLink_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("focus", function MatTabLink_focus_HostBindingHandler() {
          return ctx._handleFocus();
        })("keydown", function MatTabLink_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("aria-controls", ctx._getAriaControls())("aria-current", ctx._getAriaCurrent())("aria-disabled", ctx.disabled)("aria-selected", ctx._getAriaSelected())("id", ctx.id)("tabIndex", ctx._tabIndex())("role", ctx._getRole());
        \u0275\u0275classProp("mat-mdc-tab-disabled", ctx.disabled)("mdc-tab--active", ctx.active);
      }
    },
    inputs: {
      active: [2, "active", "active", booleanAttribute],
      disabled: [2, "disabled", "disabled", booleanAttribute],
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)],
      id: "id"
    },
    exportAs: ["matTabLink"],
    features: [\u0275\u0275InheritDefinitionFeature],
    attrs: _c10,
    ngContentSelectors: _c02,
    decls: 5,
    vars: 2,
    consts: [[1, "mdc-tab__ripple"], ["mat-ripple", "", 1, "mat-mdc-tab-ripple", 3, "matRippleTrigger", "matRippleDisabled"], [1, "mdc-tab__content"], [1, "mdc-tab__text-label"]],
    template: function MatTabLink_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275element(0, "span", 0)(1, "div", 1);
        \u0275\u0275elementStart(2, "span", 2)(3, "span", 3);
        \u0275\u0275projection(4);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("matRippleTrigger", ctx.elementRef.nativeElement)("matRippleDisabled", ctx.rippleDisabled);
      }
    },
    dependencies: [MatRipple],
    styles: ['.mat-mdc-tab-link{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;height:var(--mat-tab-container-height, 48px);font-family:var(--mat-tab-label-text-font, var(--mat-sys-title-small-font));font-size:var(--mat-tab-label-text-size, var(--mat-sys-title-small-size));letter-spacing:var(--mat-tab-label-text-tracking, var(--mat-sys-title-small-tracking));line-height:var(--mat-tab-label-text-line-height, var(--mat-sys-title-small-line-height));font-weight:var(--mat-tab-label-text-weight, var(--mat-sys-title-small-weight))}.mat-mdc-tab-link.mdc-tab{flex-grow:0}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mat-tab-active-indicator-height, 2px);border-radius:var(--mat-tab-active-indicator-shape, 0)}.mat-mdc-tab-link:hover .mdc-tab__text-label{color:var(--mat-tab-inactive-hover-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link:focus .mdc-tab__text-label{color:var(--mat-tab-inactive-focus-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-active-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab-link.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-active-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-active-hover-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-active-hover-indicator-color, var(--mat-sys-primary))}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-active-focus-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-active-focus-indicator-color, var(--mat-sys-primary))}.mat-mdc-tab-link.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab-link.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-disabled-ripple-color, var(--mat-sys-on-surface-variant))}.mat-mdc-tab-link .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-inactive-label-text-color, var(--mat-sys-on-surface));display:inline-flex;align-items:center}.mat-mdc-tab-link .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab-header.mat-mdc-tab-nav-bar-stretch-tabs .mat-mdc-tab-link{flex-grow:1}.mat-mdc-tab-link::before{margin:5px}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabLink, [{
    type: Component,
    args: [{
      selector: "[mat-tab-link], [matTabLink]",
      exportAs: "matTabLink",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "class": "mdc-tab mat-mdc-tab-link mat-focus-indicator",
        "[attr.aria-controls]": "_getAriaControls()",
        "[attr.aria-current]": "_getAriaCurrent()",
        "[attr.aria-disabled]": "disabled",
        "[attr.aria-selected]": "_getAriaSelected()",
        "[attr.id]": "id",
        "[attr.tabIndex]": "_tabIndex()",
        "[attr.role]": "_getRole()",
        "[class.mat-mdc-tab-disabled]": "disabled",
        "[class.mdc-tab--active]": "active",
        "(focus)": "_handleFocus()",
        "(keydown)": "_handleKeydown($event)"
      },
      imports: [MatRipple],
      template: '<span class="mdc-tab__ripple"></span>\n\n<div\n  class="mat-mdc-tab-ripple"\n  mat-ripple\n  [matRippleTrigger]="elementRef.nativeElement"\n  [matRippleDisabled]="rippleDisabled"></div>\n\n<span class="mdc-tab__content">\n  <span class="mdc-tab__text-label">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n',
      styles: ['.mat-mdc-tab-link{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;height:var(--mat-tab-container-height, 48px);font-family:var(--mat-tab-label-text-font, var(--mat-sys-title-small-font));font-size:var(--mat-tab-label-text-size, var(--mat-sys-title-small-size));letter-spacing:var(--mat-tab-label-text-tracking, var(--mat-sys-title-small-tracking));line-height:var(--mat-tab-label-text-line-height, var(--mat-sys-title-small-line-height));font-weight:var(--mat-tab-label-text-weight, var(--mat-sys-title-small-weight))}.mat-mdc-tab-link.mdc-tab{flex-grow:0}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mat-tab-active-indicator-height, 2px);border-radius:var(--mat-tab-active-indicator-shape, 0)}.mat-mdc-tab-link:hover .mdc-tab__text-label{color:var(--mat-tab-inactive-hover-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link:focus .mdc-tab__text-label{color:var(--mat-tab-inactive-focus-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-active-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab-link.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-active-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-active-hover-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-active-hover-indicator-color, var(--mat-sys-primary))}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-active-focus-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-active-focus-indicator-color, var(--mat-sys-primary))}.mat-mdc-tab-link.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab-link.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-disabled-ripple-color, var(--mat-sys-on-surface-variant))}.mat-mdc-tab-link .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-inactive-label-text-color, var(--mat-sys-on-surface));display:inline-flex;align-items:center}.mat-mdc-tab-link .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-tab-header.mat-mdc-tab-nav-bar-stretch-tabs .mat-mdc-tab-link{flex-grow:1}.mat-mdc-tab-link::before{margin:5px}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}\n']
    }]
  }], () => [], {
    active: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }],
    id: [{
      type: Input
    }]
  });
})();
var MatTabNavPanel = class _MatTabNavPanel {
  /** Unique id for the tab panel. */
  id = inject(_IdGenerator).getId("mat-tab-nav-panel-");
  /** Id of the active tab in the nav bar. */
  _activeTabId;
  static \u0275fac = function MatTabNavPanel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTabNavPanel)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatTabNavPanel,
    selectors: [["mat-tab-nav-panel"]],
    hostAttrs: ["role", "tabpanel", 1, "mat-mdc-tab-nav-panel"],
    hostVars: 2,
    hostBindings: function MatTabNavPanel_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-labelledby", ctx._activeTabId)("id", ctx.id);
      }
    },
    inputs: {
      id: "id"
    },
    exportAs: ["matTabNavPanel"],
    ngContentSelectors: _c02,
    decls: 1,
    vars: 0,
    template: function MatTabNavPanel_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabNavPanel, [{
    type: Component,
    args: [{
      selector: "mat-tab-nav-panel",
      exportAs: "matTabNavPanel",
      template: "<ng-content></ng-content>",
      host: {
        "[attr.aria-labelledby]": "_activeTabId",
        "[attr.id]": "id",
        "class": "mat-mdc-tab-nav-panel",
        "role": "tabpanel"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, {
    id: [{
      type: Input
    }]
  });
})();
var MatTabsModule = class _MatTabsModule {
  static \u0275fac = function MatTabsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTabsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatTabsModule,
    imports: [MatCommonModule, MatTabContent, MatTabLabel, MatTab, MatTabGroup, MatTabNav, MatTabNavPanel, MatTabLink],
    exports: [MatCommonModule, MatTabContent, MatTabLabel, MatTab, MatTabGroup, MatTabNav, MatTabNavPanel, MatTabLink]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTabsModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatTabContent, MatTabLabel, MatTab, MatTabGroup, MatTabNav, MatTabNavPanel, MatTabLink],
      exports: [MatCommonModule, MatTabContent, MatTabLabel, MatTab, MatTabGroup, MatTabNav, MatTabNavPanel, MatTabLink]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/ripple-loader.mjs
var eventListenerOptions = {
  capture: true
};
var rippleInteractionEvents = ["focus", "mousedown", "mouseenter", "touchstart"];
var matRippleUninitialized = "mat-ripple-loader-uninitialized";
var matRippleClassName = "mat-ripple-loader-class-name";
var matRippleCentered = "mat-ripple-loader-centered";
var matRippleDisabled = "mat-ripple-loader-disabled";
var MatRippleLoader = class _MatRippleLoader {
  _document = inject(DOCUMENT);
  _animationsDisabled = _animationsDisabled();
  _globalRippleOptions = inject(MAT_RIPPLE_GLOBAL_OPTIONS, {
    optional: true
  });
  _platform = inject(Platform);
  _ngZone = inject(NgZone);
  _injector = inject(Injector);
  _eventCleanups;
  _hosts = /* @__PURE__ */ new Map();
  constructor() {
    const renderer = inject(RendererFactory2).createRenderer(null, null);
    this._eventCleanups = this._ngZone.runOutsideAngular(() => rippleInteractionEvents.map((name) => renderer.listen(this._document, name, this._onInteraction, eventListenerOptions)));
  }
  ngOnDestroy() {
    const hosts = this._hosts.keys();
    for (const host of hosts) {
      this.destroyRipple(host);
    }
    this._eventCleanups.forEach((cleanup) => cleanup());
  }
  /**
   * Configures the ripple that will be rendered by the ripple loader.
   *
   * Stores the given information about how the ripple should be configured on the host
   * element so that it can later be retrived & used when the ripple is actually created.
   */
  configureRipple(host, config) {
    host.setAttribute(matRippleUninitialized, this._globalRippleOptions?.namespace ?? "");
    if (config.className || !host.hasAttribute(matRippleClassName)) {
      host.setAttribute(matRippleClassName, config.className || "");
    }
    if (config.centered) {
      host.setAttribute(matRippleCentered, "");
    }
    if (config.disabled) {
      host.setAttribute(matRippleDisabled, "");
    }
  }
  /** Sets the disabled state on the ripple instance corresponding to the given host element. */
  setDisabled(host, disabled) {
    const ripple = this._hosts.get(host);
    if (ripple) {
      ripple.target.rippleDisabled = disabled;
      if (!disabled && !ripple.hasSetUpEvents) {
        ripple.hasSetUpEvents = true;
        ripple.renderer.setupTriggerEvents(host);
      }
    } else if (disabled) {
      host.setAttribute(matRippleDisabled, "");
    } else {
      host.removeAttribute(matRippleDisabled);
    }
  }
  /**
   * Handles creating and attaching component internals
   * when a component is initially interacted with.
   */
  _onInteraction = (event) => {
    const eventTarget = _getEventTarget(event);
    if (eventTarget instanceof HTMLElement) {
      const element = eventTarget.closest(`[${matRippleUninitialized}="${this._globalRippleOptions?.namespace ?? ""}"]`);
      if (element) {
        this._createRipple(element);
      }
    }
  };
  /** Creates a MatRipple and appends it to the given element. */
  _createRipple(host) {
    if (!this._document || this._hosts.has(host)) {
      return;
    }
    host.querySelector(".mat-ripple")?.remove();
    const rippleEl = this._document.createElement("span");
    rippleEl.classList.add("mat-ripple", host.getAttribute(matRippleClassName));
    host.append(rippleEl);
    const globalOptions = this._globalRippleOptions;
    const enterDuration = this._animationsDisabled ? 0 : globalOptions?.animation?.enterDuration ?? defaultRippleAnimationConfig.enterDuration;
    const exitDuration = this._animationsDisabled ? 0 : globalOptions?.animation?.exitDuration ?? defaultRippleAnimationConfig.exitDuration;
    const target = {
      rippleDisabled: this._animationsDisabled || globalOptions?.disabled || host.hasAttribute(matRippleDisabled),
      rippleConfig: {
        centered: host.hasAttribute(matRippleCentered),
        terminateOnPointerUp: globalOptions?.terminateOnPointerUp,
        animation: {
          enterDuration,
          exitDuration
        }
      }
    };
    const renderer = new RippleRenderer(target, this._ngZone, rippleEl, this._platform, this._injector);
    const hasSetUpEvents = !target.rippleDisabled;
    if (hasSetUpEvents) {
      renderer.setupTriggerEvents(host);
    }
    this._hosts.set(host, {
      target,
      renderer,
      hasSetUpEvents
    });
    host.removeAttribute(matRippleUninitialized);
  }
  destroyRipple(host) {
    const ripple = this._hosts.get(host);
    if (ripple) {
      ripple.renderer._removeTriggerEvents();
      this._hosts.delete(host);
    }
  }
  static \u0275fac = function MatRippleLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatRippleLoader)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MatRippleLoader,
    factory: _MatRippleLoader.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRippleLoader, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/icon-button.mjs
var _c03 = ["mat-icon-button", ""];
var _c13 = ["*"];
var MAT_BUTTON_CONFIG = new InjectionToken("MAT_BUTTON_CONFIG");
function transformTabIndex(value) {
  return value == null ? void 0 : numberAttribute(value);
}
var MatButtonBase = class _MatButtonBase {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _animationsDisabled = _animationsDisabled();
  _config = inject(MAT_BUTTON_CONFIG, {
    optional: true
  });
  _focusMonitor = inject(FocusMonitor);
  _cleanupClick;
  _renderer = inject(Renderer2);
  /**
   * Handles the lazy creation of the MatButton ripple.
   * Used to improve initial load time of large applications.
   */
  _rippleLoader = inject(MatRippleLoader);
  /** Whether the button is set on an anchor node. */
  _isAnchor;
  /** Whether this button is a FAB. Used to apply the correct class on the ripple. */
  _isFab = false;
  /**
   * Theme color of the button. This API is supported in M2 themes only, it has
   * no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/button/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  color;
  /** Whether the ripple effect is disabled or not. */
  get disableRipple() {
    return this._disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = value;
    this._updateRippleDisabled();
  }
  _disableRipple = false;
  /** Whether the button is disabled. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._updateRippleDisabled();
  }
  _disabled = false;
  /** `aria-disabled` value of the button. */
  ariaDisabled;
  /**
   * Natively disabled buttons prevent focus and any pointer events from reaching the button.
   * In some scenarios this might not be desirable, because it can prevent users from finding out
   * why the button is disabled (e.g. via tooltip). This is also useful for buttons that may
   * become disabled when activated, which would cause focus to be transferred to the document
   * body instead of remaining on the button.
   *
   * Enabling this input will change the button so that it is styled to be disabled and will be
   * marked as `aria-disabled`, but it will allow the button to receive events and focus.
   *
   * Note that by enabling this, you need to set the `tabindex` yourself if the button isn't
   * meant to be tabbable and you have to prevent the button action (e.g. form submissions).
   */
  disabledInteractive;
  /** Tab index for the button. */
  tabIndex;
  /**
   * Backwards-compatibility input that handles pre-existing `[tabindex]` bindings.
   * @docs-private
   */
  set _tabindex(value) {
    this.tabIndex = value;
  }
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    const element = this._elementRef.nativeElement;
    this._isAnchor = element.tagName === "A";
    this.disabledInteractive = this._config?.disabledInteractive ?? false;
    this.color = this._config?.color ?? null;
    this._rippleLoader?.configureRipple(element, {
      className: "mat-mdc-button-ripple"
    });
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
    if (this._isAnchor) {
      this._setupAsAnchor();
    }
  }
  ngOnDestroy() {
    this._cleanupClick?.();
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);
  }
  /** Focuses the button. */
  focus(origin = "program", options) {
    if (origin) {
      this._focusMonitor.focusVia(this._elementRef.nativeElement, origin, options);
    } else {
      this._elementRef.nativeElement.focus(options);
    }
  }
  _getAriaDisabled() {
    if (this.ariaDisabled != null) {
      return this.ariaDisabled;
    }
    if (this._isAnchor) {
      return this.disabled || null;
    }
    return this.disabled && this.disabledInteractive ? true : null;
  }
  _getDisabledAttribute() {
    return this.disabledInteractive || !this.disabled ? null : true;
  }
  _updateRippleDisabled() {
    this._rippleLoader?.setDisabled(this._elementRef.nativeElement, this.disableRipple || this.disabled);
  }
  _getTabIndex() {
    if (this._isAnchor) {
      return this.disabled && !this.disabledInteractive ? -1 : this.tabIndex;
    }
    return this.tabIndex;
  }
  _setupAsAnchor() {
    this._cleanupClick = this._ngZone.runOutsideAngular(() => this._renderer.listen(this._elementRef.nativeElement, "click", (event) => {
      if (this.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }));
  }
  static \u0275fac = function MatButtonBase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatButtonBase)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatButtonBase,
    hostAttrs: [1, "mat-mdc-button-base"],
    hostVars: 13,
    hostBindings: function MatButtonBase_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("disabled", ctx._getDisabledAttribute())("aria-disabled", ctx._getAriaDisabled())("tabindex", ctx._getTabIndex());
        \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
        \u0275\u0275classProp("mat-mdc-button-disabled", ctx.disabled)("mat-mdc-button-disabled-interactive", ctx.disabledInteractive)("mat-unthemed", !ctx.color)("_mat-animation-noopable", ctx._animationsDisabled);
      }
    },
    inputs: {
      color: "color",
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      disabled: [2, "disabled", "disabled", booleanAttribute],
      ariaDisabled: [2, "aria-disabled", "ariaDisabled", booleanAttribute],
      disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute],
      tabIndex: [2, "tabIndex", "tabIndex", transformTabIndex],
      _tabindex: [2, "tabindex", "_tabindex", transformTabIndex]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonBase, [{
    type: Directive,
    args: [{
      host: {
        // Add a class that applies to all buttons. This makes it easier to target if somebody
        // wants to target all Material buttons.
        "class": "mat-mdc-button-base",
        "[class]": 'color ? "mat-" + color : ""',
        "[attr.disabled]": "_getDisabledAttribute()",
        "[attr.aria-disabled]": "_getAriaDisabled()",
        "[attr.tabindex]": "_getTabIndex()",
        "[class.mat-mdc-button-disabled]": "disabled",
        "[class.mat-mdc-button-disabled-interactive]": "disabledInteractive",
        "[class.mat-unthemed]": "!color",
        "[class._mat-animation-noopable]": "_animationsDisabled"
      }
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    ariaDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute,
        alias: "aria-disabled"
      }]
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: transformTabIndex
      }]
    }],
    _tabindex: [{
      type: Input,
      args: [{
        alias: "tabindex",
        transform: transformTabIndex
      }]
    }]
  });
})();
var MatIconButton = class _MatIconButton extends MatButtonBase {
  constructor() {
    super();
    this._rippleLoader.configureRipple(this._elementRef.nativeElement, {
      centered: true
    });
  }
  static \u0275fac = function MatIconButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatIconButton)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatIconButton,
    selectors: [["button", "mat-icon-button", ""], ["a", "mat-icon-button", ""], ["button", "matIconButton", ""], ["a", "matIconButton", ""]],
    hostAttrs: [1, "mdc-icon-button", "mat-mdc-icon-button"],
    exportAs: ["matButton", "matAnchor"],
    features: [\u0275\u0275InheritDefinitionFeature],
    attrs: _c03,
    ngContentSelectors: _c13,
    decls: 4,
    vars: 0,
    consts: [[1, "mat-mdc-button-persistent-ripple", "mdc-icon-button__ripple"], [1, "mat-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function MatIconButton_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domElement(0, "span", 0);
        \u0275\u0275projection(1);
        \u0275\u0275domElement(2, "span", 1)(3, "span", 2);
      }
    },
    styles: ['.mat-mdc-icon-button{-webkit-user-select:none;user-select:none;display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:rgba(0,0,0,0);fill:currentColor;text-decoration:none;cursor:pointer;z-index:0;overflow:visible;border-radius:var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));flex-shrink:0;text-align:center;width:var(--mat-icon-button-state-layer-size, 40px);height:var(--mat-icon-button-state-layer-size, 40px);padding:calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);font-size:var(--mat-icon-button-icon-size, 24px);color:var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-icon-button .mdc-button__label,.mat-mdc-icon-button .mat-icon{z-index:1;position:relative}.mat-mdc-icon-button .mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit}.mat-mdc-icon-button:focus>.mat-focus-indicator::before{content:"";border-radius:inherit}.mat-mdc-icon-button .mat-ripple-element{background-color:var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-icon-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-icon-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-icon-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-icon-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-icon-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-icon-button-touch-target-size, 48px);display:var(--mat-icon-button-touch-target-display, block);left:50%;width:var(--mat-icon-button-touch-target-size, 48px);transform:translate(-50%, -50%)}.mat-mdc-icon-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-icon-button[disabled],.mat-mdc-icon-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-icon-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-icon-button img,.mat-mdc-icon-button svg{width:var(--mat-icon-button-icon-size, 24px);height:var(--mat-icon-button-icon-size, 24px);vertical-align:baseline}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple{border-radius:var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%))}.mat-mdc-icon-button[hidden]{display:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:rgba(0,0,0,0);opacity:1}\n', "@media(forced-colors: active){.mat-mdc-button:not(.mdc-button--outlined),.mat-mdc-unelevated-button:not(.mdc-button--outlined),.mat-mdc-raised-button:not(.mdc-button--outlined),.mat-mdc-outlined-button:not(.mdc-button--outlined),.mat-mdc-button-base.mat-tonal-button,.mat-mdc-icon-button.mat-mdc-icon-button,.mat-mdc-outlined-button .mdc-button__ripple{outline:solid 1px}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatIconButton, [{
    type: Component,
    args: [{
      selector: `button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]`,
      host: {
        "class": "mdc-icon-button mat-mdc-icon-button"
      },
      exportAs: "matButton, matAnchor",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<span class="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span>

<ng-content></ng-content>

<!--
  The indicator can't be directly on the button, because MDC uses ::before for high contrast
  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.
-->
<span class="mat-focus-indicator"></span>

<span class="mat-mdc-button-touch-target"></span>
`,
      styles: ['.mat-mdc-icon-button{-webkit-user-select:none;user-select:none;display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:rgba(0,0,0,0);fill:currentColor;text-decoration:none;cursor:pointer;z-index:0;overflow:visible;border-radius:var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));flex-shrink:0;text-align:center;width:var(--mat-icon-button-state-layer-size, 40px);height:var(--mat-icon-button-state-layer-size, 40px);padding:calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);font-size:var(--mat-icon-button-icon-size, 24px);color:var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-icon-button .mdc-button__label,.mat-mdc-icon-button .mat-icon{z-index:1;position:relative}.mat-mdc-icon-button .mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit}.mat-mdc-icon-button:focus>.mat-focus-indicator::before{content:"";border-radius:inherit}.mat-mdc-icon-button .mat-ripple-element{background-color:var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-icon-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-icon-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-icon-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-icon-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-icon-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-icon-button-touch-target-size, 48px);display:var(--mat-icon-button-touch-target-display, block);left:50%;width:var(--mat-icon-button-touch-target-size, 48px);transform:translate(-50%, -50%)}.mat-mdc-icon-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-icon-button[disabled],.mat-mdc-icon-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-icon-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-icon-button img,.mat-mdc-icon-button svg{width:var(--mat-icon-button-icon-size, 24px);height:var(--mat-icon-button-icon-size, 24px);vertical-align:baseline}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple{border-radius:var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%))}.mat-mdc-icon-button[hidden]{display:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:rgba(0,0,0,0);opacity:1}\n', "@media(forced-colors: active){.mat-mdc-button:not(.mdc-button--outlined),.mat-mdc-unelevated-button:not(.mdc-button--outlined),.mat-mdc-raised-button:not(.mdc-button--outlined),.mat-mdc-outlined-button:not(.mdc-button--outlined),.mat-mdc-button-base.mat-tonal-button,.mat-mdc-icon-button.mat-mdc-icon-button,.mat-mdc-outlined-button .mdc-button__ripple{outline:solid 1px}}\n"]
    }]
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/ripple-module.mjs
var MatRippleModule = class _MatRippleModule {
  static \u0275fac = function MatRippleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatRippleModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatRippleModule,
    imports: [MatCommonModule, MatRipple],
    exports: [MatRipple, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRippleModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatRipple],
      exports: [MatRipple, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/button.mjs
var _c04 = ["matButton", ""];
var _c14 = [[["", 8, "material-icons", 3, "iconPositionEnd", ""], ["mat-icon", 3, "iconPositionEnd", ""], ["", "matButtonIcon", "", 3, "iconPositionEnd", ""]], "*", [["", "iconPositionEnd", "", 8, "material-icons"], ["mat-icon", "iconPositionEnd", ""], ["", "matButtonIcon", "", "iconPositionEnd", ""]]];
var _c22 = [".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])", "*", ".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"];
var _c32 = ["mat-fab", ""];
var _c42 = ["mat-mini-fab", ""];
var _c52 = '.mat-mdc-fab-base{-webkit-user-select:none;user-select:none;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);flex-shrink:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-fab-base .mat-mdc-button-ripple,.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab-base .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-fab-base .mdc-button__label,.mat-mdc-fab-base .mat-icon{z-index:1;position:relative}.mat-mdc-fab-base .mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-fab-base:focus>.mat-focus-indicator::before{content:""}.mat-mdc-fab-base._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-fab-base::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mat-mdc-fab-base[hidden]{display:none}.mat-mdc-fab-base::-moz-focus-inner{padding:0;border:0}.mat-mdc-fab-base:active,.mat-mdc-fab-base:focus{outline:none}.mat-mdc-fab-base:hover{cursor:pointer}.mat-mdc-fab-base>svg{width:100%}.mat-mdc-fab-base .mat-icon,.mat-mdc-fab-base .material-icons{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mat-mdc-fab-base .mat-focus-indicator::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-fab-base[disabled],.mat-mdc-fab-base.mat-mdc-button-disabled{cursor:default;pointer-events:none}.mat-mdc-fab-base[disabled],.mat-mdc-fab-base[disabled]:focus,.mat-mdc-fab-base.mat-mdc-button-disabled,.mat-mdc-fab-base.mat-mdc-button-disabled:focus{box-shadow:none}.mat-mdc-fab-base.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-fab{background-color:var(--mat-fab-container-color, var(--mat-sys-primary-container));border-radius:var(--mat-fab-container-shape, var(--mat-sys-corner-large));color:var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));box-shadow:var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-fab:hover{box-shadow:var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4))}.mat-mdc-fab:focus{box-shadow:var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-fab:active,.mat-mdc-fab:focus:active{box-shadow:var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-fab[disabled],.mat-mdc-fab.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-fab.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-fab-touch-target-size, 48px);display:var(--mat-fab-touch-target-display, block);left:50%;width:var(--mat-fab-touch-target-size, 48px);transform:translate(-50%, -50%)}.mat-mdc-fab .mat-ripple-element{background-color:var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container))}.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-disabled-state-layer-color)}.mat-mdc-fab:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-fab.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-fab.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-fab.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-fab:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-mini-fab{width:40px;height:40px;background-color:var(--mat-fab-small-container-color, var(--mat-sys-primary-container));border-radius:var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));color:var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));box-shadow:var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-mini-fab:hover{box-shadow:var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4))}.mat-mdc-mini-fab:focus{box-shadow:var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-mini-fab:active,.mat-mdc-mini-fab:focus:active{box-shadow:var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-mini-fab[disabled],.mat-mdc-mini-fab.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-mini-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-fab-small-touch-target-size, 48px);display:var(--mat-fab-small-touch-target-display);left:50%;width:var(--mat-fab-small-touch-target-size, 48px);transform:translate(-50%, -50%)}.mat-mdc-mini-fab .mat-ripple-element{background-color:var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container))}.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-small-disabled-state-layer-color)}.mat-mdc-mini-fab:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-mini-fab.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-mini-fab:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-extended-fab{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;padding-left:20px;padding-right:20px;width:auto;max-width:100%;line-height:normal;box-shadow:var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));height:var(--mat-fab-extended-container-height, 56px);border-radius:var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));font-family:var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));font-weight:var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));letter-spacing:var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking))}.mat-mdc-extended-fab:hover{box-shadow:var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4))}.mat-mdc-extended-fab:focus{box-shadow:var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-extended-fab:active,.mat-mdc-extended-fab:focus:active{box-shadow:var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-extended-fab[disabled],.mat-mdc-extended-fab.mat-mdc-button-disabled{cursor:default;pointer-events:none}.mat-mdc-extended-fab[disabled],.mat-mdc-extended-fab[disabled]:focus,.mat-mdc-extended-fab.mat-mdc-button-disabled,.mat-mdc-extended-fab.mat-mdc-button-disabled:focus{box-shadow:none}.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive{pointer-events:auto}[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.material-icons,.mat-mdc-extended-fab>.mat-icon,.mat-mdc-extended-fab>.material-icons{margin-left:-8px;margin-right:12px}.mat-mdc-extended-fab .mdc-button__label+.mat-icon,.mat-mdc-extended-fab .mdc-button__label+.material-icons,[dir=rtl] .mat-mdc-extended-fab>.mat-icon,[dir=rtl] .mat-mdc-extended-fab>.material-icons{margin-left:12px;margin-right:-8px}.mat-mdc-extended-fab .mat-mdc-button-touch-target{width:100%}\n';
var APPEARANCE_CLASSES = /* @__PURE__ */ new Map([["text", ["mat-mdc-button"]], ["filled", ["mdc-button--unelevated", "mat-mdc-unelevated-button"]], ["elevated", ["mdc-button--raised", "mat-mdc-raised-button"]], ["outlined", ["mdc-button--outlined", "mat-mdc-outlined-button"]], ["tonal", ["mat-tonal-button"]]]);
var MatButton = class _MatButton extends MatButtonBase {
  /** Appearance of the button. */
  get appearance() {
    return this._appearance;
  }
  set appearance(value) {
    this.setAppearance(value || this._config?.defaultAppearance || "text");
  }
  _appearance = null;
  constructor() {
    super();
    const inferredAppearance = _inferAppearance(this._elementRef.nativeElement);
    if (inferredAppearance) {
      this.setAppearance(inferredAppearance);
    }
  }
  /** Programmatically sets the appearance of the button. */
  setAppearance(appearance) {
    if (appearance === this._appearance) {
      return;
    }
    const classList = this._elementRef.nativeElement.classList;
    const previousClasses = this._appearance ? APPEARANCE_CLASSES.get(this._appearance) : null;
    const newClasses = APPEARANCE_CLASSES.get(appearance);
    if ((typeof ngDevMode === "undefined" || ngDevMode) && !newClasses) {
      throw new Error(`Unsupported MatButton appearance "${appearance}"`);
    }
    if (previousClasses) {
      classList.remove(...previousClasses);
    }
    classList.add(...newClasses);
    this._appearance = appearance;
  }
  static \u0275fac = function MatButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatButton)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatButton,
    selectors: [["button", "matButton", ""], ["a", "matButton", ""], ["button", "mat-button", ""], ["button", "mat-raised-button", ""], ["button", "mat-flat-button", ""], ["button", "mat-stroked-button", ""], ["a", "mat-button", ""], ["a", "mat-raised-button", ""], ["a", "mat-flat-button", ""], ["a", "mat-stroked-button", ""]],
    hostAttrs: [1, "mdc-button"],
    inputs: {
      appearance: [0, "matButton", "appearance"]
    },
    exportAs: ["matButton", "matAnchor"],
    features: [\u0275\u0275InheritDefinitionFeature],
    attrs: _c04,
    ngContentSelectors: _c22,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function MatButton_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c14);
        \u0275\u0275domElement(0, "span", 0);
        \u0275\u0275projection(1);
        \u0275\u0275domElementStart(2, "span", 1);
        \u0275\u0275projection(3, 1);
        \u0275\u0275domElementEnd();
        \u0275\u0275projection(4, 2);
        \u0275\u0275domElement(5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        \u0275\u0275classProp("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: ['.mat-mdc-button-base{text-decoration:none}.mat-mdc-button-base .mat-icon{min-height:fit-content;flex-shrink:0}.mdc-button{-webkit-user-select:none;user-select:none;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:rgba(0,0,0,0);padding:0 8px}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button[hidden]{display:none}.mdc-button .mdc-button__label{position:relative}.mat-mdc-button{padding:0 var(--mat-button-text-horizontal-padding, 12px);height:var(--mat-button-text-container-height, 40px);font-family:var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-text-label-text-transform);font-weight:var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight))}.mat-mdc-button,.mat-mdc-button .mdc-button__ripple{border-radius:var(--mat-button-text-container-shape, var(--mat-sys-corner-full))}.mat-mdc-button:not(:disabled){color:var(--mat-button-text-label-text-color, var(--mat-sys-primary))}.mat-mdc-button[disabled],.mat-mdc-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-button:has(.material-icons,mat-icon,[matButtonIcon]){padding:0 var(--mat-button-text-with-icon-horizontal-padding, 16px)}.mat-mdc-button>.mat-icon{margin-right:var(--mat-button-text-icon-spacing, 8px);margin-left:var(--mat-button-text-icon-offset, -4px)}[dir=rtl] .mat-mdc-button>.mat-icon{margin-right:var(--mat-button-text-icon-offset, -4px);margin-left:var(--mat-button-text-icon-spacing, 8px)}.mat-mdc-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-text-icon-offset, -4px);margin-left:var(--mat-button-text-icon-spacing, 8px)}[dir=rtl] .mat-mdc-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-text-icon-spacing, 8px);margin-left:var(--mat-button-text-icon-offset, -4px)}.mat-mdc-button .mat-ripple-element{background-color:var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-text-state-layer-color, var(--mat-sys-primary))}.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-text-touch-target-size, 48px);display:var(--mat-button-text-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-unelevated-button{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);height:var(--mat-button-filled-container-height, 40px);font-family:var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-filled-label-text-transform);font-weight:var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));padding:0 var(--mat-button-filled-horizontal-padding, 24px)}.mat-mdc-unelevated-button>.mat-icon{margin-right:var(--mat-button-filled-icon-spacing, 8px);margin-left:var(--mat-button-filled-icon-offset, -8px)}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon{margin-right:var(--mat-button-filled-icon-offset, -8px);margin-left:var(--mat-button-filled-icon-spacing, 8px)}.mat-mdc-unelevated-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-filled-icon-offset, -8px);margin-left:var(--mat-button-filled-icon-spacing, 8px)}[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-filled-icon-spacing, 8px);margin-left:var(--mat-button-filled-icon-offset, -8px)}.mat-mdc-unelevated-button .mat-ripple-element{background-color:var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary))}.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-unelevated-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-unelevated-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-unelevated-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-unelevated-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-filled-touch-target-size, 48px);display:var(--mat-button-filled-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-unelevated-button:not(:disabled){color:var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));background-color:var(--mat-button-filled-container-color, var(--mat-sys-primary))}.mat-mdc-unelevated-button,.mat-mdc-unelevated-button .mdc-button__ripple{border-radius:var(--mat-button-filled-container-shape, var(--mat-sys-corner-full))}.mat-mdc-unelevated-button[disabled],.mat-mdc-unelevated-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-raised-button{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);box-shadow:var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));height:var(--mat-button-protected-container-height, 40px);font-family:var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-protected-label-text-transform);font-weight:var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));padding:0 var(--mat-button-protected-horizontal-padding, 24px)}.mat-mdc-raised-button>.mat-icon{margin-right:var(--mat-button-protected-icon-spacing, 8px);margin-left:var(--mat-button-protected-icon-offset, -8px)}[dir=rtl] .mat-mdc-raised-button>.mat-icon{margin-right:var(--mat-button-protected-icon-offset, -8px);margin-left:var(--mat-button-protected-icon-spacing, 8px)}.mat-mdc-raised-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-protected-icon-offset, -8px);margin-left:var(--mat-button-protected-icon-spacing, 8px)}[dir=rtl] .mat-mdc-raised-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-protected-icon-spacing, 8px);margin-left:var(--mat-button-protected-icon-offset, -8px)}.mat-mdc-raised-button .mat-ripple-element{background-color:var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-protected-state-layer-color, var(--mat-sys-primary))}.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-raised-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-raised-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-raised-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-raised-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-protected-touch-target-size, 48px);display:var(--mat-button-protected-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-raised-button:not(:disabled){color:var(--mat-button-protected-label-text-color, var(--mat-sys-primary));background-color:var(--mat-button-protected-container-color, var(--mat-sys-surface))}.mat-mdc-raised-button,.mat-mdc-raised-button .mdc-button__ripple{border-radius:var(--mat-button-protected-container-shape, var(--mat-sys-corner-full))}.mat-mdc-raised-button:hover{box-shadow:var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2))}.mat-mdc-raised-button:focus{box-shadow:var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1))}.mat-mdc-raised-button:active,.mat-mdc-raised-button:focus:active{box-shadow:var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1))}.mat-mdc-raised-button[disabled],.mat-mdc-raised-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-raised-button[disabled].mat-mdc-button-disabled,.mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled{box-shadow:var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0))}.mat-mdc-raised-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-outlined-button{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1);height:var(--mat-button-outlined-container-height, 40px);font-family:var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-outlined-label-text-transform);font-weight:var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));border-radius:var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));border-width:var(--mat-button-outlined-outline-width, 1px);padding:0 var(--mat-button-outlined-horizontal-padding, 24px)}.mat-mdc-outlined-button>.mat-icon{margin-right:var(--mat-button-outlined-icon-spacing, 8px);margin-left:var(--mat-button-outlined-icon-offset, -8px)}[dir=rtl] .mat-mdc-outlined-button>.mat-icon{margin-right:var(--mat-button-outlined-icon-offset, -8px);margin-left:var(--mat-button-outlined-icon-spacing, 8px)}.mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-outlined-icon-offset, -8px);margin-left:var(--mat-button-outlined-icon-spacing, 8px)}[dir=rtl] .mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-outlined-icon-spacing, 8px);margin-left:var(--mat-button-outlined-icon-offset, -8px)}.mat-mdc-outlined-button .mat-ripple-element{background-color:var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary))}.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-outlined-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-outlined-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-outlined-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-outlined-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-outlined-touch-target-size, 48px);display:var(--mat-button-outlined-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-outlined-button:not(:disabled){color:var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));border-color:var(--mat-button-outlined-outline-color, var(--mat-sys-outline))}.mat-mdc-outlined-button[disabled],.mat-mdc-outlined-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));border-color:var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-tonal-button{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);height:var(--mat-button-tonal-container-height, 40px);font-family:var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-tonal-label-text-transform);font-weight:var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));padding:0 var(--mat-button-tonal-horizontal-padding, 24px)}.mat-tonal-button:not(:disabled){color:var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));background-color:var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container))}.mat-tonal-button,.mat-tonal-button .mdc-button__ripple{border-radius:var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full))}.mat-tonal-button[disabled],.mat-tonal-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-tonal-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-tonal-button>.mat-icon{margin-right:var(--mat-button-tonal-icon-spacing, 8px);margin-left:var(--mat-button-tonal-icon-offset, -8px)}[dir=rtl] .mat-tonal-button>.mat-icon{margin-right:var(--mat-button-tonal-icon-offset, -8px);margin-left:var(--mat-button-tonal-icon-spacing, 8px)}.mat-tonal-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-tonal-icon-offset, -8px);margin-left:var(--mat-button-tonal-icon-spacing, 8px)}[dir=rtl] .mat-tonal-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-tonal-icon-spacing, 8px);margin-left:var(--mat-button-tonal-icon-offset, -8px)}.mat-tonal-button .mat-ripple-element{background-color:var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-tonal-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container))}.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-tonal-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-tonal-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-tonal-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-tonal-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-tonal-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-tonal-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-tonal-touch-target-size, 48px);display:var(--mat-button-tonal-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-button,.mat-mdc-unelevated-button,.mat-mdc-raised-button,.mat-mdc-outlined-button,.mat-tonal-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,.mat-tonal-button .mat-mdc-button-ripple,.mat-tonal-button .mat-mdc-button-persistent-ripple,.mat-tonal-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-tonal-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,.mat-tonal-button .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-button .mdc-button__label,.mat-mdc-button .mat-icon,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-unelevated-button .mat-icon,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-raised-button .mat-icon,.mat-mdc-outlined-button .mdc-button__label,.mat-mdc-outlined-button .mat-icon,.mat-tonal-button .mdc-button__label,.mat-tonal-button .mat-icon{z-index:1;position:relative}.mat-mdc-button .mat-focus-indicator,.mat-mdc-unelevated-button .mat-focus-indicator,.mat-mdc-raised-button .mat-focus-indicator,.mat-mdc-outlined-button .mat-focus-indicator,.mat-tonal-button .mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit}.mat-mdc-button:focus>.mat-focus-indicator::before,.mat-mdc-unelevated-button:focus>.mat-focus-indicator::before,.mat-mdc-raised-button:focus>.mat-focus-indicator::before,.mat-mdc-outlined-button:focus>.mat-focus-indicator::before,.mat-tonal-button:focus>.mat-focus-indicator::before{content:"";border-radius:inherit}.mat-mdc-button._mat-animation-noopable,.mat-mdc-unelevated-button._mat-animation-noopable,.mat-mdc-raised-button._mat-animation-noopable,.mat-mdc-outlined-button._mat-animation-noopable,.mat-tonal-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon,.mat-mdc-raised-button>.mat-icon,.mat-mdc-outlined-button>.mat-icon,.mat-tonal-button>.mat-icon{display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px}.mat-mdc-unelevated-button .mat-focus-indicator::before,.mat-tonal-button .mat-focus-indicator::before,.mat-mdc-raised-button .mat-focus-indicator::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-outlined-button .mat-focus-indicator::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px)*-1)}\n', "@media(forced-colors: active){.mat-mdc-button:not(.mdc-button--outlined),.mat-mdc-unelevated-button:not(.mdc-button--outlined),.mat-mdc-raised-button:not(.mdc-button--outlined),.mat-mdc-outlined-button:not(.mdc-button--outlined),.mat-mdc-button-base.mat-tonal-button,.mat-mdc-icon-button.mat-mdc-icon-button,.mat-mdc-outlined-button .mdc-button__ripple{outline:solid 1px}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButton, [{
    type: Component,
    args: [{
      selector: `
    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],
    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],
    a[mat-flat-button], a[mat-stroked-button]
  `,
      host: {
        "class": "mdc-button"
      },
      exportAs: "matButton, matAnchor",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<span
    class="mat-mdc-button-persistent-ripple"
    [class.mdc-button__ripple]="!_isFab"
    [class.mdc-fab__ripple]="_isFab"></span>

<ng-content select=".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])">
</ng-content>

<span class="mdc-button__label"><ng-content></ng-content></span>

<ng-content select=".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]">
</ng-content>

<!--
  The indicator can't be directly on the button, because MDC uses ::before for high contrast
  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.
-->
<span class="mat-focus-indicator"></span>

<span class="mat-mdc-button-touch-target"></span>
`,
      styles: ['.mat-mdc-button-base{text-decoration:none}.mat-mdc-button-base .mat-icon{min-height:fit-content;flex-shrink:0}.mdc-button{-webkit-user-select:none;user-select:none;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:rgba(0,0,0,0);padding:0 8px}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button[hidden]{display:none}.mdc-button .mdc-button__label{position:relative}.mat-mdc-button{padding:0 var(--mat-button-text-horizontal-padding, 12px);height:var(--mat-button-text-container-height, 40px);font-family:var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-text-label-text-transform);font-weight:var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight))}.mat-mdc-button,.mat-mdc-button .mdc-button__ripple{border-radius:var(--mat-button-text-container-shape, var(--mat-sys-corner-full))}.mat-mdc-button:not(:disabled){color:var(--mat-button-text-label-text-color, var(--mat-sys-primary))}.mat-mdc-button[disabled],.mat-mdc-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-button:has(.material-icons,mat-icon,[matButtonIcon]){padding:0 var(--mat-button-text-with-icon-horizontal-padding, 16px)}.mat-mdc-button>.mat-icon{margin-right:var(--mat-button-text-icon-spacing, 8px);margin-left:var(--mat-button-text-icon-offset, -4px)}[dir=rtl] .mat-mdc-button>.mat-icon{margin-right:var(--mat-button-text-icon-offset, -4px);margin-left:var(--mat-button-text-icon-spacing, 8px)}.mat-mdc-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-text-icon-offset, -4px);margin-left:var(--mat-button-text-icon-spacing, 8px)}[dir=rtl] .mat-mdc-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-text-icon-spacing, 8px);margin-left:var(--mat-button-text-icon-offset, -4px)}.mat-mdc-button .mat-ripple-element{background-color:var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-text-state-layer-color, var(--mat-sys-primary))}.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-text-touch-target-size, 48px);display:var(--mat-button-text-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-unelevated-button{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);height:var(--mat-button-filled-container-height, 40px);font-family:var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-filled-label-text-transform);font-weight:var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));padding:0 var(--mat-button-filled-horizontal-padding, 24px)}.mat-mdc-unelevated-button>.mat-icon{margin-right:var(--mat-button-filled-icon-spacing, 8px);margin-left:var(--mat-button-filled-icon-offset, -8px)}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon{margin-right:var(--mat-button-filled-icon-offset, -8px);margin-left:var(--mat-button-filled-icon-spacing, 8px)}.mat-mdc-unelevated-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-filled-icon-offset, -8px);margin-left:var(--mat-button-filled-icon-spacing, 8px)}[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-filled-icon-spacing, 8px);margin-left:var(--mat-button-filled-icon-offset, -8px)}.mat-mdc-unelevated-button .mat-ripple-element{background-color:var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary))}.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-unelevated-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-unelevated-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-unelevated-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-unelevated-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-filled-touch-target-size, 48px);display:var(--mat-button-filled-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-unelevated-button:not(:disabled){color:var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));background-color:var(--mat-button-filled-container-color, var(--mat-sys-primary))}.mat-mdc-unelevated-button,.mat-mdc-unelevated-button .mdc-button__ripple{border-radius:var(--mat-button-filled-container-shape, var(--mat-sys-corner-full))}.mat-mdc-unelevated-button[disabled],.mat-mdc-unelevated-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-raised-button{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);box-shadow:var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));height:var(--mat-button-protected-container-height, 40px);font-family:var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-protected-label-text-transform);font-weight:var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));padding:0 var(--mat-button-protected-horizontal-padding, 24px)}.mat-mdc-raised-button>.mat-icon{margin-right:var(--mat-button-protected-icon-spacing, 8px);margin-left:var(--mat-button-protected-icon-offset, -8px)}[dir=rtl] .mat-mdc-raised-button>.mat-icon{margin-right:var(--mat-button-protected-icon-offset, -8px);margin-left:var(--mat-button-protected-icon-spacing, 8px)}.mat-mdc-raised-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-protected-icon-offset, -8px);margin-left:var(--mat-button-protected-icon-spacing, 8px)}[dir=rtl] .mat-mdc-raised-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-protected-icon-spacing, 8px);margin-left:var(--mat-button-protected-icon-offset, -8px)}.mat-mdc-raised-button .mat-ripple-element{background-color:var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-protected-state-layer-color, var(--mat-sys-primary))}.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-raised-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-raised-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-raised-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-raised-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-protected-touch-target-size, 48px);display:var(--mat-button-protected-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-raised-button:not(:disabled){color:var(--mat-button-protected-label-text-color, var(--mat-sys-primary));background-color:var(--mat-button-protected-container-color, var(--mat-sys-surface))}.mat-mdc-raised-button,.mat-mdc-raised-button .mdc-button__ripple{border-radius:var(--mat-button-protected-container-shape, var(--mat-sys-corner-full))}.mat-mdc-raised-button:hover{box-shadow:var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2))}.mat-mdc-raised-button:focus{box-shadow:var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1))}.mat-mdc-raised-button:active,.mat-mdc-raised-button:focus:active{box-shadow:var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1))}.mat-mdc-raised-button[disabled],.mat-mdc-raised-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-raised-button[disabled].mat-mdc-button-disabled,.mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled{box-shadow:var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0))}.mat-mdc-raised-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-outlined-button{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1);height:var(--mat-button-outlined-container-height, 40px);font-family:var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-outlined-label-text-transform);font-weight:var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));border-radius:var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));border-width:var(--mat-button-outlined-outline-width, 1px);padding:0 var(--mat-button-outlined-horizontal-padding, 24px)}.mat-mdc-outlined-button>.mat-icon{margin-right:var(--mat-button-outlined-icon-spacing, 8px);margin-left:var(--mat-button-outlined-icon-offset, -8px)}[dir=rtl] .mat-mdc-outlined-button>.mat-icon{margin-right:var(--mat-button-outlined-icon-offset, -8px);margin-left:var(--mat-button-outlined-icon-spacing, 8px)}.mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-outlined-icon-offset, -8px);margin-left:var(--mat-button-outlined-icon-spacing, 8px)}[dir=rtl] .mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-outlined-icon-spacing, 8px);margin-left:var(--mat-button-outlined-icon-offset, -8px)}.mat-mdc-outlined-button .mat-ripple-element{background-color:var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary))}.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-outlined-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-outlined-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-outlined-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-outlined-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-outlined-touch-target-size, 48px);display:var(--mat-button-outlined-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-outlined-button:not(:disabled){color:var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));border-color:var(--mat-button-outlined-outline-color, var(--mat-sys-outline))}.mat-mdc-outlined-button[disabled],.mat-mdc-outlined-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));border-color:var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-tonal-button{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);height:var(--mat-button-tonal-container-height, 40px);font-family:var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-tonal-label-text-transform);font-weight:var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));padding:0 var(--mat-button-tonal-horizontal-padding, 24px)}.mat-tonal-button:not(:disabled){color:var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));background-color:var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container))}.mat-tonal-button,.mat-tonal-button .mdc-button__ripple{border-radius:var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full))}.mat-tonal-button[disabled],.mat-tonal-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-tonal-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-tonal-button>.mat-icon{margin-right:var(--mat-button-tonal-icon-spacing, 8px);margin-left:var(--mat-button-tonal-icon-offset, -8px)}[dir=rtl] .mat-tonal-button>.mat-icon{margin-right:var(--mat-button-tonal-icon-offset, -8px);margin-left:var(--mat-button-tonal-icon-spacing, 8px)}.mat-tonal-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-tonal-icon-offset, -8px);margin-left:var(--mat-button-tonal-icon-spacing, 8px)}[dir=rtl] .mat-tonal-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-tonal-icon-spacing, 8px);margin-left:var(--mat-button-tonal-icon-offset, -8px)}.mat-tonal-button .mat-ripple-element{background-color:var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-tonal-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container))}.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-tonal-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-tonal-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-tonal-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-tonal-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-tonal-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-tonal-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-tonal-touch-target-size, 48px);display:var(--mat-button-tonal-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-button,.mat-mdc-unelevated-button,.mat-mdc-raised-button,.mat-mdc-outlined-button,.mat-tonal-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,.mat-tonal-button .mat-mdc-button-ripple,.mat-tonal-button .mat-mdc-button-persistent-ripple,.mat-tonal-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-tonal-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,.mat-tonal-button .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-button .mdc-button__label,.mat-mdc-button .mat-icon,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-unelevated-button .mat-icon,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-raised-button .mat-icon,.mat-mdc-outlined-button .mdc-button__label,.mat-mdc-outlined-button .mat-icon,.mat-tonal-button .mdc-button__label,.mat-tonal-button .mat-icon{z-index:1;position:relative}.mat-mdc-button .mat-focus-indicator,.mat-mdc-unelevated-button .mat-focus-indicator,.mat-mdc-raised-button .mat-focus-indicator,.mat-mdc-outlined-button .mat-focus-indicator,.mat-tonal-button .mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit}.mat-mdc-button:focus>.mat-focus-indicator::before,.mat-mdc-unelevated-button:focus>.mat-focus-indicator::before,.mat-mdc-raised-button:focus>.mat-focus-indicator::before,.mat-mdc-outlined-button:focus>.mat-focus-indicator::before,.mat-tonal-button:focus>.mat-focus-indicator::before{content:"";border-radius:inherit}.mat-mdc-button._mat-animation-noopable,.mat-mdc-unelevated-button._mat-animation-noopable,.mat-mdc-raised-button._mat-animation-noopable,.mat-mdc-outlined-button._mat-animation-noopable,.mat-tonal-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon,.mat-mdc-raised-button>.mat-icon,.mat-mdc-outlined-button>.mat-icon,.mat-tonal-button>.mat-icon{display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px}.mat-mdc-unelevated-button .mat-focus-indicator::before,.mat-tonal-button .mat-focus-indicator::before,.mat-mdc-raised-button .mat-focus-indicator::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-outlined-button .mat-focus-indicator::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px)*-1)}\n', "@media(forced-colors: active){.mat-mdc-button:not(.mdc-button--outlined),.mat-mdc-unelevated-button:not(.mdc-button--outlined),.mat-mdc-raised-button:not(.mdc-button--outlined),.mat-mdc-outlined-button:not(.mdc-button--outlined),.mat-mdc-button-base.mat-tonal-button,.mat-mdc-icon-button.mat-mdc-icon-button,.mat-mdc-outlined-button .mdc-button__ripple{outline:solid 1px}}\n"]
    }]
  }], () => [], {
    appearance: [{
      type: Input,
      args: ["matButton"]
    }]
  });
})();
function _inferAppearance(button) {
  if (button.hasAttribute("mat-raised-button")) {
    return "elevated";
  }
  if (button.hasAttribute("mat-stroked-button")) {
    return "outlined";
  }
  if (button.hasAttribute("mat-flat-button")) {
    return "filled";
  }
  if (button.hasAttribute("mat-button")) {
    return "text";
  }
  return null;
}
var MAT_FAB_DEFAULT_OPTIONS = new InjectionToken("mat-mdc-fab-default-options", {
  providedIn: "root",
  factory: MAT_FAB_DEFAULT_OPTIONS_FACTORY
});
function MAT_FAB_DEFAULT_OPTIONS_FACTORY() {
  return {
    // The FAB by default has its color set to accent.
    color: "accent"
  };
}
var defaults = MAT_FAB_DEFAULT_OPTIONS_FACTORY();
var MatFabButton = class _MatFabButton extends MatButtonBase {
  _options = inject(MAT_FAB_DEFAULT_OPTIONS, {
    optional: true
  });
  _isFab = true;
  extended;
  constructor() {
    super();
    this._options = this._options || defaults;
    this.color = this._options.color || defaults.color;
  }
  static \u0275fac = function MatFabButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFabButton)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatFabButton,
    selectors: [["button", "mat-fab", ""], ["a", "mat-fab", ""], ["button", "matFab", ""], ["a", "matFab", ""]],
    hostAttrs: [1, "mdc-fab", "mat-mdc-fab-base", "mat-mdc-fab"],
    hostVars: 4,
    hostBindings: function MatFabButton_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mdc-fab--extended", ctx.extended)("mat-mdc-extended-fab", ctx.extended);
      }
    },
    inputs: {
      extended: [2, "extended", "extended", booleanAttribute]
    },
    exportAs: ["matButton", "matAnchor"],
    features: [\u0275\u0275InheritDefinitionFeature],
    attrs: _c32,
    ngContentSelectors: _c22,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function MatFabButton_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c14);
        \u0275\u0275domElement(0, "span", 0);
        \u0275\u0275projection(1);
        \u0275\u0275domElementStart(2, "span", 1);
        \u0275\u0275projection(3, 1);
        \u0275\u0275domElementEnd();
        \u0275\u0275projection(4, 2);
        \u0275\u0275domElement(5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        \u0275\u0275classProp("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: ['.mat-mdc-fab-base{-webkit-user-select:none;user-select:none;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);flex-shrink:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-fab-base .mat-mdc-button-ripple,.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab-base .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-fab-base .mdc-button__label,.mat-mdc-fab-base .mat-icon{z-index:1;position:relative}.mat-mdc-fab-base .mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-fab-base:focus>.mat-focus-indicator::before{content:""}.mat-mdc-fab-base._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-fab-base::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mat-mdc-fab-base[hidden]{display:none}.mat-mdc-fab-base::-moz-focus-inner{padding:0;border:0}.mat-mdc-fab-base:active,.mat-mdc-fab-base:focus{outline:none}.mat-mdc-fab-base:hover{cursor:pointer}.mat-mdc-fab-base>svg{width:100%}.mat-mdc-fab-base .mat-icon,.mat-mdc-fab-base .material-icons{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mat-mdc-fab-base .mat-focus-indicator::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-fab-base[disabled],.mat-mdc-fab-base.mat-mdc-button-disabled{cursor:default;pointer-events:none}.mat-mdc-fab-base[disabled],.mat-mdc-fab-base[disabled]:focus,.mat-mdc-fab-base.mat-mdc-button-disabled,.mat-mdc-fab-base.mat-mdc-button-disabled:focus{box-shadow:none}.mat-mdc-fab-base.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-fab{background-color:var(--mat-fab-container-color, var(--mat-sys-primary-container));border-radius:var(--mat-fab-container-shape, var(--mat-sys-corner-large));color:var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));box-shadow:var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-fab:hover{box-shadow:var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4))}.mat-mdc-fab:focus{box-shadow:var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-fab:active,.mat-mdc-fab:focus:active{box-shadow:var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-fab[disabled],.mat-mdc-fab.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-fab.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-fab-touch-target-size, 48px);display:var(--mat-fab-touch-target-display, block);left:50%;width:var(--mat-fab-touch-target-size, 48px);transform:translate(-50%, -50%)}.mat-mdc-fab .mat-ripple-element{background-color:var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container))}.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-disabled-state-layer-color)}.mat-mdc-fab:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-fab.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-fab.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-fab.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-fab:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-mini-fab{width:40px;height:40px;background-color:var(--mat-fab-small-container-color, var(--mat-sys-primary-container));border-radius:var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));color:var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));box-shadow:var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-mini-fab:hover{box-shadow:var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4))}.mat-mdc-mini-fab:focus{box-shadow:var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-mini-fab:active,.mat-mdc-mini-fab:focus:active{box-shadow:var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-mini-fab[disabled],.mat-mdc-mini-fab.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-mini-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-fab-small-touch-target-size, 48px);display:var(--mat-fab-small-touch-target-display);left:50%;width:var(--mat-fab-small-touch-target-size, 48px);transform:translate(-50%, -50%)}.mat-mdc-mini-fab .mat-ripple-element{background-color:var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container))}.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-small-disabled-state-layer-color)}.mat-mdc-mini-fab:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-mini-fab.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-mini-fab:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-extended-fab{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;padding-left:20px;padding-right:20px;width:auto;max-width:100%;line-height:normal;box-shadow:var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));height:var(--mat-fab-extended-container-height, 56px);border-radius:var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));font-family:var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));font-weight:var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));letter-spacing:var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking))}.mat-mdc-extended-fab:hover{box-shadow:var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4))}.mat-mdc-extended-fab:focus{box-shadow:var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-extended-fab:active,.mat-mdc-extended-fab:focus:active{box-shadow:var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-extended-fab[disabled],.mat-mdc-extended-fab.mat-mdc-button-disabled{cursor:default;pointer-events:none}.mat-mdc-extended-fab[disabled],.mat-mdc-extended-fab[disabled]:focus,.mat-mdc-extended-fab.mat-mdc-button-disabled,.mat-mdc-extended-fab.mat-mdc-button-disabled:focus{box-shadow:none}.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive{pointer-events:auto}[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.material-icons,.mat-mdc-extended-fab>.mat-icon,.mat-mdc-extended-fab>.material-icons{margin-left:-8px;margin-right:12px}.mat-mdc-extended-fab .mdc-button__label+.mat-icon,.mat-mdc-extended-fab .mdc-button__label+.material-icons,[dir=rtl] .mat-mdc-extended-fab>.mat-icon,[dir=rtl] .mat-mdc-extended-fab>.material-icons{margin-left:12px;margin-right:-8px}.mat-mdc-extended-fab .mat-mdc-button-touch-target{width:100%}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFabButton, [{
    type: Component,
    args: [{
      selector: `button[mat-fab], a[mat-fab], button[matFab], a[matFab]`,
      host: {
        "class": "mdc-fab mat-mdc-fab-base mat-mdc-fab",
        "[class.mdc-fab--extended]": "extended",
        "[class.mat-mdc-extended-fab]": "extended"
      },
      exportAs: "matButton, matAnchor",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<span
    class="mat-mdc-button-persistent-ripple"
    [class.mdc-button__ripple]="!_isFab"
    [class.mdc-fab__ripple]="_isFab"></span>

<ng-content select=".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])">
</ng-content>

<span class="mdc-button__label"><ng-content></ng-content></span>

<ng-content select=".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]">
</ng-content>

<!--
  The indicator can't be directly on the button, because MDC uses ::before for high contrast
  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.
-->
<span class="mat-focus-indicator"></span>

<span class="mat-mdc-button-touch-target"></span>
`,
      styles: ['.mat-mdc-fab-base{-webkit-user-select:none;user-select:none;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);flex-shrink:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-fab-base .mat-mdc-button-ripple,.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab-base .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-fab-base .mdc-button__label,.mat-mdc-fab-base .mat-icon{z-index:1;position:relative}.mat-mdc-fab-base .mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-fab-base:focus>.mat-focus-indicator::before{content:""}.mat-mdc-fab-base._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-fab-base::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mat-mdc-fab-base[hidden]{display:none}.mat-mdc-fab-base::-moz-focus-inner{padding:0;border:0}.mat-mdc-fab-base:active,.mat-mdc-fab-base:focus{outline:none}.mat-mdc-fab-base:hover{cursor:pointer}.mat-mdc-fab-base>svg{width:100%}.mat-mdc-fab-base .mat-icon,.mat-mdc-fab-base .material-icons{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mat-mdc-fab-base .mat-focus-indicator::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-fab-base[disabled],.mat-mdc-fab-base.mat-mdc-button-disabled{cursor:default;pointer-events:none}.mat-mdc-fab-base[disabled],.mat-mdc-fab-base[disabled]:focus,.mat-mdc-fab-base.mat-mdc-button-disabled,.mat-mdc-fab-base.mat-mdc-button-disabled:focus{box-shadow:none}.mat-mdc-fab-base.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-fab{background-color:var(--mat-fab-container-color, var(--mat-sys-primary-container));border-radius:var(--mat-fab-container-shape, var(--mat-sys-corner-large));color:var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));box-shadow:var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-fab:hover{box-shadow:var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4))}.mat-mdc-fab:focus{box-shadow:var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-fab:active,.mat-mdc-fab:focus:active{box-shadow:var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-fab[disabled],.mat-mdc-fab.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-fab.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-fab-touch-target-size, 48px);display:var(--mat-fab-touch-target-display, block);left:50%;width:var(--mat-fab-touch-target-size, 48px);transform:translate(-50%, -50%)}.mat-mdc-fab .mat-ripple-element{background-color:var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container))}.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-disabled-state-layer-color)}.mat-mdc-fab:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-fab.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-fab.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-fab.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-fab:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-mini-fab{width:40px;height:40px;background-color:var(--mat-fab-small-container-color, var(--mat-sys-primary-container));border-radius:var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));color:var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));box-shadow:var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-mini-fab:hover{box-shadow:var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4))}.mat-mdc-mini-fab:focus{box-shadow:var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-mini-fab:active,.mat-mdc-mini-fab:focus:active{box-shadow:var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-mini-fab[disabled],.mat-mdc-mini-fab.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-mini-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-fab-small-touch-target-size, 48px);display:var(--mat-fab-small-touch-target-display);left:50%;width:var(--mat-fab-small-touch-target-size, 48px);transform:translate(-50%, -50%)}.mat-mdc-mini-fab .mat-ripple-element{background-color:var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container))}.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-small-disabled-state-layer-color)}.mat-mdc-mini-fab:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-mini-fab.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-mini-fab:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-extended-fab{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;padding-left:20px;padding-right:20px;width:auto;max-width:100%;line-height:normal;box-shadow:var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));height:var(--mat-fab-extended-container-height, 56px);border-radius:var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));font-family:var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));font-weight:var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));letter-spacing:var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking))}.mat-mdc-extended-fab:hover{box-shadow:var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4))}.mat-mdc-extended-fab:focus{box-shadow:var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-extended-fab:active,.mat-mdc-extended-fab:focus:active{box-shadow:var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-extended-fab[disabled],.mat-mdc-extended-fab.mat-mdc-button-disabled{cursor:default;pointer-events:none}.mat-mdc-extended-fab[disabled],.mat-mdc-extended-fab[disabled]:focus,.mat-mdc-extended-fab.mat-mdc-button-disabled,.mat-mdc-extended-fab.mat-mdc-button-disabled:focus{box-shadow:none}.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive{pointer-events:auto}[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.material-icons,.mat-mdc-extended-fab>.mat-icon,.mat-mdc-extended-fab>.material-icons{margin-left:-8px;margin-right:12px}.mat-mdc-extended-fab .mdc-button__label+.mat-icon,.mat-mdc-extended-fab .mdc-button__label+.material-icons,[dir=rtl] .mat-mdc-extended-fab>.mat-icon,[dir=rtl] .mat-mdc-extended-fab>.material-icons{margin-left:12px;margin-right:-8px}.mat-mdc-extended-fab .mat-mdc-button-touch-target{width:100%}\n']
    }]
  }], () => [], {
    extended: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatMiniFabButton = class _MatMiniFabButton extends MatButtonBase {
  _options = inject(MAT_FAB_DEFAULT_OPTIONS, {
    optional: true
  });
  _isFab = true;
  constructor() {
    super();
    this._options = this._options || defaults;
    this.color = this._options.color || defaults.color;
  }
  static \u0275fac = function MatMiniFabButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatMiniFabButton)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatMiniFabButton,
    selectors: [["button", "mat-mini-fab", ""], ["a", "mat-mini-fab", ""], ["button", "matMiniFab", ""], ["a", "matMiniFab", ""]],
    hostAttrs: [1, "mdc-fab", "mat-mdc-fab-base", "mdc-fab--mini", "mat-mdc-mini-fab"],
    exportAs: ["matButton", "matAnchor"],
    features: [\u0275\u0275InheritDefinitionFeature],
    attrs: _c42,
    ngContentSelectors: _c22,
    decls: 7,
    vars: 4,
    consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
    template: function MatMiniFabButton_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c14);
        \u0275\u0275domElement(0, "span", 0);
        \u0275\u0275projection(1);
        \u0275\u0275domElementStart(2, "span", 1);
        \u0275\u0275projection(3, 1);
        \u0275\u0275domElementEnd();
        \u0275\u0275projection(4, 2);
        \u0275\u0275domElement(5, "span", 2)(6, "span", 3);
      }
      if (rf & 2) {
        \u0275\u0275classProp("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
      }
    },
    styles: [_c52],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatMiniFabButton, [{
    type: Component,
    args: [{
      selector: `button[mat-mini-fab], a[mat-mini-fab], button[matMiniFab], a[matMiniFab]`,
      host: {
        "class": "mdc-fab mat-mdc-fab-base mdc-fab--mini mat-mdc-mini-fab"
      },
      exportAs: "matButton, matAnchor",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<span
    class="mat-mdc-button-persistent-ripple"
    [class.mdc-button__ripple]="!_isFab"
    [class.mdc-fab__ripple]="_isFab"></span>

<ng-content select=".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])">
</ng-content>

<span class="mdc-button__label"><ng-content></ng-content></span>

<ng-content select=".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]">
</ng-content>

<!--
  The indicator can't be directly on the button, because MDC uses ::before for high contrast
  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.
-->
<span class="mat-focus-indicator"></span>

<span class="mat-mdc-button-touch-target"></span>
`,
      styles: ['.mat-mdc-fab-base{-webkit-user-select:none;user-select:none;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);flex-shrink:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-fab-base .mat-mdc-button-ripple,.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab-base .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-fab-base .mdc-button__label,.mat-mdc-fab-base .mat-icon{z-index:1;position:relative}.mat-mdc-fab-base .mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-fab-base:focus>.mat-focus-indicator::before{content:""}.mat-mdc-fab-base._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-fab-base::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mat-mdc-fab-base[hidden]{display:none}.mat-mdc-fab-base::-moz-focus-inner{padding:0;border:0}.mat-mdc-fab-base:active,.mat-mdc-fab-base:focus{outline:none}.mat-mdc-fab-base:hover{cursor:pointer}.mat-mdc-fab-base>svg{width:100%}.mat-mdc-fab-base .mat-icon,.mat-mdc-fab-base .material-icons{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mat-mdc-fab-base .mat-focus-indicator::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-fab-base[disabled],.mat-mdc-fab-base.mat-mdc-button-disabled{cursor:default;pointer-events:none}.mat-mdc-fab-base[disabled],.mat-mdc-fab-base[disabled]:focus,.mat-mdc-fab-base.mat-mdc-button-disabled,.mat-mdc-fab-base.mat-mdc-button-disabled:focus{box-shadow:none}.mat-mdc-fab-base.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-fab{background-color:var(--mat-fab-container-color, var(--mat-sys-primary-container));border-radius:var(--mat-fab-container-shape, var(--mat-sys-corner-large));color:var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));box-shadow:var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-fab:hover{box-shadow:var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4))}.mat-mdc-fab:focus{box-shadow:var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-fab:active,.mat-mdc-fab:focus:active{box-shadow:var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-fab[disabled],.mat-mdc-fab.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-fab.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-fab-touch-target-size, 48px);display:var(--mat-fab-touch-target-display, block);left:50%;width:var(--mat-fab-touch-target-size, 48px);transform:translate(-50%, -50%)}.mat-mdc-fab .mat-ripple-element{background-color:var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container))}.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-disabled-state-layer-color)}.mat-mdc-fab:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-fab.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-fab.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-fab.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-fab:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-mini-fab{width:40px;height:40px;background-color:var(--mat-fab-small-container-color, var(--mat-sys-primary-container));border-radius:var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));color:var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));box-shadow:var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-mini-fab:hover{box-shadow:var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4))}.mat-mdc-mini-fab:focus{box-shadow:var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-mini-fab:active,.mat-mdc-mini-fab:focus:active{box-shadow:var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-mini-fab[disabled],.mat-mdc-mini-fab.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-mini-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-fab-small-touch-target-size, 48px);display:var(--mat-fab-small-touch-target-display);left:50%;width:var(--mat-fab-small-touch-target-size, 48px);transform:translate(-50%, -50%)}.mat-mdc-mini-fab .mat-ripple-element{background-color:var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container))}.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-small-disabled-state-layer-color)}.mat-mdc-mini-fab:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-mini-fab.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-mini-fab:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-extended-fab{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;padding-left:20px;padding-right:20px;width:auto;max-width:100%;line-height:normal;box-shadow:var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));height:var(--mat-fab-extended-container-height, 56px);border-radius:var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));font-family:var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));font-weight:var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));letter-spacing:var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking))}.mat-mdc-extended-fab:hover{box-shadow:var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4))}.mat-mdc-extended-fab:focus{box-shadow:var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-extended-fab:active,.mat-mdc-extended-fab:focus:active{box-shadow:var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3))}.mat-mdc-extended-fab[disabled],.mat-mdc-extended-fab.mat-mdc-button-disabled{cursor:default;pointer-events:none}.mat-mdc-extended-fab[disabled],.mat-mdc-extended-fab[disabled]:focus,.mat-mdc-extended-fab.mat-mdc-button-disabled,.mat-mdc-extended-fab.mat-mdc-button-disabled:focus{box-shadow:none}.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive{pointer-events:auto}[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.material-icons,.mat-mdc-extended-fab>.mat-icon,.mat-mdc-extended-fab>.material-icons{margin-left:-8px;margin-right:12px}.mat-mdc-extended-fab .mdc-button__label+.mat-icon,.mat-mdc-extended-fab .mdc-button__label+.material-icons,[dir=rtl] .mat-mdc-extended-fab>.mat-icon,[dir=rtl] .mat-mdc-extended-fab>.material-icons{margin-left:12px;margin-right:-8px}.mat-mdc-extended-fab .mat-mdc-button-touch-target{width:100%}\n']
    }]
  }], () => [], null);
})();
var MatButtonModule = class _MatButtonModule {
  static \u0275fac = function MatButtonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatButtonModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatButtonModule,
    imports: [MatCommonModule, MatRippleModule, MatButton, MatMiniFabButton, MatIconButton, MatFabButton],
    exports: [MatCommonModule, MatButton, MatMiniFabButton, MatIconButton, MatFabButton]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, MatRippleModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatRippleModule, MatButton, MatMiniFabButton, MatIconButton, MatFabButton],
      exports: [MatCommonModule, MatButton, MatMiniFabButton, MatIconButton, MatFabButton]
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/overlay-module.mjs
var scrollBehaviorSupported2 = supportsScrollBehavior();
function createBlockScrollStrategy(injector) {
  return new BlockScrollStrategy(injector.get(ViewportRuler), injector.get(DOCUMENT));
}
var BlockScrollStrategy = class {
  _viewportRuler;
  _previousHTMLStyles = {
    top: "",
    left: ""
  };
  _previousScrollPosition;
  _isEnabled = false;
  _document;
  constructor(_viewportRuler, document2) {
    this._viewportRuler = _viewportRuler;
    this._document = document2;
  }
  /** Attaches this scroll strategy to an overlay. */
  attach() {
  }
  /** Blocks page-level scroll while the attached overlay is open. */
  enable() {
    if (this._canBeEnabled()) {
      const root = this._document.documentElement;
      this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
      this._previousHTMLStyles.left = root.style.left || "";
      this._previousHTMLStyles.top = root.style.top || "";
      root.style.left = coerceCssPixelValue(-this._previousScrollPosition.left);
      root.style.top = coerceCssPixelValue(-this._previousScrollPosition.top);
      root.classList.add("cdk-global-scrollblock");
      this._isEnabled = true;
    }
  }
  /** Unblocks page-level scroll while the attached overlay is open. */
  disable() {
    if (this._isEnabled) {
      const html = this._document.documentElement;
      const body = this._document.body;
      const htmlStyle = html.style;
      const bodyStyle = body.style;
      const previousHtmlScrollBehavior = htmlStyle.scrollBehavior || "";
      const previousBodyScrollBehavior = bodyStyle.scrollBehavior || "";
      this._isEnabled = false;
      htmlStyle.left = this._previousHTMLStyles.left;
      htmlStyle.top = this._previousHTMLStyles.top;
      html.classList.remove("cdk-global-scrollblock");
      if (scrollBehaviorSupported2) {
        htmlStyle.scrollBehavior = bodyStyle.scrollBehavior = "auto";
      }
      window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
      if (scrollBehaviorSupported2) {
        htmlStyle.scrollBehavior = previousHtmlScrollBehavior;
        bodyStyle.scrollBehavior = previousBodyScrollBehavior;
      }
    }
  }
  _canBeEnabled() {
    const html = this._document.documentElement;
    if (html.classList.contains("cdk-global-scrollblock") || this._isEnabled) {
      return false;
    }
    const rootElement = this._document.documentElement;
    const viewport = this._viewportRuler.getViewportSize();
    return rootElement.scrollHeight > viewport.height || rootElement.scrollWidth > viewport.width;
  }
};
function getMatScrollStrategyAlreadyAttachedError() {
  return Error(`Scroll strategy has already been attached.`);
}
function createCloseScrollStrategy(injector, config) {
  return new CloseScrollStrategy(injector.get(ScrollDispatcher), injector.get(NgZone), injector.get(ViewportRuler), config);
}
var CloseScrollStrategy = class {
  _scrollDispatcher;
  _ngZone;
  _viewportRuler;
  _config;
  _scrollSubscription = null;
  _overlayRef;
  _initialScrollPosition;
  constructor(_scrollDispatcher, _ngZone, _viewportRuler, _config) {
    this._scrollDispatcher = _scrollDispatcher;
    this._ngZone = _ngZone;
    this._viewportRuler = _viewportRuler;
    this._config = _config;
  }
  /** Attaches this scroll strategy to an overlay. */
  attach(overlayRef) {
    if (this._overlayRef && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatScrollStrategyAlreadyAttachedError();
    }
    this._overlayRef = overlayRef;
  }
  /** Enables the closing of the attached overlay on scroll. */
  enable() {
    if (this._scrollSubscription) {
      return;
    }
    const stream = this._scrollDispatcher.scrolled(0).pipe(filter((scrollable) => {
      return !scrollable || !this._overlayRef.overlayElement.contains(scrollable.getElementRef().nativeElement);
    }));
    if (this._config && this._config.threshold && this._config.threshold > 1) {
      this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top;
      this._scrollSubscription = stream.subscribe(() => {
        const scrollPosition = this._viewportRuler.getViewportScrollPosition().top;
        if (Math.abs(scrollPosition - this._initialScrollPosition) > this._config.threshold) {
          this._detach();
        } else {
          this._overlayRef.updatePosition();
        }
      });
    } else {
      this._scrollSubscription = stream.subscribe(this._detach);
    }
  }
  /** Disables the closing the attached overlay on scroll. */
  disable() {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
      this._scrollSubscription = null;
    }
  }
  detach() {
    this.disable();
    this._overlayRef = null;
  }
  /** Detaches the overlay ref and disables the scroll strategy. */
  _detach = () => {
    this.disable();
    if (this._overlayRef.hasAttached()) {
      this._ngZone.run(() => this._overlayRef.detach());
    }
  };
};
var NoopScrollStrategy = class {
  /** Does nothing, as this scroll strategy is a no-op. */
  enable() {
  }
  /** Does nothing, as this scroll strategy is a no-op. */
  disable() {
  }
  /** Does nothing, as this scroll strategy is a no-op. */
  attach() {
  }
};
function isElementScrolledOutsideView(element, scrollContainers) {
  return scrollContainers.some((containerBounds) => {
    const outsideAbove = element.bottom < containerBounds.top;
    const outsideBelow = element.top > containerBounds.bottom;
    const outsideLeft = element.right < containerBounds.left;
    const outsideRight = element.left > containerBounds.right;
    return outsideAbove || outsideBelow || outsideLeft || outsideRight;
  });
}
function isElementClippedByScrolling(element, scrollContainers) {
  return scrollContainers.some((scrollContainerRect) => {
    const clippedAbove = element.top < scrollContainerRect.top;
    const clippedBelow = element.bottom > scrollContainerRect.bottom;
    const clippedLeft = element.left < scrollContainerRect.left;
    const clippedRight = element.right > scrollContainerRect.right;
    return clippedAbove || clippedBelow || clippedLeft || clippedRight;
  });
}
function createRepositionScrollStrategy(injector, config) {
  return new RepositionScrollStrategy(injector.get(ScrollDispatcher), injector.get(ViewportRuler), injector.get(NgZone), config);
}
var RepositionScrollStrategy = class {
  _scrollDispatcher;
  _viewportRuler;
  _ngZone;
  _config;
  _scrollSubscription = null;
  _overlayRef;
  constructor(_scrollDispatcher, _viewportRuler, _ngZone, _config) {
    this._scrollDispatcher = _scrollDispatcher;
    this._viewportRuler = _viewportRuler;
    this._ngZone = _ngZone;
    this._config = _config;
  }
  /** Attaches this scroll strategy to an overlay. */
  attach(overlayRef) {
    if (this._overlayRef && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatScrollStrategyAlreadyAttachedError();
    }
    this._overlayRef = overlayRef;
  }
  /** Enables repositioning of the attached overlay on scroll. */
  enable() {
    if (!this._scrollSubscription) {
      const throttle = this._config ? this._config.scrollThrottle : 0;
      this._scrollSubscription = this._scrollDispatcher.scrolled(throttle).subscribe(() => {
        this._overlayRef.updatePosition();
        if (this._config && this._config.autoClose) {
          const overlayRect = this._overlayRef.overlayElement.getBoundingClientRect();
          const {
            width,
            height
          } = this._viewportRuler.getViewportSize();
          const parentRects = [{
            width,
            height,
            bottom: height,
            right: width,
            top: 0,
            left: 0
          }];
          if (isElementScrolledOutsideView(overlayRect, parentRects)) {
            this.disable();
            this._ngZone.run(() => this._overlayRef.detach());
          }
        }
      });
    }
  }
  /** Disables repositioning of the attached overlay on scroll. */
  disable() {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
      this._scrollSubscription = null;
    }
  }
  detach() {
    this.disable();
    this._overlayRef = null;
  }
};
var ScrollStrategyOptions = class _ScrollStrategyOptions {
  _injector = inject(Injector);
  constructor() {
  }
  /** Do nothing on scroll. */
  noop = () => new NoopScrollStrategy();
  /**
   * Close the overlay as soon as the user scrolls.
   * @param config Configuration to be used inside the scroll strategy.
   */
  close = (config) => createCloseScrollStrategy(this._injector, config);
  /** Block scrolling. */
  block = () => createBlockScrollStrategy(this._injector);
  /**
   * Update the overlay's position on scroll.
   * @param config Configuration to be used inside the scroll strategy.
   * Allows debouncing the reposition calls.
   */
  reposition = (config) => createRepositionScrollStrategy(this._injector, config);
  static \u0275fac = function ScrollStrategyOptions_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollStrategyOptions)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ScrollStrategyOptions,
    factory: _ScrollStrategyOptions.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollStrategyOptions, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var OverlayConfig = class {
  /** Strategy with which to position the overlay. */
  positionStrategy;
  /** Strategy to be used when handling scroll events while the overlay is open. */
  scrollStrategy = new NoopScrollStrategy();
  /** Custom class to add to the overlay pane. */
  panelClass = "";
  /** Whether the overlay has a backdrop. */
  hasBackdrop = false;
  /** Custom class to add to the backdrop */
  backdropClass = "cdk-overlay-dark-backdrop";
  /** Whether to disable any built-in animations. */
  disableAnimations;
  /** The width of the overlay panel. If a number is provided, pixel units are assumed. */
  width;
  /** The height of the overlay panel. If a number is provided, pixel units are assumed. */
  height;
  /** The min-width of the overlay panel. If a number is provided, pixel units are assumed. */
  minWidth;
  /** The min-height of the overlay panel. If a number is provided, pixel units are assumed. */
  minHeight;
  /** The max-width of the overlay panel. If a number is provided, pixel units are assumed. */
  maxWidth;
  /** The max-height of the overlay panel. If a number is provided, pixel units are assumed. */
  maxHeight;
  /**
   * Direction of the text in the overlay panel. If a `Directionality` instance
   * is passed in, the overlay will handle changes to its value automatically.
   */
  direction;
  /**
   * Whether the overlay should be disposed of when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  disposeOnNavigation = false;
  constructor(config) {
    if (config) {
      const configKeys = Object.keys(config);
      for (const key of configKeys) {
        if (config[key] !== void 0) {
          this[key] = config[key];
        }
      }
    }
  }
};
var ConnectedOverlayPositionChange = class {
  connectionPair;
  scrollableViewProperties;
  constructor(connectionPair, scrollableViewProperties) {
    this.connectionPair = connectionPair;
    this.scrollableViewProperties = scrollableViewProperties;
  }
};
function validateVerticalPosition(property, value) {
  if (value !== "top" && value !== "bottom" && value !== "center") {
    throw Error(`ConnectedPosition: Invalid ${property} "${value}". Expected "top", "bottom" or "center".`);
  }
}
function validateHorizontalPosition(property, value) {
  if (value !== "start" && value !== "end" && value !== "center") {
    throw Error(`ConnectedPosition: Invalid ${property} "${value}". Expected "start", "end" or "center".`);
  }
}
var BaseOverlayDispatcher = class _BaseOverlayDispatcher {
  /** Currently attached overlays in the order they were attached. */
  _attachedOverlays = [];
  _document = inject(DOCUMENT);
  _isAttached;
  constructor() {
  }
  ngOnDestroy() {
    this.detach();
  }
  /** Add a new overlay to the list of attached overlay refs. */
  add(overlayRef) {
    this.remove(overlayRef);
    this._attachedOverlays.push(overlayRef);
  }
  /** Remove an overlay from the list of attached overlay refs. */
  remove(overlayRef) {
    const index = this._attachedOverlays.indexOf(overlayRef);
    if (index > -1) {
      this._attachedOverlays.splice(index, 1);
    }
    if (this._attachedOverlays.length === 0) {
      this.detach();
    }
  }
  static \u0275fac = function BaseOverlayDispatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseOverlayDispatcher)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _BaseOverlayDispatcher,
    factory: _BaseOverlayDispatcher.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseOverlayDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var OverlayKeyboardDispatcher = class _OverlayKeyboardDispatcher extends BaseOverlayDispatcher {
  _ngZone = inject(NgZone);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _cleanupKeydown;
  /** Add a new overlay to the list of attached overlay refs. */
  add(overlayRef) {
    super.add(overlayRef);
    if (!this._isAttached) {
      this._ngZone.runOutsideAngular(() => {
        this._cleanupKeydown = this._renderer.listen("body", "keydown", this._keydownListener);
      });
      this._isAttached = true;
    }
  }
  /** Detaches the global keyboard event listener. */
  detach() {
    if (this._isAttached) {
      this._cleanupKeydown?.();
      this._isAttached = false;
    }
  }
  /** Keyboard event listener that will be attached to the body. */
  _keydownListener = (event) => {
    const overlays = this._attachedOverlays;
    for (let i = overlays.length - 1; i > -1; i--) {
      if (overlays[i]._keydownEvents.observers.length > 0) {
        this._ngZone.run(() => overlays[i]._keydownEvents.next(event));
        break;
      }
    }
  };
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275OverlayKeyboardDispatcher_BaseFactory;
    return function OverlayKeyboardDispatcher_Factory(__ngFactoryType__) {
      return (\u0275OverlayKeyboardDispatcher_BaseFactory || (\u0275OverlayKeyboardDispatcher_BaseFactory = \u0275\u0275getInheritedFactory(_OverlayKeyboardDispatcher)))(__ngFactoryType__ || _OverlayKeyboardDispatcher);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _OverlayKeyboardDispatcher,
    factory: _OverlayKeyboardDispatcher.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayKeyboardDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var OverlayOutsideClickDispatcher = class _OverlayOutsideClickDispatcher extends BaseOverlayDispatcher {
  _platform = inject(Platform);
  _ngZone = inject(NgZone);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _cursorOriginalValue;
  _cursorStyleIsSet = false;
  _pointerDownEventTarget;
  _cleanups;
  /** Add a new overlay to the list of attached overlay refs. */
  add(overlayRef) {
    super.add(overlayRef);
    if (!this._isAttached) {
      const body = this._document.body;
      const eventOptions = {
        capture: true
      };
      const renderer = this._renderer;
      this._cleanups = this._ngZone.runOutsideAngular(() => [renderer.listen(body, "pointerdown", this._pointerDownListener, eventOptions), renderer.listen(body, "click", this._clickListener, eventOptions), renderer.listen(body, "auxclick", this._clickListener, eventOptions), renderer.listen(body, "contextmenu", this._clickListener, eventOptions)]);
      if (this._platform.IOS && !this._cursorStyleIsSet) {
        this._cursorOriginalValue = body.style.cursor;
        body.style.cursor = "pointer";
        this._cursorStyleIsSet = true;
      }
      this._isAttached = true;
    }
  }
  /** Detaches the global keyboard event listener. */
  detach() {
    if (this._isAttached) {
      this._cleanups?.forEach((cleanup) => cleanup());
      this._cleanups = void 0;
      if (this._platform.IOS && this._cursorStyleIsSet) {
        this._document.body.style.cursor = this._cursorOriginalValue;
        this._cursorStyleIsSet = false;
      }
      this._isAttached = false;
    }
  }
  /** Store pointerdown event target to track origin of click. */
  _pointerDownListener = (event) => {
    this._pointerDownEventTarget = _getEventTarget(event);
  };
  /** Click event listener that will be attached to the body propagate phase. */
  _clickListener = (event) => {
    const target = _getEventTarget(event);
    const origin = event.type === "click" && this._pointerDownEventTarget ? this._pointerDownEventTarget : target;
    this._pointerDownEventTarget = null;
    const overlays = this._attachedOverlays.slice();
    for (let i = overlays.length - 1; i > -1; i--) {
      const overlayRef = overlays[i];
      if (overlayRef._outsidePointerEvents.observers.length < 1 || !overlayRef.hasAttached()) {
        continue;
      }
      if (containsPierceShadowDom(overlayRef.overlayElement, target) || containsPierceShadowDom(overlayRef.overlayElement, origin)) {
        break;
      }
      const outsidePointerEvents = overlayRef._outsidePointerEvents;
      if (this._ngZone) {
        this._ngZone.run(() => outsidePointerEvents.next(event));
      } else {
        outsidePointerEvents.next(event);
      }
    }
  };
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275OverlayOutsideClickDispatcher_BaseFactory;
    return function OverlayOutsideClickDispatcher_Factory(__ngFactoryType__) {
      return (\u0275OverlayOutsideClickDispatcher_BaseFactory || (\u0275OverlayOutsideClickDispatcher_BaseFactory = \u0275\u0275getInheritedFactory(_OverlayOutsideClickDispatcher)))(__ngFactoryType__ || _OverlayOutsideClickDispatcher);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _OverlayOutsideClickDispatcher,
    factory: _OverlayOutsideClickDispatcher.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayOutsideClickDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function containsPierceShadowDom(parent, child) {
  const supportsShadowRoot = typeof ShadowRoot !== "undefined" && ShadowRoot;
  let current = child;
  while (current) {
    if (current === parent) {
      return true;
    }
    current = supportsShadowRoot && current instanceof ShadowRoot ? current.host : current.parentNode;
  }
  return false;
}
var _CdkOverlayStyleLoader = class __CdkOverlayStyleLoader {
  static \u0275fac = function _CdkOverlayStyleLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __CdkOverlayStyleLoader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: __CdkOverlayStyleLoader,
    selectors: [["ng-component"]],
    hostAttrs: ["cdk-overlay-style-loader", ""],
    decls: 0,
    vars: 0,
    template: function _CdkOverlayStyleLoader_Template(rf, ctx) {
    },
    styles: [".cdk-overlay-container,.cdk-global-overlay-wrapper{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed}@layer cdk-overlay{.cdk-overlay-container{z-index:1000}}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute}@layer cdk-overlay{.cdk-global-overlay-wrapper{z-index:1000}}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;display:flex;max-width:100%;max-height:100%}@layer cdk-overlay{.cdk-overlay-pane{z-index:1000}}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:auto;-webkit-tap-highlight-color:rgba(0,0,0,0);opacity:0;touch-action:manipulation}@layer cdk-overlay{.cdk-overlay-backdrop{z-index:1000;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}}@media(prefers-reduced-motion){.cdk-overlay-backdrop{transition-duration:1ms}}.cdk-overlay-backdrop-showing{opacity:1}@media(forced-colors: active){.cdk-overlay-backdrop-showing{opacity:.6}}@layer cdk-overlay{.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}}.cdk-overlay-transparent-backdrop{transition:visibility 1ms linear,opacity 1ms linear;visibility:hidden;opacity:1}.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing,.cdk-high-contrast-active .cdk-overlay-transparent-backdrop{opacity:0;visibility:visible}.cdk-overlay-backdrop-noop-animation{transition:none}.cdk-overlay-connected-position-bounding-box{position:absolute;display:flex;flex-direction:column;min-width:1px;min-height:1px}@layer cdk-overlay{.cdk-overlay-connected-position-bounding-box{z-index:1000}}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_CdkOverlayStyleLoader, [{
    type: Component,
    args: [{
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "cdk-overlay-style-loader": ""
      },
      styles: [".cdk-overlay-container,.cdk-global-overlay-wrapper{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed}@layer cdk-overlay{.cdk-overlay-container{z-index:1000}}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute}@layer cdk-overlay{.cdk-global-overlay-wrapper{z-index:1000}}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;display:flex;max-width:100%;max-height:100%}@layer cdk-overlay{.cdk-overlay-pane{z-index:1000}}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:auto;-webkit-tap-highlight-color:rgba(0,0,0,0);opacity:0;touch-action:manipulation}@layer cdk-overlay{.cdk-overlay-backdrop{z-index:1000;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}}@media(prefers-reduced-motion){.cdk-overlay-backdrop{transition-duration:1ms}}.cdk-overlay-backdrop-showing{opacity:1}@media(forced-colors: active){.cdk-overlay-backdrop-showing{opacity:.6}}@layer cdk-overlay{.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}}.cdk-overlay-transparent-backdrop{transition:visibility 1ms linear,opacity 1ms linear;visibility:hidden;opacity:1}.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing,.cdk-high-contrast-active .cdk-overlay-transparent-backdrop{opacity:0;visibility:visible}.cdk-overlay-backdrop-noop-animation{transition:none}.cdk-overlay-connected-position-bounding-box{position:absolute;display:flex;flex-direction:column;min-width:1px;min-height:1px}@layer cdk-overlay{.cdk-overlay-connected-position-bounding-box{z-index:1000}}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}\n"]
    }]
  }], null, null);
})();
var OverlayContainer = class _OverlayContainer {
  _platform = inject(Platform);
  _containerElement;
  _document = inject(DOCUMENT);
  _styleLoader = inject(_CdkPrivateStyleLoader);
  constructor() {
  }
  ngOnDestroy() {
    this._containerElement?.remove();
  }
  /**
   * This method returns the overlay container element. It will lazily
   * create the element the first time it is called to facilitate using
   * the container in non-browser environments.
   * @returns the container element
   */
  getContainerElement() {
    this._loadStyles();
    if (!this._containerElement) {
      this._createContainer();
    }
    return this._containerElement;
  }
  /**
   * Create the overlay container element, which is simply a div
   * with the 'cdk-overlay-container' class on the document body.
   */
  _createContainer() {
    const containerClass = "cdk-overlay-container";
    if (this._platform.isBrowser || _isTestEnvironment()) {
      const oppositePlatformContainers = this._document.querySelectorAll(`.${containerClass}[platform="server"], .${containerClass}[platform="test"]`);
      for (let i = 0; i < oppositePlatformContainers.length; i++) {
        oppositePlatformContainers[i].remove();
      }
    }
    const container = this._document.createElement("div");
    container.classList.add(containerClass);
    if (_isTestEnvironment()) {
      container.setAttribute("platform", "test");
    } else if (!this._platform.isBrowser) {
      container.setAttribute("platform", "server");
    }
    this._document.body.appendChild(container);
    this._containerElement = container;
  }
  /** Loads the structural styles necessary for the overlay to work. */
  _loadStyles() {
    this._styleLoader.load(_CdkOverlayStyleLoader);
  }
  static \u0275fac = function OverlayContainer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverlayContainer)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _OverlayContainer,
    factory: _OverlayContainer.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayContainer, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var BackdropRef = class {
  _renderer;
  _ngZone;
  element;
  _cleanupClick;
  _cleanupTransitionEnd;
  _fallbackTimeout;
  constructor(document2, _renderer, _ngZone, onClick) {
    this._renderer = _renderer;
    this._ngZone = _ngZone;
    this.element = document2.createElement("div");
    this.element.classList.add("cdk-overlay-backdrop");
    this._cleanupClick = _renderer.listen(this.element, "click", onClick);
  }
  detach() {
    this._ngZone.runOutsideAngular(() => {
      const element = this.element;
      clearTimeout(this._fallbackTimeout);
      this._cleanupTransitionEnd?.();
      this._cleanupTransitionEnd = this._renderer.listen(element, "transitionend", this.dispose);
      this._fallbackTimeout = setTimeout(this.dispose, 500);
      element.style.pointerEvents = "none";
      element.classList.remove("cdk-overlay-backdrop-showing");
    });
  }
  dispose = () => {
    clearTimeout(this._fallbackTimeout);
    this._cleanupClick?.();
    this._cleanupTransitionEnd?.();
    this._cleanupClick = this._cleanupTransitionEnd = this._fallbackTimeout = void 0;
    this.element.remove();
  };
};
var OverlayRef = class {
  _portalOutlet;
  _host;
  _pane;
  _config;
  _ngZone;
  _keyboardDispatcher;
  _document;
  _location;
  _outsideClickDispatcher;
  _animationsDisabled;
  _injector;
  _renderer;
  _backdropClick = new Subject();
  _attachments = new Subject();
  _detachments = new Subject();
  _positionStrategy;
  _scrollStrategy;
  _locationChanges = Subscription.EMPTY;
  _backdropRef = null;
  _detachContentMutationObserver;
  _detachContentAfterRenderRef;
  /**
   * Reference to the parent of the `_host` at the time it was detached. Used to restore
   * the `_host` to its original position in the DOM when it gets re-attached.
   */
  _previousHostParent;
  /** Stream of keydown events dispatched to this overlay. */
  _keydownEvents = new Subject();
  /** Stream of mouse outside events dispatched to this overlay. */
  _outsidePointerEvents = new Subject();
  /** Reference to the currently-running `afterNextRender` call. */
  _afterNextRenderRef;
  constructor(_portalOutlet, _host, _pane, _config, _ngZone, _keyboardDispatcher, _document, _location, _outsideClickDispatcher, _animationsDisabled2 = false, _injector, _renderer) {
    this._portalOutlet = _portalOutlet;
    this._host = _host;
    this._pane = _pane;
    this._config = _config;
    this._ngZone = _ngZone;
    this._keyboardDispatcher = _keyboardDispatcher;
    this._document = _document;
    this._location = _location;
    this._outsideClickDispatcher = _outsideClickDispatcher;
    this._animationsDisabled = _animationsDisabled2;
    this._injector = _injector;
    this._renderer = _renderer;
    if (_config.scrollStrategy) {
      this._scrollStrategy = _config.scrollStrategy;
      this._scrollStrategy.attach(this);
    }
    this._positionStrategy = _config.positionStrategy;
  }
  /** The overlay's HTML element */
  get overlayElement() {
    return this._pane;
  }
  /** The overlay's backdrop HTML element. */
  get backdropElement() {
    return this._backdropRef?.element || null;
  }
  /**
   * Wrapper around the panel element. Can be used for advanced
   * positioning where a wrapper with specific styling is
   * required around the overlay pane.
   */
  get hostElement() {
    return this._host;
  }
  /**
   * Attaches content, given via a Portal, to the overlay.
   * If the overlay is configured to have a backdrop, it will be created.
   *
   * @param portal Portal instance to which to attach the overlay.
   * @returns The portal attachment result.
   */
  attach(portal) {
    if (!this._host.parentElement && this._previousHostParent) {
      this._previousHostParent.appendChild(this._host);
    }
    const attachResult = this._portalOutlet.attach(portal);
    if (this._positionStrategy) {
      this._positionStrategy.attach(this);
    }
    this._updateStackingOrder();
    this._updateElementSize();
    this._updateElementDirection();
    if (this._scrollStrategy) {
      this._scrollStrategy.enable();
    }
    this._afterNextRenderRef?.destroy();
    this._afterNextRenderRef = afterNextRender(() => {
      if (this.hasAttached()) {
        this.updatePosition();
      }
    }, {
      injector: this._injector
    });
    this._togglePointerEvents(true);
    if (this._config.hasBackdrop) {
      this._attachBackdrop();
    }
    if (this._config.panelClass) {
      this._toggleClasses(this._pane, this._config.panelClass, true);
    }
    this._attachments.next();
    this._completeDetachContent();
    this._keyboardDispatcher.add(this);
    if (this._config.disposeOnNavigation) {
      this._locationChanges = this._location.subscribe(() => this.dispose());
    }
    this._outsideClickDispatcher.add(this);
    if (typeof attachResult?.onDestroy === "function") {
      attachResult.onDestroy(() => {
        if (this.hasAttached()) {
          this._ngZone.runOutsideAngular(() => Promise.resolve().then(() => this.detach()));
        }
      });
    }
    return attachResult;
  }
  /**
   * Detaches an overlay from a portal.
   * @returns The portal detachment result.
   */
  detach() {
    if (!this.hasAttached()) {
      return;
    }
    this.detachBackdrop();
    this._togglePointerEvents(false);
    if (this._positionStrategy && this._positionStrategy.detach) {
      this._positionStrategy.detach();
    }
    if (this._scrollStrategy) {
      this._scrollStrategy.disable();
    }
    const detachmentResult = this._portalOutlet.detach();
    this._detachments.next();
    this._completeDetachContent();
    this._keyboardDispatcher.remove(this);
    this._detachContentWhenEmpty();
    this._locationChanges.unsubscribe();
    this._outsideClickDispatcher.remove(this);
    return detachmentResult;
  }
  /** Cleans up the overlay from the DOM. */
  dispose() {
    const isAttached = this.hasAttached();
    if (this._positionStrategy) {
      this._positionStrategy.dispose();
    }
    this._disposeScrollStrategy();
    this._backdropRef?.dispose();
    this._locationChanges.unsubscribe();
    this._keyboardDispatcher.remove(this);
    this._portalOutlet.dispose();
    this._attachments.complete();
    this._backdropClick.complete();
    this._keydownEvents.complete();
    this._outsidePointerEvents.complete();
    this._outsideClickDispatcher.remove(this);
    this._host?.remove();
    this._afterNextRenderRef?.destroy();
    this._previousHostParent = this._pane = this._host = this._backdropRef = null;
    if (isAttached) {
      this._detachments.next();
    }
    this._detachments.complete();
    this._completeDetachContent();
  }
  /** Whether the overlay has attached content. */
  hasAttached() {
    return this._portalOutlet.hasAttached();
  }
  /** Gets an observable that emits when the backdrop has been clicked. */
  backdropClick() {
    return this._backdropClick;
  }
  /** Gets an observable that emits when the overlay has been attached. */
  attachments() {
    return this._attachments;
  }
  /** Gets an observable that emits when the overlay has been detached. */
  detachments() {
    return this._detachments;
  }
  /** Gets an observable of keydown events targeted to this overlay. */
  keydownEvents() {
    return this._keydownEvents;
  }
  /** Gets an observable of pointer events targeted outside this overlay. */
  outsidePointerEvents() {
    return this._outsidePointerEvents;
  }
  /** Gets the current overlay configuration, which is immutable. */
  getConfig() {
    return this._config;
  }
  /** Updates the position of the overlay based on the position strategy. */
  updatePosition() {
    if (this._positionStrategy) {
      this._positionStrategy.apply();
    }
  }
  /** Switches to a new position strategy and updates the overlay position. */
  updatePositionStrategy(strategy) {
    if (strategy === this._positionStrategy) {
      return;
    }
    if (this._positionStrategy) {
      this._positionStrategy.dispose();
    }
    this._positionStrategy = strategy;
    if (this.hasAttached()) {
      strategy.attach(this);
      this.updatePosition();
    }
  }
  /** Update the size properties of the overlay. */
  updateSize(sizeConfig) {
    this._config = __spreadValues(__spreadValues({}, this._config), sizeConfig);
    this._updateElementSize();
  }
  /** Sets the LTR/RTL direction for the overlay. */
  setDirection(dir) {
    this._config = __spreadProps(__spreadValues({}, this._config), {
      direction: dir
    });
    this._updateElementDirection();
  }
  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes) {
    if (this._pane) {
      this._toggleClasses(this._pane, classes, true);
    }
  }
  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes) {
    if (this._pane) {
      this._toggleClasses(this._pane, classes, false);
    }
  }
  /**
   * Returns the layout direction of the overlay panel.
   */
  getDirection() {
    const direction = this._config.direction;
    if (!direction) {
      return "ltr";
    }
    return typeof direction === "string" ? direction : direction.value;
  }
  /** Switches to a new scroll strategy. */
  updateScrollStrategy(strategy) {
    if (strategy === this._scrollStrategy) {
      return;
    }
    this._disposeScrollStrategy();
    this._scrollStrategy = strategy;
    if (this.hasAttached()) {
      strategy.attach(this);
      strategy.enable();
    }
  }
  /** Updates the text direction of the overlay panel. */
  _updateElementDirection() {
    this._host.setAttribute("dir", this.getDirection());
  }
  /** Updates the size of the overlay element based on the overlay config. */
  _updateElementSize() {
    if (!this._pane) {
      return;
    }
    const style2 = this._pane.style;
    style2.width = coerceCssPixelValue(this._config.width);
    style2.height = coerceCssPixelValue(this._config.height);
    style2.minWidth = coerceCssPixelValue(this._config.minWidth);
    style2.minHeight = coerceCssPixelValue(this._config.minHeight);
    style2.maxWidth = coerceCssPixelValue(this._config.maxWidth);
    style2.maxHeight = coerceCssPixelValue(this._config.maxHeight);
  }
  /** Toggles the pointer events for the overlay pane element. */
  _togglePointerEvents(enablePointer) {
    this._pane.style.pointerEvents = enablePointer ? "" : "none";
  }
  /** Attaches a backdrop for this overlay. */
  _attachBackdrop() {
    const showingClass = "cdk-overlay-backdrop-showing";
    this._backdropRef?.dispose();
    this._backdropRef = new BackdropRef(this._document, this._renderer, this._ngZone, (event) => {
      this._backdropClick.next(event);
    });
    if (this._animationsDisabled) {
      this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation");
    }
    if (this._config.backdropClass) {
      this._toggleClasses(this._backdropRef.element, this._config.backdropClass, true);
    }
    this._host.parentElement.insertBefore(this._backdropRef.element, this._host);
    if (!this._animationsDisabled && typeof requestAnimationFrame !== "undefined") {
      this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => this._backdropRef?.element.classList.add(showingClass));
      });
    } else {
      this._backdropRef.element.classList.add(showingClass);
    }
  }
  /**
   * Updates the stacking order of the element, moving it to the top if necessary.
   * This is required in cases where one overlay was detached, while another one,
   * that should be behind it, was destroyed. The next time both of them are opened,
   * the stacking will be wrong, because the detached element's pane will still be
   * in its original DOM position.
   */
  _updateStackingOrder() {
    if (this._host.nextSibling) {
      this._host.parentNode.appendChild(this._host);
    }
  }
  /** Detaches the backdrop (if any) associated with the overlay. */
  detachBackdrop() {
    if (this._animationsDisabled) {
      this._backdropRef?.dispose();
      this._backdropRef = null;
    } else {
      this._backdropRef?.detach();
    }
  }
  /** Toggles a single CSS class or an array of classes on an element. */
  _toggleClasses(element, cssClasses, isAdd) {
    const classes = coerceArray(cssClasses || []).filter((c) => !!c);
    if (classes.length) {
      isAdd ? element.classList.add(...classes) : element.classList.remove(...classes);
    }
  }
  /** Detaches the overlay once the content finishes animating and is removed from the DOM. */
  _detachContentWhenEmpty() {
    let rethrow = false;
    try {
      this._detachContentAfterRenderRef = afterNextRender(() => {
        rethrow = true;
        this._detachContent();
      }, {
        injector: this._injector
      });
    } catch (e) {
      if (rethrow) {
        throw e;
      }
      this._detachContent();
    }
    if (globalThis.MutationObserver && this._pane) {
      this._detachContentMutationObserver ||= new globalThis.MutationObserver(() => {
        this._detachContent();
      });
      this._detachContentMutationObserver.observe(this._pane, {
        childList: true
      });
    }
  }
  _detachContent() {
    if (!this._pane || !this._host || this._pane.children.length === 0) {
      if (this._pane && this._config.panelClass) {
        this._toggleClasses(this._pane, this._config.panelClass, false);
      }
      if (this._host && this._host.parentElement) {
        this._previousHostParent = this._host.parentElement;
        this._host.remove();
      }
      this._completeDetachContent();
    }
  }
  _completeDetachContent() {
    this._detachContentAfterRenderRef?.destroy();
    this._detachContentAfterRenderRef = void 0;
    this._detachContentMutationObserver?.disconnect();
  }
  /** Disposes of a scroll strategy. */
  _disposeScrollStrategy() {
    const scrollStrategy = this._scrollStrategy;
    scrollStrategy?.disable();
    scrollStrategy?.detach?.();
  }
};
var boundingBoxClass = "cdk-overlay-connected-position-bounding-box";
var cssUnitPattern = /([A-Za-z%]+)$/;
function createFlexibleConnectedPositionStrategy(injector, origin) {
  return new FlexibleConnectedPositionStrategy(origin, injector.get(ViewportRuler), injector.get(DOCUMENT), injector.get(Platform), injector.get(OverlayContainer));
}
var FlexibleConnectedPositionStrategy = class {
  _viewportRuler;
  _document;
  _platform;
  _overlayContainer;
  /** The overlay to which this strategy is attached. */
  _overlayRef;
  /** Whether we're performing the very first positioning of the overlay. */
  _isInitialRender;
  /** Last size used for the bounding box. Used to avoid resizing the overlay after open. */
  _lastBoundingBoxSize = {
    width: 0,
    height: 0
  };
  /** Whether the overlay was pushed in a previous positioning. */
  _isPushed = false;
  /** Whether the overlay can be pushed on-screen on the initial open. */
  _canPush = true;
  /** Whether the overlay can grow via flexible width/height after the initial open. */
  _growAfterOpen = false;
  /** Whether the overlay's width and height can be constrained to fit within the viewport. */
  _hasFlexibleDimensions = true;
  /** Whether the overlay position is locked. */
  _positionLocked = false;
  /** Cached origin dimensions */
  _originRect;
  /** Cached overlay dimensions */
  _overlayRect;
  /** Cached viewport dimensions */
  _viewportRect;
  /** Cached container dimensions */
  _containerRect;
  /** Amount of space that must be maintained between the overlay and the edge of the viewport. */
  _viewportMargin = 0;
  /** The Scrollable containers used to check scrollable view properties on position change. */
  _scrollables = [];
  /** Ordered list of preferred positions, from most to least desirable. */
  _preferredPositions = [];
  /** The origin element against which the overlay will be positioned. */
  _origin;
  /** The overlay pane element. */
  _pane;
  /** Whether the strategy has been disposed of already. */
  _isDisposed;
  /**
   * Parent element for the overlay panel used to constrain the overlay panel's size to fit
   * within the viewport.
   */
  _boundingBox;
  /** The last position to have been calculated as the best fit position. */
  _lastPosition;
  /** The last calculated scroll visibility. Only tracked  */
  _lastScrollVisibility;
  /** Subject that emits whenever the position changes. */
  _positionChanges = new Subject();
  /** Subscription to viewport size changes. */
  _resizeSubscription = Subscription.EMPTY;
  /** Default offset for the overlay along the x axis. */
  _offsetX = 0;
  /** Default offset for the overlay along the y axis. */
  _offsetY = 0;
  /** Selector to be used when finding the elements on which to set the transform origin. */
  _transformOriginSelector;
  /** Keeps track of the CSS classes that the position strategy has applied on the overlay panel. */
  _appliedPanelClasses = [];
  /** Amount by which the overlay was pushed in each axis during the last time it was positioned. */
  _previousPushAmount;
  /** Observable sequence of position changes. */
  positionChanges = this._positionChanges;
  /** Ordered list of preferred positions, from most to least desirable. */
  get positions() {
    return this._preferredPositions;
  }
  constructor(connectedTo, _viewportRuler, _document, _platform, _overlayContainer) {
    this._viewportRuler = _viewportRuler;
    this._document = _document;
    this._platform = _platform;
    this._overlayContainer = _overlayContainer;
    this.setOrigin(connectedTo);
  }
  /** Attaches this position strategy to an overlay. */
  attach(overlayRef) {
    if (this._overlayRef && overlayRef !== this._overlayRef && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("This position strategy is already attached to an overlay");
    }
    this._validatePositions();
    overlayRef.hostElement.classList.add(boundingBoxClass);
    this._overlayRef = overlayRef;
    this._boundingBox = overlayRef.hostElement;
    this._pane = overlayRef.overlayElement;
    this._isDisposed = false;
    this._isInitialRender = true;
    this._lastPosition = null;
    this._resizeSubscription.unsubscribe();
    this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
      this._isInitialRender = true;
      this.apply();
    });
  }
  /**
   * Updates the position of the overlay element, using whichever preferred position relative
   * to the origin best fits on-screen.
   *
   * The selection of a position goes as follows:
   *  - If any positions fit completely within the viewport as-is,
   *      choose the first position that does so.
   *  - If flexible dimensions are enabled and at least one satisfies the given minimum width/height,
   *      choose the position with the greatest available size modified by the positions' weight.
   *  - If pushing is enabled, take the position that went off-screen the least and push it
   *      on-screen.
   *  - If none of the previous criteria were met, use the position that goes off-screen the least.
   * @docs-private
   */
  apply() {
    if (this._isDisposed || !this._platform.isBrowser) {
      return;
    }
    if (!this._isInitialRender && this._positionLocked && this._lastPosition) {
      this.reapplyLastPosition();
      return;
    }
    this._clearPanelClasses();
    this._resetOverlayElementStyles();
    this._resetBoundingBoxStyles();
    this._viewportRect = this._getNarrowedViewportRect();
    this._originRect = this._getOriginRect();
    this._overlayRect = this._pane.getBoundingClientRect();
    this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect();
    const originRect = this._originRect;
    const overlayRect = this._overlayRect;
    const viewportRect = this._viewportRect;
    const containerRect = this._containerRect;
    const flexibleFits = [];
    let fallback;
    for (let pos of this._preferredPositions) {
      let originPoint = this._getOriginPoint(originRect, containerRect, pos);
      let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos);
      let overlayFit = this._getOverlayFit(overlayPoint, overlayRect, viewportRect, pos);
      if (overlayFit.isCompletelyWithinViewport) {
        this._isPushed = false;
        this._applyPosition(pos, originPoint);
        return;
      }
      if (this._canFitWithFlexibleDimensions(overlayFit, overlayPoint, viewportRect)) {
        flexibleFits.push({
          position: pos,
          origin: originPoint,
          overlayRect,
          boundingBoxRect: this._calculateBoundingBoxRect(originPoint, pos)
        });
        continue;
      }
      if (!fallback || fallback.overlayFit.visibleArea < overlayFit.visibleArea) {
        fallback = {
          overlayFit,
          overlayPoint,
          originPoint,
          position: pos,
          overlayRect
        };
      }
    }
    if (flexibleFits.length) {
      let bestFit = null;
      let bestScore = -1;
      for (const fit of flexibleFits) {
        const score = fit.boundingBoxRect.width * fit.boundingBoxRect.height * (fit.position.weight || 1);
        if (score > bestScore) {
          bestScore = score;
          bestFit = fit;
        }
      }
      this._isPushed = false;
      this._applyPosition(bestFit.position, bestFit.origin);
      return;
    }
    if (this._canPush) {
      this._isPushed = true;
      this._applyPosition(fallback.position, fallback.originPoint);
      return;
    }
    this._applyPosition(fallback.position, fallback.originPoint);
  }
  detach() {
    this._clearPanelClasses();
    this._lastPosition = null;
    this._previousPushAmount = null;
    this._resizeSubscription.unsubscribe();
  }
  /** Cleanup after the element gets destroyed. */
  dispose() {
    if (this._isDisposed) {
      return;
    }
    if (this._boundingBox) {
      extendStyles(this._boundingBox.style, {
        top: "",
        left: "",
        right: "",
        bottom: "",
        height: "",
        width: "",
        alignItems: "",
        justifyContent: ""
      });
    }
    if (this._pane) {
      this._resetOverlayElementStyles();
    }
    if (this._overlayRef) {
      this._overlayRef.hostElement.classList.remove(boundingBoxClass);
    }
    this.detach();
    this._positionChanges.complete();
    this._overlayRef = this._boundingBox = null;
    this._isDisposed = true;
  }
  /**
   * This re-aligns the overlay element with the trigger in its last calculated position,
   * even if a position higher in the "preferred positions" list would now fit. This
   * allows one to re-align the panel without changing the orientation of the panel.
   */
  reapplyLastPosition() {
    if (this._isDisposed || !this._platform.isBrowser) {
      return;
    }
    const lastPosition = this._lastPosition;
    if (lastPosition) {
      this._originRect = this._getOriginRect();
      this._overlayRect = this._pane.getBoundingClientRect();
      this._viewportRect = this._getNarrowedViewportRect();
      this._containerRect = this._overlayContainer.getContainerElement().getBoundingClientRect();
      const originPoint = this._getOriginPoint(this._originRect, this._containerRect, lastPosition);
      this._applyPosition(lastPosition, originPoint);
    } else {
      this.apply();
    }
  }
  /**
   * Sets the list of Scrollable containers that host the origin element so that
   * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
   * Scrollable must be an ancestor element of the strategy's origin element.
   */
  withScrollableContainers(scrollables) {
    this._scrollables = scrollables;
    return this;
  }
  /**
   * Adds new preferred positions.
   * @param positions List of positions options for this overlay.
   */
  withPositions(positions) {
    this._preferredPositions = positions;
    if (positions.indexOf(this._lastPosition) === -1) {
      this._lastPosition = null;
    }
    this._validatePositions();
    return this;
  }
  /**
   * Sets a minimum distance the overlay may be positioned to the edge of the viewport.
   * @param margin Required margin between the overlay and the viewport edge in pixels.
   */
  withViewportMargin(margin) {
    this._viewportMargin = margin;
    return this;
  }
  /** Sets whether the overlay's width and height can be constrained to fit within the viewport. */
  withFlexibleDimensions(flexibleDimensions = true) {
    this._hasFlexibleDimensions = flexibleDimensions;
    return this;
  }
  /** Sets whether the overlay can grow after the initial open via flexible width/height. */
  withGrowAfterOpen(growAfterOpen = true) {
    this._growAfterOpen = growAfterOpen;
    return this;
  }
  /** Sets whether the overlay can be pushed on-screen if none of the provided positions fit. */
  withPush(canPush = true) {
    this._canPush = canPush;
    return this;
  }
  /**
   * Sets whether the overlay's position should be locked in after it is positioned
   * initially. When an overlay is locked in, it won't attempt to reposition itself
   * when the position is re-applied (e.g. when the user scrolls away).
   * @param isLocked Whether the overlay should locked in.
   */
  withLockedPosition(isLocked = true) {
    this._positionLocked = isLocked;
    return this;
  }
  /**
   * Sets the origin, relative to which to position the overlay.
   * Using an element origin is useful for building components that need to be positioned
   * relatively to a trigger (e.g. dropdown menus or tooltips), whereas using a point can be
   * used for cases like contextual menus which open relative to the user's pointer.
   * @param origin Reference to the new origin.
   */
  setOrigin(origin) {
    this._origin = origin;
    return this;
  }
  /**
   * Sets the default offset for the overlay's connection point on the x-axis.
   * @param offset New offset in the X axis.
   */
  withDefaultOffsetX(offset) {
    this._offsetX = offset;
    return this;
  }
  /**
   * Sets the default offset for the overlay's connection point on the y-axis.
   * @param offset New offset in the Y axis.
   */
  withDefaultOffsetY(offset) {
    this._offsetY = offset;
    return this;
  }
  /**
   * Configures that the position strategy should set a `transform-origin` on some elements
   * inside the overlay, depending on the current position that is being applied. This is
   * useful for the cases where the origin of an animation can change depending on the
   * alignment of the overlay.
   * @param selector CSS selector that will be used to find the target
   *    elements onto which to set the transform origin.
   */
  withTransformOriginOn(selector) {
    this._transformOriginSelector = selector;
    return this;
  }
  /**
   * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
   */
  _getOriginPoint(originRect, containerRect, pos) {
    let x;
    if (pos.originX == "center") {
      x = originRect.left + originRect.width / 2;
    } else {
      const startX = this._isRtl() ? originRect.right : originRect.left;
      const endX = this._isRtl() ? originRect.left : originRect.right;
      x = pos.originX == "start" ? startX : endX;
    }
    if (containerRect.left < 0) {
      x -= containerRect.left;
    }
    let y;
    if (pos.originY == "center") {
      y = originRect.top + originRect.height / 2;
    } else {
      y = pos.originY == "top" ? originRect.top : originRect.bottom;
    }
    if (containerRect.top < 0) {
      y -= containerRect.top;
    }
    return {
      x,
      y
    };
  }
  /**
   * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
   * origin point to which the overlay should be connected.
   */
  _getOverlayPoint(originPoint, overlayRect, pos) {
    let overlayStartX;
    if (pos.overlayX == "center") {
      overlayStartX = -overlayRect.width / 2;
    } else if (pos.overlayX === "start") {
      overlayStartX = this._isRtl() ? -overlayRect.width : 0;
    } else {
      overlayStartX = this._isRtl() ? 0 : -overlayRect.width;
    }
    let overlayStartY;
    if (pos.overlayY == "center") {
      overlayStartY = -overlayRect.height / 2;
    } else {
      overlayStartY = pos.overlayY == "top" ? 0 : -overlayRect.height;
    }
    return {
      x: originPoint.x + overlayStartX,
      y: originPoint.y + overlayStartY
    };
  }
  /** Gets how well an overlay at the given point will fit within the viewport. */
  _getOverlayFit(point, rawOverlayRect, viewport, position) {
    const overlay = getRoundedBoundingClientRect(rawOverlayRect);
    let {
      x,
      y
    } = point;
    let offsetX = this._getOffset(position, "x");
    let offsetY = this._getOffset(position, "y");
    if (offsetX) {
      x += offsetX;
    }
    if (offsetY) {
      y += offsetY;
    }
    let leftOverflow = 0 - x;
    let rightOverflow = x + overlay.width - viewport.width;
    let topOverflow = 0 - y;
    let bottomOverflow = y + overlay.height - viewport.height;
    let visibleWidth = this._subtractOverflows(overlay.width, leftOverflow, rightOverflow);
    let visibleHeight = this._subtractOverflows(overlay.height, topOverflow, bottomOverflow);
    let visibleArea = visibleWidth * visibleHeight;
    return {
      visibleArea,
      isCompletelyWithinViewport: overlay.width * overlay.height === visibleArea,
      fitsInViewportVertically: visibleHeight === overlay.height,
      fitsInViewportHorizontally: visibleWidth == overlay.width
    };
  }
  /**
   * Whether the overlay can fit within the viewport when it may resize either its width or height.
   * @param fit How well the overlay fits in the viewport at some position.
   * @param point The (x, y) coordinates of the overlay at some position.
   * @param viewport The geometry of the viewport.
   */
  _canFitWithFlexibleDimensions(fit, point, viewport) {
    if (this._hasFlexibleDimensions) {
      const availableHeight = viewport.bottom - point.y;
      const availableWidth = viewport.right - point.x;
      const minHeight = getPixelValue(this._overlayRef.getConfig().minHeight);
      const minWidth = getPixelValue(this._overlayRef.getConfig().minWidth);
      const verticalFit = fit.fitsInViewportVertically || minHeight != null && minHeight <= availableHeight;
      const horizontalFit = fit.fitsInViewportHorizontally || minWidth != null && minWidth <= availableWidth;
      return verticalFit && horizontalFit;
    }
    return false;
  }
  /**
   * Gets the point at which the overlay can be "pushed" on-screen. If the overlay is larger than
   * the viewport, the top-left corner will be pushed on-screen (with overflow occurring on the
   * right and bottom).
   *
   * @param start Starting point from which the overlay is pushed.
   * @param rawOverlayRect Dimensions of the overlay.
   * @param scrollPosition Current viewport scroll position.
   * @returns The point at which to position the overlay after pushing. This is effectively a new
   *     originPoint.
   */
  _pushOverlayOnScreen(start, rawOverlayRect, scrollPosition) {
    if (this._previousPushAmount && this._positionLocked) {
      return {
        x: start.x + this._previousPushAmount.x,
        y: start.y + this._previousPushAmount.y
      };
    }
    const overlay = getRoundedBoundingClientRect(rawOverlayRect);
    const viewport = this._viewportRect;
    const overflowRight = Math.max(start.x + overlay.width - viewport.width, 0);
    const overflowBottom = Math.max(start.y + overlay.height - viewport.height, 0);
    const overflowTop = Math.max(viewport.top - scrollPosition.top - start.y, 0);
    const overflowLeft = Math.max(viewport.left - scrollPosition.left - start.x, 0);
    let pushX = 0;
    let pushY = 0;
    if (overlay.width <= viewport.width) {
      pushX = overflowLeft || -overflowRight;
    } else {
      pushX = start.x < this._viewportMargin ? viewport.left - scrollPosition.left - start.x : 0;
    }
    if (overlay.height <= viewport.height) {
      pushY = overflowTop || -overflowBottom;
    } else {
      pushY = start.y < this._viewportMargin ? viewport.top - scrollPosition.top - start.y : 0;
    }
    this._previousPushAmount = {
      x: pushX,
      y: pushY
    };
    return {
      x: start.x + pushX,
      y: start.y + pushY
    };
  }
  /**
   * Applies a computed position to the overlay and emits a position change.
   * @param position The position preference
   * @param originPoint The point on the origin element where the overlay is connected.
   */
  _applyPosition(position, originPoint) {
    this._setTransformOrigin(position);
    this._setOverlayElementStyles(originPoint, position);
    this._setBoundingBoxStyles(originPoint, position);
    if (position.panelClass) {
      this._addPanelClasses(position.panelClass);
    }
    if (this._positionChanges.observers.length) {
      const scrollVisibility = this._getScrollVisibility();
      if (position !== this._lastPosition || !this._lastScrollVisibility || !compareScrollVisibility(this._lastScrollVisibility, scrollVisibility)) {
        const changeEvent = new ConnectedOverlayPositionChange(position, scrollVisibility);
        this._positionChanges.next(changeEvent);
      }
      this._lastScrollVisibility = scrollVisibility;
    }
    this._lastPosition = position;
    this._isInitialRender = false;
  }
  /** Sets the transform origin based on the configured selector and the passed-in position.  */
  _setTransformOrigin(position) {
    if (!this._transformOriginSelector) {
      return;
    }
    const elements = this._boundingBox.querySelectorAll(this._transformOriginSelector);
    let xOrigin;
    let yOrigin = position.overlayY;
    if (position.overlayX === "center") {
      xOrigin = "center";
    } else if (this._isRtl()) {
      xOrigin = position.overlayX === "start" ? "right" : "left";
    } else {
      xOrigin = position.overlayX === "start" ? "left" : "right";
    }
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.transformOrigin = `${xOrigin} ${yOrigin}`;
    }
  }
  /**
   * Gets the position and size of the overlay's sizing container.
   *
   * This method does no measuring and applies no styles so that we can cheaply compute the
   * bounds for all positions and choose the best fit based on these results.
   */
  _calculateBoundingBoxRect(origin, position) {
    const viewport = this._viewportRect;
    const isRtl = this._isRtl();
    let height, top, bottom;
    if (position.overlayY === "top") {
      top = origin.y;
      height = viewport.height - top + this._viewportMargin;
    } else if (position.overlayY === "bottom") {
      bottom = viewport.height - origin.y + this._viewportMargin * 2;
      height = viewport.height - bottom + this._viewportMargin;
    } else {
      const smallestDistanceToViewportEdge = Math.min(viewport.bottom - origin.y + viewport.top, origin.y);
      const previousHeight = this._lastBoundingBoxSize.height;
      height = smallestDistanceToViewportEdge * 2;
      top = origin.y - smallestDistanceToViewportEdge;
      if (height > previousHeight && !this._isInitialRender && !this._growAfterOpen) {
        top = origin.y - previousHeight / 2;
      }
    }
    const isBoundedByRightViewportEdge = position.overlayX === "start" && !isRtl || position.overlayX === "end" && isRtl;
    const isBoundedByLeftViewportEdge = position.overlayX === "end" && !isRtl || position.overlayX === "start" && isRtl;
    let width, left, right;
    if (isBoundedByLeftViewportEdge) {
      right = viewport.width - origin.x + this._viewportMargin * 2;
      width = origin.x - this._viewportMargin;
    } else if (isBoundedByRightViewportEdge) {
      left = origin.x;
      width = viewport.right - origin.x;
    } else {
      const smallestDistanceToViewportEdge = Math.min(viewport.right - origin.x + viewport.left, origin.x);
      const previousWidth = this._lastBoundingBoxSize.width;
      width = smallestDistanceToViewportEdge * 2;
      left = origin.x - smallestDistanceToViewportEdge;
      if (width > previousWidth && !this._isInitialRender && !this._growAfterOpen) {
        left = origin.x - previousWidth / 2;
      }
    }
    return {
      top,
      left,
      bottom,
      right,
      width,
      height
    };
  }
  /**
   * Sets the position and size of the overlay's sizing wrapper. The wrapper is positioned on the
   * origin's connection point and stretches to the bounds of the viewport.
   *
   * @param origin The point on the origin element where the overlay is connected.
   * @param position The position preference
   */
  _setBoundingBoxStyles(origin, position) {
    const boundingBoxRect = this._calculateBoundingBoxRect(origin, position);
    if (!this._isInitialRender && !this._growAfterOpen) {
      boundingBoxRect.height = Math.min(boundingBoxRect.height, this._lastBoundingBoxSize.height);
      boundingBoxRect.width = Math.min(boundingBoxRect.width, this._lastBoundingBoxSize.width);
    }
    const styles = {};
    if (this._hasExactPosition()) {
      styles.top = styles.left = "0";
      styles.bottom = styles.right = styles.maxHeight = styles.maxWidth = "";
      styles.width = styles.height = "100%";
    } else {
      const maxHeight = this._overlayRef.getConfig().maxHeight;
      const maxWidth = this._overlayRef.getConfig().maxWidth;
      styles.height = coerceCssPixelValue(boundingBoxRect.height);
      styles.top = coerceCssPixelValue(boundingBoxRect.top);
      styles.bottom = coerceCssPixelValue(boundingBoxRect.bottom);
      styles.width = coerceCssPixelValue(boundingBoxRect.width);
      styles.left = coerceCssPixelValue(boundingBoxRect.left);
      styles.right = coerceCssPixelValue(boundingBoxRect.right);
      if (position.overlayX === "center") {
        styles.alignItems = "center";
      } else {
        styles.alignItems = position.overlayX === "end" ? "flex-end" : "flex-start";
      }
      if (position.overlayY === "center") {
        styles.justifyContent = "center";
      } else {
        styles.justifyContent = position.overlayY === "bottom" ? "flex-end" : "flex-start";
      }
      if (maxHeight) {
        styles.maxHeight = coerceCssPixelValue(maxHeight);
      }
      if (maxWidth) {
        styles.maxWidth = coerceCssPixelValue(maxWidth);
      }
    }
    this._lastBoundingBoxSize = boundingBoxRect;
    extendStyles(this._boundingBox.style, styles);
  }
  /** Resets the styles for the bounding box so that a new positioning can be computed. */
  _resetBoundingBoxStyles() {
    extendStyles(this._boundingBox.style, {
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      height: "",
      width: "",
      alignItems: "",
      justifyContent: ""
    });
  }
  /** Resets the styles for the overlay pane so that a new positioning can be computed. */
  _resetOverlayElementStyles() {
    extendStyles(this._pane.style, {
      top: "",
      left: "",
      bottom: "",
      right: "",
      position: "",
      transform: ""
    });
  }
  /** Sets positioning styles to the overlay element. */
  _setOverlayElementStyles(originPoint, position) {
    const styles = {};
    const hasExactPosition = this._hasExactPosition();
    const hasFlexibleDimensions = this._hasFlexibleDimensions;
    const config = this._overlayRef.getConfig();
    if (hasExactPosition) {
      const scrollPosition = this._viewportRuler.getViewportScrollPosition();
      extendStyles(styles, this._getExactOverlayY(position, originPoint, scrollPosition));
      extendStyles(styles, this._getExactOverlayX(position, originPoint, scrollPosition));
    } else {
      styles.position = "static";
    }
    let transformString = "";
    let offsetX = this._getOffset(position, "x");
    let offsetY = this._getOffset(position, "y");
    if (offsetX) {
      transformString += `translateX(${offsetX}px) `;
    }
    if (offsetY) {
      transformString += `translateY(${offsetY}px)`;
    }
    styles.transform = transformString.trim();
    if (config.maxHeight) {
      if (hasExactPosition) {
        styles.maxHeight = coerceCssPixelValue(config.maxHeight);
      } else if (hasFlexibleDimensions) {
        styles.maxHeight = "";
      }
    }
    if (config.maxWidth) {
      if (hasExactPosition) {
        styles.maxWidth = coerceCssPixelValue(config.maxWidth);
      } else if (hasFlexibleDimensions) {
        styles.maxWidth = "";
      }
    }
    extendStyles(this._pane.style, styles);
  }
  /** Gets the exact top/bottom for the overlay when not using flexible sizing or when pushing. */
  _getExactOverlayY(position, originPoint, scrollPosition) {
    let styles = {
      top: "",
      bottom: ""
    };
    let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
    if (this._isPushed) {
      overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition);
    }
    if (position.overlayY === "bottom") {
      const documentHeight = this._document.documentElement.clientHeight;
      styles.bottom = `${documentHeight - (overlayPoint.y + this._overlayRect.height)}px`;
    } else {
      styles.top = coerceCssPixelValue(overlayPoint.y);
    }
    return styles;
  }
  /** Gets the exact left/right for the overlay when not using flexible sizing or when pushing. */
  _getExactOverlayX(position, originPoint, scrollPosition) {
    let styles = {
      left: "",
      right: ""
    };
    let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
    if (this._isPushed) {
      overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition);
    }
    let horizontalStyleProperty;
    if (this._isRtl()) {
      horizontalStyleProperty = position.overlayX === "end" ? "left" : "right";
    } else {
      horizontalStyleProperty = position.overlayX === "end" ? "right" : "left";
    }
    if (horizontalStyleProperty === "right") {
      const documentWidth = this._document.documentElement.clientWidth;
      styles.right = `${documentWidth - (overlayPoint.x + this._overlayRect.width)}px`;
    } else {
      styles.left = coerceCssPixelValue(overlayPoint.x);
    }
    return styles;
  }
  /**
   * Gets the view properties of the trigger and overlay, including whether they are clipped
   * or completely outside the view of any of the strategy's scrollables.
   */
  _getScrollVisibility() {
    const originBounds = this._getOriginRect();
    const overlayBounds = this._pane.getBoundingClientRect();
    const scrollContainerBounds = this._scrollables.map((scrollable) => {
      return scrollable.getElementRef().nativeElement.getBoundingClientRect();
    });
    return {
      isOriginClipped: isElementClippedByScrolling(originBounds, scrollContainerBounds),
      isOriginOutsideView: isElementScrolledOutsideView(originBounds, scrollContainerBounds),
      isOverlayClipped: isElementClippedByScrolling(overlayBounds, scrollContainerBounds),
      isOverlayOutsideView: isElementScrolledOutsideView(overlayBounds, scrollContainerBounds)
    };
  }
  /** Subtracts the amount that an element is overflowing on an axis from its length. */
  _subtractOverflows(length, ...overflows) {
    return overflows.reduce((currentValue, currentOverflow) => {
      return currentValue - Math.max(currentOverflow, 0);
    }, length);
  }
  /** Narrows the given viewport rect by the current _viewportMargin. */
  _getNarrowedViewportRect() {
    const width = this._document.documentElement.clientWidth;
    const height = this._document.documentElement.clientHeight;
    const scrollPosition = this._viewportRuler.getViewportScrollPosition();
    return {
      top: scrollPosition.top + this._viewportMargin,
      left: scrollPosition.left + this._viewportMargin,
      right: scrollPosition.left + width - this._viewportMargin,
      bottom: scrollPosition.top + height - this._viewportMargin,
      width: width - 2 * this._viewportMargin,
      height: height - 2 * this._viewportMargin
    };
  }
  /** Whether the we're dealing with an RTL context */
  _isRtl() {
    return this._overlayRef.getDirection() === "rtl";
  }
  /** Determines whether the overlay uses exact or flexible positioning. */
  _hasExactPosition() {
    return !this._hasFlexibleDimensions || this._isPushed;
  }
  /** Retrieves the offset of a position along the x or y axis. */
  _getOffset(position, axis) {
    if (axis === "x") {
      return position.offsetX == null ? this._offsetX : position.offsetX;
    }
    return position.offsetY == null ? this._offsetY : position.offsetY;
  }
  /** Validates that the current position match the expected values. */
  _validatePositions() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this._preferredPositions.length) {
        throw Error("FlexibleConnectedPositionStrategy: At least one position is required.");
      }
      this._preferredPositions.forEach((pair) => {
        validateHorizontalPosition("originX", pair.originX);
        validateVerticalPosition("originY", pair.originY);
        validateHorizontalPosition("overlayX", pair.overlayX);
        validateVerticalPosition("overlayY", pair.overlayY);
      });
    }
  }
  /** Adds a single CSS class or an array of classes on the overlay panel. */
  _addPanelClasses(cssClasses) {
    if (this._pane) {
      coerceArray(cssClasses).forEach((cssClass) => {
        if (cssClass !== "" && this._appliedPanelClasses.indexOf(cssClass) === -1) {
          this._appliedPanelClasses.push(cssClass);
          this._pane.classList.add(cssClass);
        }
      });
    }
  }
  /** Clears the classes that the position strategy has applied from the overlay panel. */
  _clearPanelClasses() {
    if (this._pane) {
      this._appliedPanelClasses.forEach((cssClass) => {
        this._pane.classList.remove(cssClass);
      });
      this._appliedPanelClasses = [];
    }
  }
  /** Returns the DOMRect of the current origin. */
  _getOriginRect() {
    const origin = this._origin;
    if (origin instanceof ElementRef) {
      return origin.nativeElement.getBoundingClientRect();
    }
    if (origin instanceof Element) {
      return origin.getBoundingClientRect();
    }
    const width = origin.width || 0;
    const height = origin.height || 0;
    return {
      top: origin.y,
      bottom: origin.y + height,
      left: origin.x,
      right: origin.x + width,
      height,
      width
    };
  }
};
function extendStyles(destination, source) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      destination[key] = source[key];
    }
  }
  return destination;
}
function getPixelValue(input) {
  if (typeof input !== "number" && input != null) {
    const [value, units] = input.split(cssUnitPattern);
    return !units || units === "px" ? parseFloat(value) : null;
  }
  return input || null;
}
function getRoundedBoundingClientRect(clientRect) {
  return {
    top: Math.floor(clientRect.top),
    right: Math.floor(clientRect.right),
    bottom: Math.floor(clientRect.bottom),
    left: Math.floor(clientRect.left),
    width: Math.floor(clientRect.width),
    height: Math.floor(clientRect.height)
  };
}
function compareScrollVisibility(a, b) {
  if (a === b) {
    return true;
  }
  return a.isOriginClipped === b.isOriginClipped && a.isOriginOutsideView === b.isOriginOutsideView && a.isOverlayClipped === b.isOverlayClipped && a.isOverlayOutsideView === b.isOverlayOutsideView;
}
var wrapperClass = "cdk-global-overlay-wrapper";
function createGlobalPositionStrategy(_injector) {
  return new GlobalPositionStrategy();
}
var GlobalPositionStrategy = class {
  /** The overlay to which this strategy is attached. */
  _overlayRef;
  _cssPosition = "static";
  _topOffset = "";
  _bottomOffset = "";
  _alignItems = "";
  _xPosition = "";
  _xOffset = "";
  _width = "";
  _height = "";
  _isDisposed = false;
  attach(overlayRef) {
    const config = overlayRef.getConfig();
    this._overlayRef = overlayRef;
    if (this._width && !config.width) {
      overlayRef.updateSize({
        width: this._width
      });
    }
    if (this._height && !config.height) {
      overlayRef.updateSize({
        height: this._height
      });
    }
    overlayRef.hostElement.classList.add(wrapperClass);
    this._isDisposed = false;
  }
  /**
   * Sets the top position of the overlay. Clears any previously set vertical position.
   * @param value New top offset.
   */
  top(value = "") {
    this._bottomOffset = "";
    this._topOffset = value;
    this._alignItems = "flex-start";
    return this;
  }
  /**
   * Sets the left position of the overlay. Clears any previously set horizontal position.
   * @param value New left offset.
   */
  left(value = "") {
    this._xOffset = value;
    this._xPosition = "left";
    return this;
  }
  /**
   * Sets the bottom position of the overlay. Clears any previously set vertical position.
   * @param value New bottom offset.
   */
  bottom(value = "") {
    this._topOffset = "";
    this._bottomOffset = value;
    this._alignItems = "flex-end";
    return this;
  }
  /**
   * Sets the right position of the overlay. Clears any previously set horizontal position.
   * @param value New right offset.
   */
  right(value = "") {
    this._xOffset = value;
    this._xPosition = "right";
    return this;
  }
  /**
   * Sets the overlay to the start of the viewport, depending on the overlay direction.
   * This will be to the left in LTR layouts and to the right in RTL.
   * @param offset Offset from the edge of the screen.
   */
  start(value = "") {
    this._xOffset = value;
    this._xPosition = "start";
    return this;
  }
  /**
   * Sets the overlay to the end of the viewport, depending on the overlay direction.
   * This will be to the right in LTR layouts and to the left in RTL.
   * @param offset Offset from the edge of the screen.
   */
  end(value = "") {
    this._xOffset = value;
    this._xPosition = "end";
    return this;
  }
  /**
   * Sets the overlay width and clears any previously set width.
   * @param value New width for the overlay
   * @deprecated Pass the `width` through the `OverlayConfig`.
   * @breaking-change 8.0.0
   */
  width(value = "") {
    if (this._overlayRef) {
      this._overlayRef.updateSize({
        width: value
      });
    } else {
      this._width = value;
    }
    return this;
  }
  /**
   * Sets the overlay height and clears any previously set height.
   * @param value New height for the overlay
   * @deprecated Pass the `height` through the `OverlayConfig`.
   * @breaking-change 8.0.0
   */
  height(value = "") {
    if (this._overlayRef) {
      this._overlayRef.updateSize({
        height: value
      });
    } else {
      this._height = value;
    }
    return this;
  }
  /**
   * Centers the overlay horizontally with an optional offset.
   * Clears any previously set horizontal position.
   *
   * @param offset Overlay offset from the horizontal center.
   */
  centerHorizontally(offset = "") {
    this.left(offset);
    this._xPosition = "center";
    return this;
  }
  /**
   * Centers the overlay vertically with an optional offset.
   * Clears any previously set vertical position.
   *
   * @param offset Overlay offset from the vertical center.
   */
  centerVertically(offset = "") {
    this.top(offset);
    this._alignItems = "center";
    return this;
  }
  /**
   * Apply the position to the element.
   * @docs-private
   */
  apply() {
    if (!this._overlayRef || !this._overlayRef.hasAttached()) {
      return;
    }
    const styles = this._overlayRef.overlayElement.style;
    const parentStyles = this._overlayRef.hostElement.style;
    const config = this._overlayRef.getConfig();
    const {
      width,
      height,
      maxWidth,
      maxHeight
    } = config;
    const shouldBeFlushHorizontally = (width === "100%" || width === "100vw") && (!maxWidth || maxWidth === "100%" || maxWidth === "100vw");
    const shouldBeFlushVertically = (height === "100%" || height === "100vh") && (!maxHeight || maxHeight === "100%" || maxHeight === "100vh");
    const xPosition = this._xPosition;
    const xOffset = this._xOffset;
    const isRtl = this._overlayRef.getConfig().direction === "rtl";
    let marginLeft = "";
    let marginRight = "";
    let justifyContent = "";
    if (shouldBeFlushHorizontally) {
      justifyContent = "flex-start";
    } else if (xPosition === "center") {
      justifyContent = "center";
      if (isRtl) {
        marginRight = xOffset;
      } else {
        marginLeft = xOffset;
      }
    } else if (isRtl) {
      if (xPosition === "left" || xPosition === "end") {
        justifyContent = "flex-end";
        marginLeft = xOffset;
      } else if (xPosition === "right" || xPosition === "start") {
        justifyContent = "flex-start";
        marginRight = xOffset;
      }
    } else if (xPosition === "left" || xPosition === "start") {
      justifyContent = "flex-start";
      marginLeft = xOffset;
    } else if (xPosition === "right" || xPosition === "end") {
      justifyContent = "flex-end";
      marginRight = xOffset;
    }
    styles.position = this._cssPosition;
    styles.marginLeft = shouldBeFlushHorizontally ? "0" : marginLeft;
    styles.marginTop = shouldBeFlushVertically ? "0" : this._topOffset;
    styles.marginBottom = this._bottomOffset;
    styles.marginRight = shouldBeFlushHorizontally ? "0" : marginRight;
    parentStyles.justifyContent = justifyContent;
    parentStyles.alignItems = shouldBeFlushVertically ? "flex-start" : this._alignItems;
  }
  /**
   * Cleans up the DOM changes from the position strategy.
   * @docs-private
   */
  dispose() {
    if (this._isDisposed || !this._overlayRef) {
      return;
    }
    const styles = this._overlayRef.overlayElement.style;
    const parent = this._overlayRef.hostElement;
    const parentStyles = parent.style;
    parent.classList.remove(wrapperClass);
    parentStyles.justifyContent = parentStyles.alignItems = styles.marginTop = styles.marginBottom = styles.marginLeft = styles.marginRight = styles.position = "";
    this._overlayRef = null;
    this._isDisposed = true;
  }
};
var OverlayPositionBuilder = class _OverlayPositionBuilder {
  _injector = inject(Injector);
  constructor() {
  }
  /**
   * Creates a global position strategy.
   */
  global() {
    return createGlobalPositionStrategy();
  }
  /**
   * Creates a flexible position strategy.
   * @param origin Origin relative to which to position the overlay.
   */
  flexibleConnectedTo(origin) {
    return createFlexibleConnectedPositionStrategy(this._injector, origin);
  }
  static \u0275fac = function OverlayPositionBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverlayPositionBuilder)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _OverlayPositionBuilder,
    factory: _OverlayPositionBuilder.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayPositionBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function createOverlayRef(injector, config) {
  injector.get(_CdkPrivateStyleLoader).load(_CdkOverlayStyleLoader);
  const overlayContainer = injector.get(OverlayContainer);
  const doc = injector.get(DOCUMENT);
  const idGenerator = injector.get(_IdGenerator);
  const appRef = injector.get(ApplicationRef);
  const directionality = injector.get(Directionality);
  const host = doc.createElement("div");
  const pane = doc.createElement("div");
  pane.id = idGenerator.getId("cdk-overlay-");
  pane.classList.add("cdk-overlay-pane");
  host.appendChild(pane);
  overlayContainer.getContainerElement().appendChild(host);
  const portalOutlet = new DomPortalOutlet(pane, appRef, injector);
  const overlayConfig = new OverlayConfig(config);
  const renderer = injector.get(Renderer2, null, {
    optional: true
  }) || injector.get(RendererFactory2).createRenderer(null, null);
  overlayConfig.direction = overlayConfig.direction || directionality.value;
  return new OverlayRef(portalOutlet, host, pane, overlayConfig, injector.get(NgZone), injector.get(OverlayKeyboardDispatcher), doc, injector.get(Location), injector.get(OverlayOutsideClickDispatcher), config?.disableAnimations ?? injector.get(ANIMATION_MODULE_TYPE, null, {
    optional: true
  }) === "NoopAnimations", injector.get(EnvironmentInjector), renderer);
}
var Overlay = class _Overlay {
  scrollStrategies = inject(ScrollStrategyOptions);
  _positionBuilder = inject(OverlayPositionBuilder);
  _injector = inject(Injector);
  constructor() {
  }
  /**
   * Creates an overlay.
   * @param config Configuration applied to the overlay.
   * @returns Reference to the created overlay.
   */
  create(config) {
    return createOverlayRef(this._injector, config);
  }
  /**
   * Gets a position builder that can be used, via fluent API,
   * to construct and configure a position strategy.
   * @returns An overlay position builder.
   */
  position() {
    return this._positionBuilder;
  }
  static \u0275fac = function Overlay_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Overlay)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _Overlay,
    factory: _Overlay.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Overlay, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var defaultPositionList = [{
  originX: "start",
  originY: "bottom",
  overlayX: "start",
  overlayY: "top"
}, {
  originX: "start",
  originY: "top",
  overlayX: "start",
  overlayY: "bottom"
}, {
  originX: "end",
  originY: "top",
  overlayX: "end",
  overlayY: "bottom"
}, {
  originX: "end",
  originY: "bottom",
  overlayX: "end",
  overlayY: "top"
}];
var CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY = new InjectionToken("cdk-connected-overlay-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createRepositionScrollStrategy(injector);
  }
});
var CdkOverlayOrigin = class _CdkOverlayOrigin {
  elementRef = inject(ElementRef);
  constructor() {
  }
  static \u0275fac = function CdkOverlayOrigin_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkOverlayOrigin)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkOverlayOrigin,
    selectors: [["", "cdk-overlay-origin", ""], ["", "overlay-origin", ""], ["", "cdkOverlayOrigin", ""]],
    exportAs: ["cdkOverlayOrigin"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkOverlayOrigin, [{
    type: Directive,
    args: [{
      selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]",
      exportAs: "cdkOverlayOrigin"
    }]
  }], () => [], null);
})();
var CdkConnectedOverlay = class _CdkConnectedOverlay {
  _dir = inject(Directionality, {
    optional: true
  });
  _injector = inject(Injector);
  _overlayRef;
  _templatePortal;
  _backdropSubscription = Subscription.EMPTY;
  _attachSubscription = Subscription.EMPTY;
  _detachSubscription = Subscription.EMPTY;
  _positionSubscription = Subscription.EMPTY;
  _offsetX;
  _offsetY;
  _position;
  _scrollStrategyFactory = inject(CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY);
  _disposeOnNavigation = false;
  _ngZone = inject(NgZone);
  /** Origin for the connected overlay. */
  origin;
  /** Registered connected position pairs. */
  positions;
  /**
   * This input overrides the positions input if specified. It lets users pass
   * in arbitrary positioning strategies.
   */
  positionStrategy;
  /** The offset in pixels for the overlay connection point on the x-axis */
  get offsetX() {
    return this._offsetX;
  }
  set offsetX(offsetX) {
    this._offsetX = offsetX;
    if (this._position) {
      this._updatePositionStrategy(this._position);
    }
  }
  /** The offset in pixels for the overlay connection point on the y-axis */
  get offsetY() {
    return this._offsetY;
  }
  set offsetY(offsetY) {
    this._offsetY = offsetY;
    if (this._position) {
      this._updatePositionStrategy(this._position);
    }
  }
  /** The width of the overlay panel. */
  width;
  /** The height of the overlay panel. */
  height;
  /** The min width of the overlay panel. */
  minWidth;
  /** The min height of the overlay panel. */
  minHeight;
  /** The custom class to be set on the backdrop element. */
  backdropClass;
  /** The custom class to add to the overlay pane element. */
  panelClass;
  /** Margin between the overlay and the viewport edges. */
  viewportMargin = 0;
  /** Strategy to be used when handling scroll events while the overlay is open. */
  scrollStrategy;
  /** Whether the overlay is open. */
  open = false;
  /** Whether the overlay can be closed by user interaction. */
  disableClose = false;
  /** CSS selector which to set the transform origin. */
  transformOriginSelector;
  /** Whether or not the overlay should attach a backdrop. */
  hasBackdrop = false;
  /** Whether or not the overlay should be locked when scrolling. */
  lockPosition = false;
  /** Whether the overlay's width and height can be constrained to fit within the viewport. */
  flexibleDimensions = false;
  /** Whether the overlay can grow after the initial open when flexible positioning is turned on. */
  growAfterOpen = false;
  /** Whether the overlay can be pushed on-screen if none of the provided positions fit. */
  push = false;
  /** Whether the overlay should be disposed of when the user goes backwards/forwards in history. */
  get disposeOnNavigation() {
    return this._disposeOnNavigation;
  }
  set disposeOnNavigation(value) {
    this._disposeOnNavigation = value;
  }
  /** Event emitted when the backdrop is clicked. */
  backdropClick = new EventEmitter();
  /** Event emitted when the position has changed. */
  positionChange = new EventEmitter();
  /** Event emitted when the overlay has been attached. */
  attach = new EventEmitter();
  /** Event emitted when the overlay has been detached. */
  detach = new EventEmitter();
  /** Emits when there are keyboard events that are targeted at the overlay. */
  overlayKeydown = new EventEmitter();
  /** Emits when there are mouse outside click events that are targeted at the overlay. */
  overlayOutsideClick = new EventEmitter();
  // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
  constructor() {
    const templateRef = inject(TemplateRef);
    const viewContainerRef = inject(ViewContainerRef);
    this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    this.scrollStrategy = this._scrollStrategyFactory();
  }
  /** The associated overlay reference. */
  get overlayRef() {
    return this._overlayRef;
  }
  /** The element's layout direction. */
  get dir() {
    return this._dir ? this._dir.value : "ltr";
  }
  ngOnDestroy() {
    this._attachSubscription.unsubscribe();
    this._detachSubscription.unsubscribe();
    this._backdropSubscription.unsubscribe();
    this._positionSubscription.unsubscribe();
    this._overlayRef?.dispose();
  }
  ngOnChanges(changes) {
    if (this._position) {
      this._updatePositionStrategy(this._position);
      this._overlayRef?.updateSize({
        width: this.width,
        minWidth: this.minWidth,
        height: this.height,
        minHeight: this.minHeight
      });
      if (changes["origin"] && this.open) {
        this._position.apply();
      }
    }
    if (changes["open"]) {
      this.open ? this.attachOverlay() : this.detachOverlay();
    }
  }
  /** Creates an overlay */
  _createOverlay() {
    if (!this.positions || !this.positions.length) {
      this.positions = defaultPositionList;
    }
    const overlayRef = this._overlayRef = createOverlayRef(this._injector, this._buildConfig());
    this._attachSubscription = overlayRef.attachments().subscribe(() => this.attach.emit());
    this._detachSubscription = overlayRef.detachments().subscribe(() => this.detach.emit());
    overlayRef.keydownEvents().subscribe((event) => {
      this.overlayKeydown.next(event);
      if (event.keyCode === ESCAPE && !this.disableClose && !hasModifierKey(event)) {
        event.preventDefault();
        this.detachOverlay();
      }
    });
    this._overlayRef.outsidePointerEvents().subscribe((event) => {
      const origin = this._getOriginElement();
      const target = _getEventTarget(event);
      if (!origin || origin !== target && !origin.contains(target)) {
        this.overlayOutsideClick.next(event);
      }
    });
  }
  /** Builds the overlay config based on the directive's inputs */
  _buildConfig() {
    const positionStrategy = this._position = this.positionStrategy || this._createPositionStrategy();
    const overlayConfig = new OverlayConfig({
      direction: this._dir || "ltr",
      positionStrategy,
      scrollStrategy: this.scrollStrategy,
      hasBackdrop: this.hasBackdrop,
      disposeOnNavigation: this.disposeOnNavigation
    });
    if (this.width || this.width === 0) {
      overlayConfig.width = this.width;
    }
    if (this.height || this.height === 0) {
      overlayConfig.height = this.height;
    }
    if (this.minWidth || this.minWidth === 0) {
      overlayConfig.minWidth = this.minWidth;
    }
    if (this.minHeight || this.minHeight === 0) {
      overlayConfig.minHeight = this.minHeight;
    }
    if (this.backdropClass) {
      overlayConfig.backdropClass = this.backdropClass;
    }
    if (this.panelClass) {
      overlayConfig.panelClass = this.panelClass;
    }
    return overlayConfig;
  }
  /** Updates the state of a position strategy, based on the values of the directive inputs. */
  _updatePositionStrategy(positionStrategy) {
    const positions = this.positions.map((currentPosition) => ({
      originX: currentPosition.originX,
      originY: currentPosition.originY,
      overlayX: currentPosition.overlayX,
      overlayY: currentPosition.overlayY,
      offsetX: currentPosition.offsetX || this.offsetX,
      offsetY: currentPosition.offsetY || this.offsetY,
      panelClass: currentPosition.panelClass || void 0
    }));
    return positionStrategy.setOrigin(this._getOrigin()).withPositions(positions).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector);
  }
  /** Returns the position strategy of the overlay to be set on the overlay config */
  _createPositionStrategy() {
    const strategy = createFlexibleConnectedPositionStrategy(this._injector, this._getOrigin());
    this._updatePositionStrategy(strategy);
    return strategy;
  }
  _getOrigin() {
    if (this.origin instanceof CdkOverlayOrigin) {
      return this.origin.elementRef;
    } else {
      return this.origin;
    }
  }
  _getOriginElement() {
    if (this.origin instanceof CdkOverlayOrigin) {
      return this.origin.elementRef.nativeElement;
    }
    if (this.origin instanceof ElementRef) {
      return this.origin.nativeElement;
    }
    if (typeof Element !== "undefined" && this.origin instanceof Element) {
      return this.origin;
    }
    return null;
  }
  /** Attaches the overlay. */
  attachOverlay() {
    if (!this._overlayRef) {
      this._createOverlay();
    } else {
      this._overlayRef.getConfig().hasBackdrop = this.hasBackdrop;
    }
    if (!this._overlayRef.hasAttached()) {
      this._overlayRef.attach(this._templatePortal);
    }
    if (this.hasBackdrop) {
      this._backdropSubscription = this._overlayRef.backdropClick().subscribe((event) => {
        this.backdropClick.emit(event);
      });
    } else {
      this._backdropSubscription.unsubscribe();
    }
    this._positionSubscription.unsubscribe();
    if (this.positionChange.observers.length > 0) {
      this._positionSubscription = this._position.positionChanges.pipe(takeWhile(() => this.positionChange.observers.length > 0)).subscribe((position) => {
        this._ngZone.run(() => this.positionChange.emit(position));
        if (this.positionChange.observers.length === 0) {
          this._positionSubscription.unsubscribe();
        }
      });
    }
    this.open = true;
  }
  /** Detaches the overlay. */
  detachOverlay() {
    this._overlayRef?.detach();
    this._backdropSubscription.unsubscribe();
    this._positionSubscription.unsubscribe();
    this.open = false;
  }
  static \u0275fac = function CdkConnectedOverlay_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkConnectedOverlay)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkConnectedOverlay,
    selectors: [["", "cdk-connected-overlay", ""], ["", "connected-overlay", ""], ["", "cdkConnectedOverlay", ""]],
    inputs: {
      origin: [0, "cdkConnectedOverlayOrigin", "origin"],
      positions: [0, "cdkConnectedOverlayPositions", "positions"],
      positionStrategy: [0, "cdkConnectedOverlayPositionStrategy", "positionStrategy"],
      offsetX: [0, "cdkConnectedOverlayOffsetX", "offsetX"],
      offsetY: [0, "cdkConnectedOverlayOffsetY", "offsetY"],
      width: [0, "cdkConnectedOverlayWidth", "width"],
      height: [0, "cdkConnectedOverlayHeight", "height"],
      minWidth: [0, "cdkConnectedOverlayMinWidth", "minWidth"],
      minHeight: [0, "cdkConnectedOverlayMinHeight", "minHeight"],
      backdropClass: [0, "cdkConnectedOverlayBackdropClass", "backdropClass"],
      panelClass: [0, "cdkConnectedOverlayPanelClass", "panelClass"],
      viewportMargin: [0, "cdkConnectedOverlayViewportMargin", "viewportMargin"],
      scrollStrategy: [0, "cdkConnectedOverlayScrollStrategy", "scrollStrategy"],
      open: [0, "cdkConnectedOverlayOpen", "open"],
      disableClose: [0, "cdkConnectedOverlayDisableClose", "disableClose"],
      transformOriginSelector: [0, "cdkConnectedOverlayTransformOriginOn", "transformOriginSelector"],
      hasBackdrop: [2, "cdkConnectedOverlayHasBackdrop", "hasBackdrop", booleanAttribute],
      lockPosition: [2, "cdkConnectedOverlayLockPosition", "lockPosition", booleanAttribute],
      flexibleDimensions: [2, "cdkConnectedOverlayFlexibleDimensions", "flexibleDimensions", booleanAttribute],
      growAfterOpen: [2, "cdkConnectedOverlayGrowAfterOpen", "growAfterOpen", booleanAttribute],
      push: [2, "cdkConnectedOverlayPush", "push", booleanAttribute],
      disposeOnNavigation: [2, "cdkConnectedOverlayDisposeOnNavigation", "disposeOnNavigation", booleanAttribute]
    },
    outputs: {
      backdropClick: "backdropClick",
      positionChange: "positionChange",
      attach: "attach",
      detach: "detach",
      overlayKeydown: "overlayKeydown",
      overlayOutsideClick: "overlayOutsideClick"
    },
    exportAs: ["cdkConnectedOverlay"],
    features: [\u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkConnectedOverlay, [{
    type: Directive,
    args: [{
      selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]",
      exportAs: "cdkConnectedOverlay"
    }]
  }], () => [], {
    origin: [{
      type: Input,
      args: ["cdkConnectedOverlayOrigin"]
    }],
    positions: [{
      type: Input,
      args: ["cdkConnectedOverlayPositions"]
    }],
    positionStrategy: [{
      type: Input,
      args: ["cdkConnectedOverlayPositionStrategy"]
    }],
    offsetX: [{
      type: Input,
      args: ["cdkConnectedOverlayOffsetX"]
    }],
    offsetY: [{
      type: Input,
      args: ["cdkConnectedOverlayOffsetY"]
    }],
    width: [{
      type: Input,
      args: ["cdkConnectedOverlayWidth"]
    }],
    height: [{
      type: Input,
      args: ["cdkConnectedOverlayHeight"]
    }],
    minWidth: [{
      type: Input,
      args: ["cdkConnectedOverlayMinWidth"]
    }],
    minHeight: [{
      type: Input,
      args: ["cdkConnectedOverlayMinHeight"]
    }],
    backdropClass: [{
      type: Input,
      args: ["cdkConnectedOverlayBackdropClass"]
    }],
    panelClass: [{
      type: Input,
      args: ["cdkConnectedOverlayPanelClass"]
    }],
    viewportMargin: [{
      type: Input,
      args: ["cdkConnectedOverlayViewportMargin"]
    }],
    scrollStrategy: [{
      type: Input,
      args: ["cdkConnectedOverlayScrollStrategy"]
    }],
    open: [{
      type: Input,
      args: ["cdkConnectedOverlayOpen"]
    }],
    disableClose: [{
      type: Input,
      args: ["cdkConnectedOverlayDisableClose"]
    }],
    transformOriginSelector: [{
      type: Input,
      args: ["cdkConnectedOverlayTransformOriginOn"]
    }],
    hasBackdrop: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayHasBackdrop",
        transform: booleanAttribute
      }]
    }],
    lockPosition: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayLockPosition",
        transform: booleanAttribute
      }]
    }],
    flexibleDimensions: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayFlexibleDimensions",
        transform: booleanAttribute
      }]
    }],
    growAfterOpen: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayGrowAfterOpen",
        transform: booleanAttribute
      }]
    }],
    push: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayPush",
        transform: booleanAttribute
      }]
    }],
    disposeOnNavigation: [{
      type: Input,
      args: [{
        alias: "cdkConnectedOverlayDisposeOnNavigation",
        transform: booleanAttribute
      }]
    }],
    backdropClick: [{
      type: Output
    }],
    positionChange: [{
      type: Output
    }],
    attach: [{
      type: Output
    }],
    detach: [{
      type: Output
    }],
    overlayKeydown: [{
      type: Output
    }],
    overlayOutsideClick: [{
      type: Output
    }]
  });
})();
function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
  const injector = inject(Injector);
  return () => createRepositionScrollStrategy(injector);
}
var CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
  provide: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY,
  useFactory: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY
};
var OverlayModule = class _OverlayModule {
  static \u0275fac = function OverlayModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverlayModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _OverlayModule,
    imports: [BidiModule, PortalModule, ScrollingModule, CdkConnectedOverlay, CdkOverlayOrigin],
    exports: [CdkConnectedOverlay, CdkOverlayOrigin, ScrollingModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [Overlay, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER],
    imports: [BidiModule, PortalModule, ScrollingModule, ScrollingModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule, PortalModule, ScrollingModule, CdkConnectedOverlay, CdkOverlayOrigin],
      exports: [CdkConnectedOverlay, CdkOverlayOrigin, ScrollingModule],
      providers: [Overlay, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER]
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/overlay.mjs
var FullscreenOverlayContainer = class _FullscreenOverlayContainer extends OverlayContainer {
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _fullScreenEventName;
  _cleanupFullScreenListener;
  constructor() {
    super();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._cleanupFullScreenListener?.();
  }
  _createContainer() {
    const eventName = this._getEventName();
    super._createContainer();
    this._adjustParentForFullscreenChange();
    if (eventName) {
      this._cleanupFullScreenListener?.();
      this._cleanupFullScreenListener = this._renderer.listen("document", eventName, () => {
        this._adjustParentForFullscreenChange();
      });
    }
  }
  _adjustParentForFullscreenChange() {
    if (this._containerElement) {
      const fullscreenElement = this.getFullscreenElement();
      const parent = fullscreenElement || this._document.body;
      parent.appendChild(this._containerElement);
    }
  }
  _getEventName() {
    if (!this._fullScreenEventName) {
      const _document = this._document;
      if (_document.fullscreenEnabled) {
        this._fullScreenEventName = "fullscreenchange";
      } else if (_document.webkitFullscreenEnabled) {
        this._fullScreenEventName = "webkitfullscreenchange";
      } else if (_document.mozFullScreenEnabled) {
        this._fullScreenEventName = "mozfullscreenchange";
      } else if (_document.msFullscreenEnabled) {
        this._fullScreenEventName = "MSFullscreenChange";
      }
    }
    return this._fullScreenEventName;
  }
  /**
   * When the page is put into fullscreen mode, a specific element is specified.
   * Only that element and its children are visible when in fullscreen mode.
   */
  getFullscreenElement() {
    const _document = this._document;
    return _document.fullscreenElement || _document.webkitFullscreenElement || _document.mozFullScreenElement || _document.msFullscreenElement || null;
  }
  static \u0275fac = function FullscreenOverlayContainer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FullscreenOverlayContainer)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _FullscreenOverlayContainer,
    factory: _FullscreenOverlayContainer.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FullscreenOverlayContainer, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/tooltip2.mjs
var _c05 = ["tooltip"];
var SCROLL_THROTTLE_MS = 20;
function getMatTooltipInvalidPositionError(position) {
  return Error(`Tooltip position "${position}" is invalid.`);
}
var MAT_TOOLTIP_SCROLL_STRATEGY = new InjectionToken("mat-tooltip-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createRepositionScrollStrategy(injector, {
      scrollThrottle: SCROLL_THROTTLE_MS
    });
  }
});
function MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY(_overlay) {
  const injector = inject(Injector);
  return () => createRepositionScrollStrategy(injector, {
    scrollThrottle: SCROLL_THROTTLE_MS
  });
}
var MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: MAT_TOOLTIP_SCROLL_STRATEGY,
  deps: [],
  useFactory: MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY
};
function MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY() {
  return {
    showDelay: 0,
    hideDelay: 0,
    touchendHideDelay: 1500
  };
}
var MAT_TOOLTIP_DEFAULT_OPTIONS = new InjectionToken("mat-tooltip-default-options", {
  providedIn: "root",
  factory: MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY
});
var PANEL_CLASS = "tooltip-panel";
var passiveListenerOptions = normalizePassiveListenerOptions({
  passive: true
});
var MIN_VIEWPORT_TOOLTIP_THRESHOLD = 8;
var UNBOUNDED_ANCHOR_GAP = 8;
var MIN_HEIGHT = 24;
var MAX_WIDTH = 200;
var MatTooltip = class _MatTooltip {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _platform = inject(Platform);
  _ariaDescriber = inject(AriaDescriber);
  _focusMonitor = inject(FocusMonitor);
  _dir = inject(Directionality);
  _injector = inject(Injector);
  _viewContainerRef = inject(ViewContainerRef);
  _animationsDisabled = _animationsDisabled();
  _defaultOptions = inject(MAT_TOOLTIP_DEFAULT_OPTIONS, {
    optional: true
  });
  _overlayRef;
  _tooltipInstance;
  _overlayPanelClass;
  // Used for styling internally.
  _portal;
  _position = "below";
  _positionAtOrigin = false;
  _disabled = false;
  _tooltipClass;
  _viewInitialized = false;
  _pointerExitEventsInitialized = false;
  _tooltipComponent = TooltipComponent;
  _viewportMargin = 8;
  _currentPosition;
  _cssClassPrefix = "mat-mdc";
  _ariaDescriptionPending;
  _dirSubscribed = false;
  /** Allows the user to define the position of the tooltip relative to the parent element */
  get position() {
    return this._position;
  }
  set position(value) {
    if (value !== this._position) {
      this._position = value;
      if (this._overlayRef) {
        this._updatePosition(this._overlayRef);
        this._tooltipInstance?.show(0);
        this._overlayRef.updatePosition();
      }
    }
  }
  /**
   * Whether tooltip should be relative to the click or touch origin
   * instead of outside the element bounding box.
   */
  get positionAtOrigin() {
    return this._positionAtOrigin;
  }
  set positionAtOrigin(value) {
    this._positionAtOrigin = coerceBooleanProperty(value);
    this._detach();
    this._overlayRef = null;
  }
  /** Disables the display of the tooltip. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    const isDisabled = coerceBooleanProperty(value);
    if (this._disabled !== isDisabled) {
      this._disabled = isDisabled;
      if (isDisabled) {
        this.hide(0);
      } else {
        this._setupPointerEnterEventsIfNeeded();
      }
      this._syncAriaDescription(this.message);
    }
  }
  /** The default delay in ms before showing the tooltip after show is called */
  get showDelay() {
    return this._showDelay;
  }
  set showDelay(value) {
    this._showDelay = coerceNumberProperty(value);
  }
  _showDelay;
  /** The default delay in ms before hiding the tooltip after hide is called */
  get hideDelay() {
    return this._hideDelay;
  }
  set hideDelay(value) {
    this._hideDelay = coerceNumberProperty(value);
    if (this._tooltipInstance) {
      this._tooltipInstance._mouseLeaveHideDelay = this._hideDelay;
    }
  }
  _hideDelay;
  /**
   * How touch gestures should be handled by the tooltip. On touch devices the tooltip directive
   * uses a long press gesture to show and hide, however it can conflict with the native browser
   * gestures. To work around the conflict, Angular Material disables native gestures on the
   * trigger, but that might not be desirable on particular elements (e.g. inputs and draggable
   * elements). The different values for this option configure the touch event handling as follows:
   * - `auto` - Enables touch gestures for all elements, but tries to avoid conflicts with native
   *   browser gestures on particular elements. In particular, it allows text selection on inputs
   *   and textareas, and preserves the native browser dragging on elements marked as `draggable`.
   * - `on` - Enables touch gestures for all elements and disables native
   *   browser gestures with no exceptions.
   * - `off` - Disables touch gestures. Note that this will prevent the tooltip from
   *   showing on touch devices.
   */
  touchGestures = "auto";
  /** The message to be displayed in the tooltip */
  get message() {
    return this._message;
  }
  set message(value) {
    const oldMessage = this._message;
    this._message = value != null ? String(value).trim() : "";
    if (!this._message && this._isTooltipVisible()) {
      this.hide(0);
    } else {
      this._setupPointerEnterEventsIfNeeded();
      this._updateTooltipMessage();
    }
    this._syncAriaDescription(oldMessage);
  }
  _message = "";
  /** Classes to be passed to the tooltip. Supports the same syntax as `ngClass`. */
  get tooltipClass() {
    return this._tooltipClass;
  }
  set tooltipClass(value) {
    this._tooltipClass = value;
    if (this._tooltipInstance) {
      this._setTooltipClass(this._tooltipClass);
    }
  }
  /** Manually-bound passive event listeners. */
  _passiveListeners = [];
  /** Timer started at the last `touchstart` event. */
  _touchstartTimeout = null;
  /** Emits when the component is destroyed. */
  _destroyed = new Subject();
  /** Whether ngOnDestroyed has been called. */
  _isDestroyed = false;
  constructor() {
    const defaultOptions = this._defaultOptions;
    if (defaultOptions) {
      this._showDelay = defaultOptions.showDelay;
      this._hideDelay = defaultOptions.hideDelay;
      if (defaultOptions.position) {
        this.position = defaultOptions.position;
      }
      if (defaultOptions.positionAtOrigin) {
        this.positionAtOrigin = defaultOptions.positionAtOrigin;
      }
      if (defaultOptions.touchGestures) {
        this.touchGestures = defaultOptions.touchGestures;
      }
      if (defaultOptions.tooltipClass) {
        this.tooltipClass = defaultOptions.tooltipClass;
      }
    }
    this._viewportMargin = MIN_VIEWPORT_TOOLTIP_THRESHOLD;
  }
  ngAfterViewInit() {
    this._viewInitialized = true;
    this._setupPointerEnterEventsIfNeeded();
    this._focusMonitor.monitor(this._elementRef).pipe(takeUntil(this._destroyed)).subscribe((origin) => {
      if (!origin) {
        this._ngZone.run(() => this.hide(0));
      } else if (origin === "keyboard") {
        this._ngZone.run(() => this.show());
      }
    });
  }
  /**
   * Dispose the tooltip when destroyed.
   */
  ngOnDestroy() {
    const nativeElement = this._elementRef.nativeElement;
    if (this._touchstartTimeout) {
      clearTimeout(this._touchstartTimeout);
    }
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._tooltipInstance = null;
    }
    this._passiveListeners.forEach(([event, listener]) => {
      nativeElement.removeEventListener(event, listener, passiveListenerOptions);
    });
    this._passiveListeners.length = 0;
    this._destroyed.next();
    this._destroyed.complete();
    this._isDestroyed = true;
    this._ariaDescriber.removeDescription(nativeElement, this.message, "tooltip");
    this._focusMonitor.stopMonitoring(nativeElement);
  }
  /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
  show(delay = this.showDelay, origin) {
    if (this.disabled || !this.message || this._isTooltipVisible()) {
      this._tooltipInstance?._cancelPendingAnimations();
      return;
    }
    const overlayRef = this._createOverlay(origin);
    this._detach();
    this._portal = this._portal || new ComponentPortal(this._tooltipComponent, this._viewContainerRef);
    const instance = this._tooltipInstance = overlayRef.attach(this._portal).instance;
    instance._triggerElement = this._elementRef.nativeElement;
    instance._mouseLeaveHideDelay = this._hideDelay;
    instance.afterHidden().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    this._setTooltipClass(this._tooltipClass);
    this._updateTooltipMessage();
    instance.show(delay);
  }
  /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
  hide(delay = this.hideDelay) {
    const instance = this._tooltipInstance;
    if (instance) {
      if (instance.isVisible()) {
        instance.hide(delay);
      } else {
        instance._cancelPendingAnimations();
        this._detach();
      }
    }
  }
  /** Shows/hides the tooltip */
  toggle(origin) {
    this._isTooltipVisible() ? this.hide() : this.show(void 0, origin);
  }
  /** Returns true if the tooltip is currently visible to the user */
  _isTooltipVisible() {
    return !!this._tooltipInstance && this._tooltipInstance.isVisible();
  }
  /** Create the overlay config and position strategy */
  _createOverlay(origin) {
    if (this._overlayRef) {
      const existingStrategy = this._overlayRef.getConfig().positionStrategy;
      if ((!this.positionAtOrigin || !origin) && existingStrategy._origin instanceof ElementRef) {
        return this._overlayRef;
      }
      this._detach();
    }
    const scrollableAncestors = this._injector.get(ScrollDispatcher).getAncestorScrollContainers(this._elementRef);
    const panelClass = `${this._cssClassPrefix}-${PANEL_CLASS}`;
    const strategy = createFlexibleConnectedPositionStrategy(this._injector, this.positionAtOrigin ? origin || this._elementRef : this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(false).withViewportMargin(this._viewportMargin).withScrollableContainers(scrollableAncestors);
    strategy.positionChanges.pipe(takeUntil(this._destroyed)).subscribe((change) => {
      this._updateCurrentPositionClass(change.connectionPair);
      if (this._tooltipInstance) {
        if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
          this._ngZone.run(() => this.hide(0));
        }
      }
    });
    this._overlayRef = createOverlayRef(this._injector, {
      direction: this._dir,
      positionStrategy: strategy,
      panelClass: this._overlayPanelClass ? [...this._overlayPanelClass, panelClass] : panelClass,
      scrollStrategy: this._injector.get(MAT_TOOLTIP_SCROLL_STRATEGY)(),
      disableAnimations: this._animationsDisabled
    });
    this._updatePosition(this._overlayRef);
    this._overlayRef.detachments().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    this._overlayRef.outsidePointerEvents().pipe(takeUntil(this._destroyed)).subscribe(() => this._tooltipInstance?._handleBodyInteraction());
    this._overlayRef.keydownEvents().pipe(takeUntil(this._destroyed)).subscribe((event) => {
      if (this._isTooltipVisible() && event.keyCode === ESCAPE && !hasModifierKey(event)) {
        event.preventDefault();
        event.stopPropagation();
        this._ngZone.run(() => this.hide(0));
      }
    });
    if (this._defaultOptions?.disableTooltipInteractivity) {
      this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`);
    }
    if (!this._dirSubscribed) {
      this._dirSubscribed = true;
      this._dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
        if (this._overlayRef) {
          this._updatePosition(this._overlayRef);
        }
      });
    }
    return this._overlayRef;
  }
  /** Detaches the currently-attached tooltip. */
  _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._tooltipInstance = null;
  }
  /** Updates the position of the current tooltip. */
  _updatePosition(overlayRef) {
    const position = overlayRef.getConfig().positionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();
    position.withPositions([this._addOffset(__spreadValues(__spreadValues({}, origin.main), overlay.main)), this._addOffset(__spreadValues(__spreadValues({}, origin.fallback), overlay.fallback))]);
  }
  /** Adds the configured offset to a position. Used as a hook for child classes. */
  _addOffset(position) {
    const offset = UNBOUNDED_ANCHOR_GAP;
    const isLtr = !this._dir || this._dir.value == "ltr";
    if (position.originY === "top") {
      position.offsetY = -offset;
    } else if (position.originY === "bottom") {
      position.offsetY = offset;
    } else if (position.originX === "start") {
      position.offsetX = isLtr ? -offset : offset;
    } else if (position.originX === "end") {
      position.offsetX = isLtr ? offset : -offset;
    }
    return position;
  }
  /**
   * Returns the origin position and a fallback position based on the user's position preference.
   * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
   */
  _getOrigin() {
    const isLtr = !this._dir || this._dir.value == "ltr";
    const position = this.position;
    let originPosition;
    if (position == "above" || position == "below") {
      originPosition = {
        originX: "center",
        originY: position == "above" ? "top" : "bottom"
      };
    } else if (position == "before" || position == "left" && isLtr || position == "right" && !isLtr) {
      originPosition = {
        originX: "start",
        originY: "center"
      };
    } else if (position == "after" || position == "right" && isLtr || position == "left" && !isLtr) {
      originPosition = {
        originX: "end",
        originY: "center"
      };
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(originPosition.originX, originPosition.originY);
    return {
      main: originPosition,
      fallback: {
        originX: x,
        originY: y
      }
    };
  }
  /** Returns the overlay position and a fallback position based on the user's preference */
  _getOverlayPosition() {
    const isLtr = !this._dir || this._dir.value == "ltr";
    const position = this.position;
    let overlayPosition;
    if (position == "above") {
      overlayPosition = {
        overlayX: "center",
        overlayY: "bottom"
      };
    } else if (position == "below") {
      overlayPosition = {
        overlayX: "center",
        overlayY: "top"
      };
    } else if (position == "before" || position == "left" && isLtr || position == "right" && !isLtr) {
      overlayPosition = {
        overlayX: "end",
        overlayY: "center"
      };
    } else if (position == "after" || position == "right" && isLtr || position == "left" && !isLtr) {
      overlayPosition = {
        overlayX: "start",
        overlayY: "center"
      };
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);
    return {
      main: overlayPosition,
      fallback: {
        overlayX: x,
        overlayY: y
      }
    };
  }
  /** Updates the tooltip message and repositions the overlay according to the new message length */
  _updateTooltipMessage() {
    if (this._tooltipInstance) {
      this._tooltipInstance.message = this.message;
      this._tooltipInstance._markForCheck();
      afterNextRender(() => {
        if (this._tooltipInstance) {
          this._overlayRef.updatePosition();
        }
      }, {
        injector: this._injector
      });
    }
  }
  /** Updates the tooltip class */
  _setTooltipClass(tooltipClass) {
    if (this._tooltipInstance) {
      this._tooltipInstance.tooltipClass = tooltipClass;
      this._tooltipInstance._markForCheck();
    }
  }
  /** Inverts an overlay position. */
  _invertPosition(x, y) {
    if (this.position === "above" || this.position === "below") {
      if (y === "top") {
        y = "bottom";
      } else if (y === "bottom") {
        y = "top";
      }
    } else {
      if (x === "end") {
        x = "start";
      } else if (x === "start") {
        x = "end";
      }
    }
    return {
      x,
      y
    };
  }
  /** Updates the class on the overlay panel based on the current position of the tooltip. */
  _updateCurrentPositionClass(connectionPair) {
    const {
      overlayY,
      originX,
      originY
    } = connectionPair;
    let newPosition;
    if (overlayY === "center") {
      if (this._dir && this._dir.value === "rtl") {
        newPosition = originX === "end" ? "left" : "right";
      } else {
        newPosition = originX === "start" ? "left" : "right";
      }
    } else {
      newPosition = overlayY === "bottom" && originY === "top" ? "above" : "below";
    }
    if (newPosition !== this._currentPosition) {
      const overlayRef = this._overlayRef;
      if (overlayRef) {
        const classPrefix = `${this._cssClassPrefix}-${PANEL_CLASS}-`;
        overlayRef.removePanelClass(classPrefix + this._currentPosition);
        overlayRef.addPanelClass(classPrefix + newPosition);
      }
      this._currentPosition = newPosition;
    }
  }
  /** Binds the pointer events to the tooltip trigger. */
  _setupPointerEnterEventsIfNeeded() {
    if (this._disabled || !this.message || !this._viewInitialized || this._passiveListeners.length) {
      return;
    }
    if (this._platformSupportsMouseEvents()) {
      this._passiveListeners.push(["mouseenter", (event) => {
        this._setupPointerExitEventsIfNeeded();
        let point = void 0;
        if (event.x !== void 0 && event.y !== void 0) {
          point = event;
        }
        this.show(void 0, point);
      }]);
    } else if (this.touchGestures !== "off") {
      this._disableNativeGesturesIfNecessary();
      this._passiveListeners.push(["touchstart", (event) => {
        const touch = event.targetTouches?.[0];
        const origin = touch ? {
          x: touch.clientX,
          y: touch.clientY
        } : void 0;
        this._setupPointerExitEventsIfNeeded();
        if (this._touchstartTimeout) {
          clearTimeout(this._touchstartTimeout);
        }
        const DEFAULT_LONGPRESS_DELAY = 500;
        this._touchstartTimeout = setTimeout(() => {
          this._touchstartTimeout = null;
          this.show(void 0, origin);
        }, this._defaultOptions?.touchLongPressShowDelay ?? DEFAULT_LONGPRESS_DELAY);
      }]);
    }
    this._addListeners(this._passiveListeners);
  }
  _setupPointerExitEventsIfNeeded() {
    if (this._pointerExitEventsInitialized) {
      return;
    }
    this._pointerExitEventsInitialized = true;
    const exitListeners = [];
    if (this._platformSupportsMouseEvents()) {
      exitListeners.push(["mouseleave", (event) => {
        const newTarget = event.relatedTarget;
        if (!newTarget || !this._overlayRef?.overlayElement.contains(newTarget)) {
          this.hide();
        }
      }], ["wheel", (event) => this._wheelListener(event)]);
    } else if (this.touchGestures !== "off") {
      this._disableNativeGesturesIfNecessary();
      const touchendListener = () => {
        if (this._touchstartTimeout) {
          clearTimeout(this._touchstartTimeout);
        }
        this.hide(this._defaultOptions?.touchendHideDelay);
      };
      exitListeners.push(["touchend", touchendListener], ["touchcancel", touchendListener]);
    }
    this._addListeners(exitListeners);
    this._passiveListeners.push(...exitListeners);
  }
  _addListeners(listeners) {
    listeners.forEach(([event, listener]) => {
      this._elementRef.nativeElement.addEventListener(event, listener, passiveListenerOptions);
    });
  }
  _platformSupportsMouseEvents() {
    return !this._platform.IOS && !this._platform.ANDROID;
  }
  /** Listener for the `wheel` event on the element. */
  _wheelListener(event) {
    if (this._isTooltipVisible()) {
      const elementUnderPointer = this._injector.get(DOCUMENT).elementFromPoint(event.clientX, event.clientY);
      const element = this._elementRef.nativeElement;
      if (elementUnderPointer !== element && !element.contains(elementUnderPointer)) {
        this.hide();
      }
    }
  }
  /** Disables the native browser gestures, based on how the tooltip has been configured. */
  _disableNativeGesturesIfNecessary() {
    const gestures = this.touchGestures;
    if (gestures !== "off") {
      const element = this._elementRef.nativeElement;
      const style2 = element.style;
      if (gestures === "on" || element.nodeName !== "INPUT" && element.nodeName !== "TEXTAREA") {
        style2.userSelect = style2.msUserSelect = style2.webkitUserSelect = style2.MozUserSelect = "none";
      }
      if (gestures === "on" || !element.draggable) {
        style2.webkitUserDrag = "none";
      }
      style2.touchAction = "none";
      style2.webkitTapHighlightColor = "transparent";
    }
  }
  /** Updates the tooltip's ARIA description based on it current state. */
  _syncAriaDescription(oldMessage) {
    if (this._ariaDescriptionPending) {
      return;
    }
    this._ariaDescriptionPending = true;
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, oldMessage, "tooltip");
    if (!this._isDestroyed) {
      afterNextRender({
        write: () => {
          this._ariaDescriptionPending = false;
          if (this.message && !this.disabled) {
            this._ariaDescriber.describe(this._elementRef.nativeElement, this.message, "tooltip");
          }
        }
      }, {
        injector: this._injector
      });
    }
  }
  static \u0275fac = function MatTooltip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTooltip)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTooltip,
    selectors: [["", "matTooltip", ""]],
    hostAttrs: [1, "mat-mdc-tooltip-trigger"],
    hostVars: 2,
    hostBindings: function MatTooltip_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-mdc-tooltip-disabled", ctx.disabled);
      }
    },
    inputs: {
      position: [0, "matTooltipPosition", "position"],
      positionAtOrigin: [0, "matTooltipPositionAtOrigin", "positionAtOrigin"],
      disabled: [0, "matTooltipDisabled", "disabled"],
      showDelay: [0, "matTooltipShowDelay", "showDelay"],
      hideDelay: [0, "matTooltipHideDelay", "hideDelay"],
      touchGestures: [0, "matTooltipTouchGestures", "touchGestures"],
      message: [0, "matTooltip", "message"],
      tooltipClass: [0, "matTooltipClass", "tooltipClass"]
    },
    exportAs: ["matTooltip"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltip, [{
    type: Directive,
    args: [{
      selector: "[matTooltip]",
      exportAs: "matTooltip",
      host: {
        "class": "mat-mdc-tooltip-trigger",
        "[class.mat-mdc-tooltip-disabled]": "disabled"
      }
    }]
  }], () => [], {
    position: [{
      type: Input,
      args: ["matTooltipPosition"]
    }],
    positionAtOrigin: [{
      type: Input,
      args: ["matTooltipPositionAtOrigin"]
    }],
    disabled: [{
      type: Input,
      args: ["matTooltipDisabled"]
    }],
    showDelay: [{
      type: Input,
      args: ["matTooltipShowDelay"]
    }],
    hideDelay: [{
      type: Input,
      args: ["matTooltipHideDelay"]
    }],
    touchGestures: [{
      type: Input,
      args: ["matTooltipTouchGestures"]
    }],
    message: [{
      type: Input,
      args: ["matTooltip"]
    }],
    tooltipClass: [{
      type: Input,
      args: ["matTooltipClass"]
    }]
  });
})();
var TooltipComponent = class _TooltipComponent {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  /* Whether the tooltip text overflows to multiple lines */
  _isMultiline = false;
  /** Message to display in the tooltip */
  message;
  /** Classes to be added to the tooltip. Supports the same syntax as `ngClass`. */
  tooltipClass;
  /** The timeout ID of any current timer set to show the tooltip */
  _showTimeoutId;
  /** The timeout ID of any current timer set to hide the tooltip */
  _hideTimeoutId;
  /** Element that caused the tooltip to open. */
  _triggerElement;
  /** Amount of milliseconds to delay the closing sequence. */
  _mouseLeaveHideDelay;
  /** Whether animations are currently disabled. */
  _animationsDisabled = _animationsDisabled();
  /** Reference to the internal tooltip element. */
  _tooltip;
  /** Whether interactions on the page should close the tooltip */
  _closeOnInteraction = false;
  /** Whether the tooltip is currently visible. */
  _isVisible = false;
  /** Subject for notifying that the tooltip has been hidden from the view */
  _onHide = new Subject();
  /** Name of the show animation and the class that toggles it. */
  _showAnimation = "mat-mdc-tooltip-show";
  /** Name of the hide animation and the class that toggles it. */
  _hideAnimation = "mat-mdc-tooltip-hide";
  constructor() {
  }
  /**
   * Shows the tooltip with an animation originating from the provided origin
   * @param delay Amount of milliseconds to the delay showing the tooltip.
   */
  show(delay) {
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = setTimeout(() => {
      this._toggleVisibility(true);
      this._showTimeoutId = void 0;
    }, delay);
  }
  /**
   * Begins the animation to hide the tooltip after the provided delay in ms.
   * @param delay Amount of milliseconds to delay showing the tooltip.
   */
  hide(delay) {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    this._hideTimeoutId = setTimeout(() => {
      this._toggleVisibility(false);
      this._hideTimeoutId = void 0;
    }, delay);
  }
  /** Returns an observable that notifies when the tooltip has been hidden from view. */
  afterHidden() {
    return this._onHide;
  }
  /** Whether the tooltip is being displayed. */
  isVisible() {
    return this._isVisible;
  }
  ngOnDestroy() {
    this._cancelPendingAnimations();
    this._onHide.complete();
    this._triggerElement = null;
  }
  /**
   * Interactions on the HTML body should close the tooltip immediately as defined in the
   * material design spec.
   * https://material.io/design/components/tooltips.html#behavior
   */
  _handleBodyInteraction() {
    if (this._closeOnInteraction) {
      this.hide(0);
    }
  }
  /**
   * Marks that the tooltip needs to be checked in the next change detection run.
   * Mainly used for rendering the initial text before positioning a tooltip, which
   * can be problematic in components with OnPush change detection.
   */
  _markForCheck() {
    this._changeDetectorRef.markForCheck();
  }
  _handleMouseLeave({
    relatedTarget
  }) {
    if (!relatedTarget || !this._triggerElement.contains(relatedTarget)) {
      if (this.isVisible()) {
        this.hide(this._mouseLeaveHideDelay);
      } else {
        this._finalizeAnimation(false);
      }
    }
  }
  /**
   * Callback for when the timeout in this.show() gets completed.
   * This method is only needed by the mdc-tooltip, and so it is only implemented
   * in the mdc-tooltip, not here.
   */
  _onShow() {
    this._isMultiline = this._isTooltipMultiline();
    this._markForCheck();
  }
  /** Whether the tooltip text has overflown to the next line */
  _isTooltipMultiline() {
    const rect = this._elementRef.nativeElement.getBoundingClientRect();
    return rect.height > MIN_HEIGHT && rect.width >= MAX_WIDTH;
  }
  /** Event listener dispatched when an animation on the tooltip finishes. */
  _handleAnimationEnd({
    animationName
  }) {
    if (animationName === this._showAnimation || animationName === this._hideAnimation) {
      this._finalizeAnimation(animationName === this._showAnimation);
    }
  }
  /** Cancels any pending animation sequences. */
  _cancelPendingAnimations() {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = this._hideTimeoutId = void 0;
  }
  /** Handles the cleanup after an animation has finished. */
  _finalizeAnimation(toVisible) {
    if (toVisible) {
      this._closeOnInteraction = true;
    } else if (!this.isVisible()) {
      this._onHide.next();
    }
  }
  /** Toggles the visibility of the tooltip element. */
  _toggleVisibility(isVisible) {
    const tooltip = this._tooltip.nativeElement;
    const showClass = this._showAnimation;
    const hideClass = this._hideAnimation;
    tooltip.classList.remove(isVisible ? hideClass : showClass);
    tooltip.classList.add(isVisible ? showClass : hideClass);
    if (this._isVisible !== isVisible) {
      this._isVisible = isVisible;
      this._changeDetectorRef.markForCheck();
    }
    if (isVisible && !this._animationsDisabled && typeof getComputedStyle === "function") {
      const styles = getComputedStyle(tooltip);
      if (styles.getPropertyValue("animation-duration") === "0s" || styles.getPropertyValue("animation-name") === "none") {
        this._animationsDisabled = true;
      }
    }
    if (isVisible) {
      this._onShow();
    }
    if (this._animationsDisabled) {
      tooltip.classList.add("_mat-animation-noopable");
      this._finalizeAnimation(isVisible);
    }
  }
  static \u0275fac = function TooltipComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TooltipComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _TooltipComponent,
    selectors: [["mat-tooltip-component"]],
    viewQuery: function TooltipComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c05, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tooltip = _t.first);
      }
    },
    hostAttrs: ["aria-hidden", "true"],
    hostBindings: function TooltipComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("mouseleave", function TooltipComponent_mouseleave_HostBindingHandler($event) {
          return ctx._handleMouseLeave($event);
        });
      }
    },
    decls: 4,
    vars: 4,
    consts: [["tooltip", ""], [1, "mdc-tooltip", "mat-mdc-tooltip", 3, "animationend", "ngClass"], [1, "mat-mdc-tooltip-surface", "mdc-tooltip__surface"]],
    template: function TooltipComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1, 0);
        \u0275\u0275listener("animationend", function TooltipComponent_Template_div_animationend_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handleAnimationEnd($event));
        });
        \u0275\u0275elementStart(2, "div", 2);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("mdc-tooltip--multiline", ctx._isMultiline);
        \u0275\u0275property("ngClass", ctx.tooltipClass);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.message);
      }
    },
    dependencies: [NgClass],
    styles: ['.mat-mdc-tooltip{position:relative;transform:scale(0);display:inline-flex}.mat-mdc-tooltip::before{content:"";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-surface{word-break:normal;overflow-wrap:anywhere;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center;will-change:transform,opacity;background-color:var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));color:var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));border-radius:var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));font-family:var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));font-size:var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));font-weight:var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));line-height:var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));letter-spacing:var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking))}.mat-mdc-tooltip-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:right}.mat-mdc-tooltip-panel{line-height:normal}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipComponent, [{
    type: Component,
    args: [{
      selector: "mat-tooltip-component",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "(mouseleave)": "_handleMouseLeave($event)",
        "aria-hidden": "true"
      },
      imports: [NgClass],
      template: '<div\n  #tooltip\n  class="mdc-tooltip mat-mdc-tooltip"\n  [ngClass]="tooltipClass"\n  (animationend)="_handleAnimationEnd($event)"\n  [class.mdc-tooltip--multiline]="_isMultiline">\n  <div class="mat-mdc-tooltip-surface mdc-tooltip__surface">{{message}}</div>\n</div>\n',
      styles: ['.mat-mdc-tooltip{position:relative;transform:scale(0);display:inline-flex}.mat-mdc-tooltip::before{content:"";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-surface{word-break:normal;overflow-wrap:anywhere;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center;will-change:transform,opacity;background-color:var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));color:var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));border-radius:var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));font-family:var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));font-size:var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));font-weight:var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));line-height:var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));letter-spacing:var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking))}.mat-mdc-tooltip-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:right}.mat-mdc-tooltip-panel{line-height:normal}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}\n']
    }]
  }], () => [], {
    _tooltip: [{
      type: ViewChild,
      args: ["tooltip", {
        // Use a static query here since we interact directly with
        // the DOM which can happen before `ngAfterViewInit`.
        static: true
      }]
    }]
  });
})();

// node_modules/@angular/material/fesm2022/tooltip-module.mjs
var MatTooltipModule = class _MatTooltipModule {
  static \u0275fac = function MatTooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTooltipModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatTooltipModule,
    imports: [A11yModule, OverlayModule, MatCommonModule, MatTooltip, TooltipComponent],
    exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
    imports: [A11yModule, OverlayModule, MatCommonModule, MatCommonModule, CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [A11yModule, OverlayModule, MatCommonModule, MatTooltip, TooltipComponent],
      exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule],
      providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/progress-bar.mjs
function MatProgressBar_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 2);
  }
}
var MAT_PROGRESS_BAR_DEFAULT_OPTIONS = new InjectionToken("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");
var MAT_PROGRESS_BAR_LOCATION = new InjectionToken("mat-progress-bar-location", {
  providedIn: "root",
  factory: MAT_PROGRESS_BAR_LOCATION_FACTORY
});
function MAT_PROGRESS_BAR_LOCATION_FACTORY() {
  const _document = inject(DOCUMENT);
  const _location = _document ? _document.location : null;
  return {
    // Note that this needs to be a function, rather than a property, because Angular
    // will only resolve it once, but we want the current path on each call.
    getPathname: () => _location ? _location.pathname + _location.search : ""
  };
}
var MatProgressBar = class _MatProgressBar {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _renderer = inject(Renderer2);
  _cleanupTransitionEnd;
  constructor() {
    const animationsState = _getAnimationsState();
    const defaults2 = inject(MAT_PROGRESS_BAR_DEFAULT_OPTIONS, {
      optional: true
    });
    this._isNoopAnimation = animationsState === "di-disabled";
    if (animationsState === "reduced-motion") {
      this._elementRef.nativeElement.classList.add("mat-progress-bar-reduced-motion");
    }
    if (defaults2) {
      if (defaults2.color) {
        this.color = this._defaultColor = defaults2.color;
      }
      this.mode = defaults2.mode || this.mode;
    }
  }
  /** Flag that indicates whether NoopAnimations mode is set to true. */
  _isNoopAnimation;
  // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
  /**
   * Theme color of the progress bar. This API is supported in M2 themes only, it
   * has no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/progress-bar/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  get color() {
    return this._color || this._defaultColor;
  }
  set color(value) {
    this._color = value;
  }
  _color;
  _defaultColor = "primary";
  /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = clamp(v || 0);
    this._changeDetectorRef.markForCheck();
  }
  _value = 0;
  /** Buffer value of the progress bar. Defaults to zero. */
  get bufferValue() {
    return this._bufferValue || 0;
  }
  set bufferValue(v) {
    this._bufferValue = clamp(v || 0);
    this._changeDetectorRef.markForCheck();
  }
  _bufferValue = 0;
  /**
   * Event emitted when animation of the primary progress bar completes. This event will not
   * be emitted when animations are disabled, nor will it be emitted for modes with continuous
   * animations (indeterminate and query).
   */
  animationEnd = new EventEmitter();
  /**
   * Mode of the progress bar.
   *
   * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
   * 'determinate'.
   * Mirrored to mode attribute.
   */
  get mode() {
    return this._mode;
  }
  set mode(value) {
    this._mode = value;
    this._changeDetectorRef.markForCheck();
  }
  _mode = "determinate";
  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._cleanupTransitionEnd = this._renderer.listen(this._elementRef.nativeElement, "transitionend", this._transitionendHandler);
    });
  }
  ngOnDestroy() {
    this._cleanupTransitionEnd?.();
  }
  /** Gets the transform style that should be applied to the primary bar. */
  _getPrimaryBarTransform() {
    return `scaleX(${this._isIndeterminate() ? 1 : this.value / 100})`;
  }
  /** Gets the `flex-basis` value that should be applied to the buffer bar. */
  _getBufferBarFlexBasis() {
    return `${this.mode === "buffer" ? this.bufferValue : 100}%`;
  }
  /** Returns whether the progress bar is indeterminate. */
  _isIndeterminate() {
    return this.mode === "indeterminate" || this.mode === "query";
  }
  /** Event handler for `transitionend` events. */
  _transitionendHandler = (event) => {
    if (this.animationEnd.observers.length === 0 || !event.target || !event.target.classList.contains("mdc-linear-progress__primary-bar")) {
      return;
    }
    if (this.mode === "determinate" || this.mode === "buffer") {
      this._ngZone.run(() => this.animationEnd.next({
        value: this.value
      }));
    }
  };
  static \u0275fac = function MatProgressBar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressBar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatProgressBar,
    selectors: [["mat-progress-bar"]],
    hostAttrs: ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", "tabindex", "-1", 1, "mat-mdc-progress-bar", "mdc-linear-progress"],
    hostVars: 10,
    hostBindings: function MatProgressBar_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-valuenow", ctx._isIndeterminate() ? null : ctx.value)("mode", ctx.mode);
        \u0275\u0275classMap("mat-" + ctx.color);
        \u0275\u0275classProp("_mat-animation-noopable", ctx._isNoopAnimation)("mdc-linear-progress--animation-ready", !ctx._isNoopAnimation)("mdc-linear-progress--indeterminate", ctx._isIndeterminate());
      }
    },
    inputs: {
      color: "color",
      value: [2, "value", "value", numberAttribute],
      bufferValue: [2, "bufferValue", "bufferValue", numberAttribute],
      mode: "mode"
    },
    outputs: {
      animationEnd: "animationEnd"
    },
    exportAs: ["matProgressBar"],
    decls: 7,
    vars: 5,
    consts: [["aria-hidden", "true", 1, "mdc-linear-progress__buffer"], [1, "mdc-linear-progress__buffer-bar"], [1, "mdc-linear-progress__buffer-dots"], ["aria-hidden", "true", 1, "mdc-linear-progress__bar", "mdc-linear-progress__primary-bar"], [1, "mdc-linear-progress__bar-inner"], ["aria-hidden", "true", 1, "mdc-linear-progress__bar", "mdc-linear-progress__secondary-bar"]],
    template: function MatProgressBar_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275domElement(1, "div", 1);
        \u0275\u0275conditionalCreate(2, MatProgressBar_Conditional_2_Template, 1, 0, "div", 2);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(3, "div", 3);
        \u0275\u0275domElement(4, "span", 4);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(5, "div", 5);
        \u0275\u0275domElement(6, "span", 4);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275styleProp("flex-basis", ctx._getBufferBarFlexBasis());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.mode === "buffer" ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275styleProp("transform", ctx._getPrimaryBarTransform());
      }
    },
    styles: [".mat-mdc-progress-bar{--mat-progress-bar-animation-multiplier: 1;display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mat-progress-bar-reduced-motion{--mat-progress-bar-animation-multiplier: 2}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mat-progress-bar-track-height, 4px),var(--mat-progress-bar-active-indicator-height, 4px))}@media(forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mat-progress-bar-track-height, 4px);border-radius:var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none))}.mdc-linear-progress__buffer-dots{background-image:radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);background-repeat:repeat-x;background-size:calc(calc(var(--mat-progress-bar-track-height, 4px) / 2)*5);background-position:left;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressBar, [{
    type: Component,
    args: [{
      selector: "mat-progress-bar",
      exportAs: "matProgressBar",
      host: {
        "role": "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        // set tab index to -1 so screen readers will read the aria-label
        // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
        "tabindex": "-1",
        "[attr.aria-valuenow]": "_isIndeterminate() ? null : value",
        "[attr.mode]": "mode",
        "class": "mat-mdc-progress-bar mdc-linear-progress",
        "[class]": '"mat-" + color',
        "[class._mat-animation-noopable]": "_isNoopAnimation",
        "[class.mdc-linear-progress--animation-ready]": "!_isNoopAnimation",
        "[class.mdc-linear-progress--indeterminate]": "_isIndeterminate()"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `<!--
  All children need to be hidden for screen readers in order to support ChromeVox.
  More context in the issue: https://github.com/angular/components/issues/22165.
-->
<div class="mdc-linear-progress__buffer" aria-hidden="true">
  <div
    class="mdc-linear-progress__buffer-bar"
    [style.flex-basis]="_getBufferBarFlexBasis()"></div>
  <!-- Remove the dots outside of buffer mode since they can cause CSP issues (see #28938) -->
  @if (mode === 'buffer') {
    <div class="mdc-linear-progress__buffer-dots"></div>
  }
</div>
<div
  class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
  aria-hidden="true"
  [style.transform]="_getPrimaryBarTransform()">
  <span class="mdc-linear-progress__bar-inner"></span>
</div>
<div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar" aria-hidden="true">
  <span class="mdc-linear-progress__bar-inner"></span>
</div>
`,
      styles: [".mat-mdc-progress-bar{--mat-progress-bar-animation-multiplier: 1;display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mat-progress-bar-reduced-motion{--mat-progress-bar-animation-multiplier: 2}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mat-progress-bar-track-height, 4px),var(--mat-progress-bar-active-indicator-height, 4px))}@media(forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mat-progress-bar-track-height, 4px);border-radius:var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none))}.mdc-linear-progress__buffer-dots{background-image:radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);background-repeat:repeat-x;background-size:calc(calc(var(--mat-progress-bar-track-height, 4px) / 2)*5);background-position:left;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    value: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    bufferValue: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    animationEnd: [{
      type: Output
    }],
    mode: [{
      type: Input
    }]
  });
})();
function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}
var MatProgressBarModule = class _MatProgressBarModule {
  static \u0275fac = function MatProgressBarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressBarModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatProgressBarModule,
    imports: [MatProgressBar],
    exports: [MatProgressBar, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressBarModule, [{
    type: NgModule,
    args: [{
      imports: [MatProgressBar],
      exports: [MatProgressBar, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/@angular/animations/fesm2022/animations.mjs
var AnimationBuilder = class _AnimationBuilder {
  static \u0275fac = function AnimationBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnimationBuilder)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AnimationBuilder,
    factory: () => (() => inject(BrowserAnimationBuilder))(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(BrowserAnimationBuilder)
    }]
  }], null, null);
})();
var AnimationFactory = class {
};
var BrowserAnimationBuilder = class _BrowserAnimationBuilder extends AnimationBuilder {
  animationModuleType = inject(ANIMATION_MODULE_TYPE, {
    optional: true
  });
  _nextAnimationId = 0;
  _renderer;
  constructor(rootRenderer, doc) {
    super();
    const typeData = {
      id: "0",
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {
        animation: []
      }
    };
    this._renderer = rootRenderer.createRenderer(doc.body, typeData);
    if (this.animationModuleType === null && !isAnimationRenderer(this._renderer)) {
      throw new RuntimeError(3600, (typeof ngDevMode === "undefined" || ngDevMode) && "Angular detected that the `AnimationBuilder` was injected, but animation support was not enabled. Please make sure that you enable animations in your application by calling `provideAnimations()` or `provideAnimationsAsync()` function.");
    }
  }
  build(animation2) {
    const id = this._nextAnimationId;
    this._nextAnimationId++;
    const entry = Array.isArray(animation2) ? sequence(animation2) : animation2;
    issueAnimationCommand(this._renderer, null, id, "register", [entry]);
    return new BrowserAnimationFactory(id, this._renderer);
  }
  static \u0275fac = function BrowserAnimationBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrowserAnimationBuilder)(\u0275\u0275inject(RendererFactory2), \u0275\u0275inject(DOCUMENT));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _BrowserAnimationBuilder,
    factory: _BrowserAnimationBuilder.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserAnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: RendererFactory2
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var BrowserAnimationFactory = class extends AnimationFactory {
  _id;
  _renderer;
  constructor(_id, _renderer) {
    super();
    this._id = _id;
    this._renderer = _renderer;
  }
  create(element, options) {
    return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
  }
};
var RendererAnimationPlayer = class {
  id;
  element;
  _renderer;
  parentPlayer = null;
  _started = false;
  constructor(id, element, options, _renderer) {
    this.id = id;
    this.element = element;
    this._renderer = _renderer;
    this._command("create", options);
  }
  _listen(eventName, callback) {
    return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
  }
  _command(command, ...args) {
    issueAnimationCommand(this._renderer, this.element, this.id, command, args);
  }
  onDone(fn) {
    this._listen("done", fn);
  }
  onStart(fn) {
    this._listen("start", fn);
  }
  onDestroy(fn) {
    this._listen("destroy", fn);
  }
  init() {
    this._command("init");
  }
  hasStarted() {
    return this._started;
  }
  play() {
    this._command("play");
    this._started = true;
  }
  pause() {
    this._command("pause");
  }
  restart() {
    this._command("restart");
  }
  finish() {
    this._command("finish");
  }
  destroy() {
    this._command("destroy");
  }
  reset() {
    this._command("reset");
    this._started = false;
  }
  setPosition(p) {
    this._command("setPosition", p);
  }
  getPosition() {
    return unwrapAnimationRenderer(this._renderer)?.engine?.players[this.id]?.getPosition() ?? 0;
  }
  totalTime = 0;
};
function issueAnimationCommand(renderer, element, id, command, args) {
  renderer.setProperty(element, `@@${id}:${command}`, args);
}
function unwrapAnimationRenderer(renderer) {
  const type = renderer.\u0275type;
  if (type === 0) {
    return renderer;
  } else if (type === 1) {
    return renderer.animationRenderer;
  }
  return null;
}
function isAnimationRenderer(renderer) {
  const type = renderer.\u0275type;
  return type === 0 || type === 1;
}

// src/app/services/analysis.service.ts
var DISEASE_META = {
  "Normal": { colorKey: "green", icon: "check_circle" },
  "Pneumonia": { colorKey: "orange", icon: "air" },
  "Tuberculose": { colorKey: "red", icon: "warning" },
  "Cardiomegalia": { colorKey: "purple", icon: "favorite" },
  "Derrame Pleural": { colorKey: "cyan", icon: "water_drop" }
};
var _AnalysisService = class _AnalysisService {
  constructor(http) {
    this.http = http;
    this.baseUrl = "http://localhost:8080/api/v1";
  }
  analisarTriagem(imagem) {
    const form = new FormData();
    form.append("imagem", imagem);
    return this.http.post(`${this.baseUrl}/analise/triagem`, form).pipe(map((r) => ({
      id: r.id,
      status: r.status,
      confidence: r.confianca,
      timestamp: /* @__PURE__ */ new Date()
    })));
  }
  analisarDiagnostico(imagem) {
    const form = new FormData();
    form.append("imagem", imagem);
    return this.http.post(`${this.baseUrl}/analise/diagnostico`, form).pipe(map((r) => {
      const mapDisease = (p) => __spreadValues({
        name: p.nome,
        probability: p.probabilidade,
        severity: this.mapSeveridade(p.severidade)
      }, DISEASE_META[p.nome] ?? { colorKey: "green", icon: "check_circle" });
      return {
        id: r.id,
        probabilities: r.probabilidades.map(mapDisease),
        primaryDiagnosis: mapDisease(r.diagnosticoPrimario),
        timestamp: /* @__PURE__ */ new Date()
      };
    }));
  }
  enviarFeedbackTriagem(analiseId, predicao, correcao) {
    return this.http.post(`${this.baseUrl}/feedback/triagem`, { analiseId, predicao, correcao });
  }
  enviarFeedbackDiagnostico(analiseId, predicaoPrimaria, correcao) {
    return this.http.post(`${this.baseUrl}/feedback/diagnostico`, { analiseId, predicaoPrimaria, correcao });
  }
  mapSeveridade(s) {
    const map2 = {
      none: "none",
      low: "low",
      moderate: "moderate",
      high: "high"
    };
    return map2[s] ?? "none";
  }
};
_AnalysisService.\u0275fac = function AnalysisService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AnalysisService)(\u0275\u0275inject(HttpClient));
};
_AnalysisService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AnalysisService, factory: _AnalysisService.\u0275fac, providedIn: "root" });
var AnalysisService = _AnalysisService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnalysisService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/components/triagem/triagem.component.ts
var _c06 = ["fileInput"];
var _c15 = ["changeInput"];
function TriagemComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275listener("click", function TriagemComponent_Conditional_12_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.triggerFileInput());
    })("dragover", function TriagemComponent_Conditional_12_Template_div_dragover_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragOver($event));
    })("dragleave", function TriagemComponent_Conditional_12_Template_div_dragleave_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragLeave());
    })("drop", function TriagemComponent_Conditional_12_Template_div_drop_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDrop($event));
    });
    \u0275\u0275elementStart(1, "input", 15, 0);
    \u0275\u0275listener("change", function TriagemComponent_Conditional_12_Template_input_change_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 16)(4, "mat-icon");
    \u0275\u0275text(5, "cloud_upload");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 17);
    \u0275\u0275text(7, "Arraste a imagem aqui");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 18);
    \u0275\u0275text(9, "ou ");
    \u0275\u0275elementStart(10, "span", 19);
    \u0275\u0275text(11, "clique para selecionar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 20)(13, "span");
    \u0275\u0275text(14, "PNG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "JPG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "JPEG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 21);
    \u0275\u0275text(20, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "M\xE1x. 10 MB");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("dragging", ctx_r1.isDragging());
  }
}
function TriagemComponent_Conditional_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 29);
    \u0275\u0275elementStart(1, "div", 30)(2, "div", 31)(3, "mat-icon");
    \u0275\u0275text(4, "radar");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " A processar... ");
    \u0275\u0275elementEnd()();
  }
}
function TriagemComponent_Conditional_13_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function TriagemComponent_Conditional_13_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.analyze());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "analytics");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Analisar Triagem ");
    \u0275\u0275elementEnd();
  }
}
function TriagemComponent_Conditional_13_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function TriagemComponent_Conditional_13_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.reset());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Nova An\xE1lise ");
    \u0275\u0275elementEnd();
  }
}
function TriagemComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23);
    \u0275\u0275element(2, "img", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, TriagemComponent_Conditional_13_Conditional_3_Template, 6, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 25)(5, "button", 26);
    \u0275\u0275listener("click", function TriagemComponent_Conditional_13_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.triggerChangeInput());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "swap_horiz");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Alterar Imagem ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 15, 1);
    \u0275\u0275listener("change", function TriagemComponent_Conditional_13_Template_input_change_9_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, TriagemComponent_Conditional_13_Conditional_11_Template, 4, 0, "button", 27);
    \u0275\u0275conditionalCreate(12, TriagemComponent_Conditional_13_Conditional_12_Template, 4, 0, "button", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r1.selectedImage(), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isAnalyzing() ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isAnalyzing());
    \u0275\u0275advance(6);
    \u0275\u0275conditional(!ctx_r1.isAnalyzing() && !ctx_r1.result() ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.result() || ctx_r1.error() ? 12 : -1);
  }
}
function TriagemComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 34);
    \u0275\u0275element(2, "div", 35)(3, "div", 36);
    \u0275\u0275elementStart(4, "mat-icon", 37);
    \u0275\u0275text(5, "radar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 38);
    \u0275\u0275text(7, "A analisar a imagem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 39);
    \u0275\u0275text(9, "Processando padr\xF5es e caracter\xEDsticas...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "mat-progress-bar", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("@fadeSlideIn", void 0);
  }
}
function TriagemComponent_Conditional_25_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "mat-icon");
    \u0275\u0275text(2, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Recomenda-se prosseguir para an\xE1lise detalhada no separador ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6, "Diagn\xF3stico");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, ".");
    \u0275\u0275elementEnd()();
  }
}
function TriagemComponent_Conditional_25_Conditional_47_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "p", 58);
    \u0275\u0275text(2, " Considera o resultado ");
    \u0275\u0275elementStart(3, "span", 59)(4, "mat-icon");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " ? ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 60)(9, "button", 61);
    \u0275\u0275listener("click", function TriagemComponent_Conditional_25_Conditional_47_Conditional_8_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.confirmFeedback());
    });
    \u0275\u0275elementStart(10, "mat-icon");
    \u0275\u0275text(11, "thumb_up");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Sim, enviar feedback ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 62);
    \u0275\u0275listener("click", function TriagemComponent_Conditional_25_Conditional_47_Conditional_8_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.dismissFeedback());
    });
    \u0275\u0275elementStart(14, "mat-icon");
    \u0275\u0275text(15, "close");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " N\xE3o ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("@slideDown", void 0);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("label-normal", ctx_r1.suggestedCorrection() === "Normal")("label-anomalo", ctx_r1.suggestedCorrection() === "An\xF4malo");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.suggestedCorrection() === "Normal" ? "check_circle" : "error");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.suggestedCorrection(), " ");
  }
}
function TriagemComponent_Conditional_25_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "button", 55);
    \u0275\u0275listener("click", function TriagemComponent_Conditional_25_Conditional_47_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleFeedback());
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "feedback");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Acha que a previs\xE3o est\xE1 errada?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-icon", 56);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, TriagemComponent_Conditional_25_Conditional_47_Conditional_8_Template, 17, 7, "div", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.showFeedback());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.showFeedback() ? "expand_less" : "expand_more");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showFeedback() ? 8 : -1);
  }
}
function TriagemComponent_Conditional_25_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "mat-icon");
    \u0275\u0275text(2, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Obrigado pelo seu feedback m\xE9dico!");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275property("@fadeSlideIn", void 0);
  }
}
function TriagemComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 41)(2, "mat-icon", 42);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 43)(5, "span", 44);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 45);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 46);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 47)(12, "div", 48)(13, "mat-icon");
    \u0275\u0275text(14, "speed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div")(16, "span", 49);
    \u0275\u0275text(17, "Confian\xE7a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 50);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 48)(21, "mat-icon");
    \u0275\u0275text(22, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div")(24, "span", 49);
    \u0275\u0275text(25, "Data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 51);
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 48)(30, "mat-icon");
    \u0275\u0275text(31, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div")(33, "span", 49);
    \u0275\u0275text(34, "Hora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 51);
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 48)(39, "mat-icon");
    \u0275\u0275text(40, "medical_services");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div")(42, "span", 49);
    \u0275\u0275text(43, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 51);
    \u0275\u0275text(45, "Triagem Inicial");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(46, TriagemComponent_Conditional_25_Conditional_46_Template, 8, 0, "div", 52);
    \u0275\u0275conditionalCreate(47, TriagemComponent_Conditional_25_Conditional_47_Template, 9, 4, "div", 53)(48, TriagemComponent_Conditional_25_Conditional_48_Template, 5, 1, "div", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("@fadeSlideIn", void 0);
    \u0275\u0275advance();
    \u0275\u0275classProp("status-normal", ctx_r1.result().status === "Normal")("status-anomalo", ctx_r1.result().status === "An\xF4malo");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.result().status === "Normal" ? "check_circle" : "error", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.result().status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.result().status === "Normal" ? "Sem anomalias detectadas" : "Anomalia identificada", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.result().confidence, "%");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("", ctx_r1.result().confidence, "%");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(28, 14, ctx_r1.result().timestamp, "dd/MM/yyyy"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(37, 17, ctx_r1.result().timestamp, "HH:mm:ss"));
    \u0275\u0275advance(10);
    \u0275\u0275conditional(ctx_r1.result().status === "An\xF4malo" ? 46 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.feedbackSubmitted() ? 47 : 48);
  }
}
function TriagemComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "mat-icon", 63);
    \u0275\u0275text(2, "cloud_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 64);
    \u0275\u0275text(4, "Erro na an\xE1lise");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 65);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("@fadeSlideIn", void 0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function TriagemComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 66)(2, "mat-icon");
    \u0275\u0275text(3, "medical_information");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 67);
    \u0275\u0275text(5, "Aguardando imagem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 68);
    \u0275\u0275text(7, " Carregue uma imagem de raio-X e clique em");
    \u0275\u0275element(8, "br");
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10, '"Analisar Triagem"');
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " para obter o resultado. ");
    \u0275\u0275elementEnd()();
  }
}
var _TriagemComponent = class _TriagemComponent {
  constructor(analysisService) {
    this.analysisService = analysisService;
    this.selectedImage = signal(null, ...ngDevMode ? [{ debugName: "selectedImage" }] : []);
    this.selectedFile = signal(null, ...ngDevMode ? [{ debugName: "selectedFile" }] : []);
    this.isAnalyzing = signal(false, ...ngDevMode ? [{ debugName: "isAnalyzing" }] : []);
    this.result = signal(null, ...ngDevMode ? [{ debugName: "result" }] : []);
    this.isDragging = signal(false, ...ngDevMode ? [{ debugName: "isDragging" }] : []);
    this.showFeedback = signal(false, ...ngDevMode ? [{ debugName: "showFeedback" }] : []);
    this.feedbackSubmitted = signal(false, ...ngDevMode ? [{ debugName: "feedbackSubmitted" }] : []);
    this.error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
    this.suggestedCorrection = computed(() => this.result()?.status === "Normal" ? "An\xF4malo" : "Normal", ...ngDevMode ? [{ debugName: "suggestedCorrection" }] : []);
  }
  triggerFileInput() {
    this.fileInputRef.nativeElement.click();
  }
  triggerChangeInput() {
    this.changeInputRef.nativeElement.click();
  }
  onFileSelected(event) {
    const file = event.target.files?.[0];
    if (file)
      this.loadImage(file);
  }
  onDragOver(event) {
    event.preventDefault();
    this.isDragging.set(true);
  }
  onDragLeave() {
    this.isDragging.set(false);
  }
  onDrop(event) {
    event.preventDefault();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith("image/"))
      this.loadImage(file);
  }
  loadImage(file) {
    this.selectedFile.set(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      this.selectedImage.set(reader.result);
      this.result.set(null);
      this.error.set(null);
      this.feedbackSubmitted.set(false);
      this.showFeedback.set(false);
    };
    reader.readAsDataURL(file);
  }
  analyze() {
    const file = this.selectedFile();
    if (!file)
      return;
    this.isAnalyzing.set(true);
    this.result.set(null);
    this.error.set(null);
    this.analysisService.analisarTriagem(file).subscribe({
      next: (result) => {
        this.isAnalyzing.set(false);
        this.result.set(result);
      },
      error: () => {
        this.isAnalyzing.set(false);
        this.error.set("Erro ao contactar o servidor. Verifique se o backend e o modelo IA est\xE3o activos.");
      }
    });
  }
  reset() {
    this.selectedImage.set(null);
    this.selectedFile.set(null);
    this.result.set(null);
    this.error.set(null);
    this.isAnalyzing.set(false);
    this.showFeedback.set(false);
    this.feedbackSubmitted.set(false);
  }
  toggleFeedback() {
    this.showFeedback.update((v) => !v);
  }
  confirmFeedback() {
    const res = this.result();
    if (!res)
      return;
    this.analysisService.enviarFeedbackTriagem(res.id, res.status, this.suggestedCorrection()).subscribe();
    this.feedbackSubmitted.set(true);
    this.showFeedback.set(false);
  }
  dismissFeedback() {
    this.showFeedback.set(false);
  }
};
_TriagemComponent.\u0275fac = function TriagemComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TriagemComponent)(\u0275\u0275directiveInject(AnalysisService));
};
_TriagemComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TriagemComponent, selectors: [["app-triagem"]], viewQuery: function TriagemComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c06, 5);
    \u0275\u0275viewQuery(_c15, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInputRef = _t.first);
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.changeInputRef = _t.first);
  }
}, decls: 28, vars: 5, consts: [["fileInput", ""], ["changeInput", ""], [1, "tab-content"], [1, "panel-grid"], [1, "panel", "image-panel"], [1, "panel-header"], [1, "panel-icon"], [1, "panel-body"], [1, "upload-zone", 3, "dragging"], [1, "panel", "results-panel"], [1, "loading-state"], [1, "result-container"], [1, "error-state"], [1, "empty-state"], [1, "upload-zone", 3, "click", "dragover", "dragleave", "drop"], ["type", "file", "accept", "image/png,image/jpeg,image/jpg", 1, "hidden-input", 3, "change"], [1, "upload-icon-wrap"], [1, "upload-title"], [1, "upload-sub"], [1, "link"], [1, "upload-formats"], [1, "sep"], [1, "image-frame"], [1, "image-wrapper"], ["alt", "Raio-X", 1, "xray-image", 3, "src"], [1, "image-actions"], ["mat-stroked-button", "", 1, "btn-secondary", 3, "click", "disabled"], ["mat-flat-button", "", 1, "btn-analyze"], ["mat-stroked-button", "", 1, "btn-reset"], [1, "scan-beam"], [1, "scan-overlay"], [1, "scan-label"], ["mat-flat-button", "", 1, "btn-analyze", 3, "click"], ["mat-stroked-button", "", 1, "btn-reset", 3, "click"], [1, "pulse-container"], [1, "pulse-ring", "ring-1"], [1, "pulse-ring", "ring-2"], [1, "loading-icon"], [1, "loading-title"], [1, "loading-sub"], ["mode", "indeterminate"], [1, "status-badge"], [1, "status-icon"], [1, "status-text"], [1, "status-label"], [1, "status-desc"], [1, "confidence-pill"], [1, "detail-grid"], [1, "detail-item"], [1, "detail-label"], [1, "detail-value", "accent"], [1, "detail-value"], [1, "recommendation"], [1, "feedback-section"], [1, "feedback-success"], [1, "feedback-trigger", 3, "click"], [1, "chevron"], [1, "feedback-panel"], [1, "feedback-question"], [1, "correction-label"], [1, "feedback-confirm-actions"], ["mat-flat-button", "", 1, "btn-confirm-yes", 3, "click"], ["mat-stroked-button", "", 1, "btn-confirm-no", 3, "click"], [1, "error-icon"], [1, "error-title"], [1, "error-msg"], [1, "empty-icon-wrap"], [1, "empty-title"], [1, "empty-sub"]], template: function TriagemComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "mat-icon", 6);
    \u0275\u0275text(5, "image_search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h2");
    \u0275\u0275text(8, "Imagem de Raio-X");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "Carregue uma imagem para triagem");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 7);
    \u0275\u0275conditionalCreate(12, TriagemComponent_Conditional_12_Template, 23, 2, "div", 8)(13, TriagemComponent_Conditional_13_Template, 13, 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 9)(15, "div", 5)(16, "mat-icon", 6);
    \u0275\u0275text(17, "assignment_turned_in");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div")(19, "h2");
    \u0275\u0275text(20, "Resultado da Triagem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p");
    \u0275\u0275text(22, "Classifica\xE7\xE3o preliminar da imagem");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 7);
    \u0275\u0275conditionalCreate(24, TriagemComponent_Conditional_24_Template, 11, 1, "div", 10);
    \u0275\u0275conditionalCreate(25, TriagemComponent_Conditional_25_Template, 49, 20, "div", 11);
    \u0275\u0275conditionalCreate(26, TriagemComponent_Conditional_26_Template, 7, 2, "div", 12);
    \u0275\u0275conditionalCreate(27, TriagemComponent_Conditional_27_Template, 12, 0, "div", 13);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(12);
    \u0275\u0275conditional(!ctx.selectedImage() ? 12 : 13);
    \u0275\u0275advance(12);
    \u0275\u0275conditional(ctx.isAnalyzing() ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.result() && !ctx.isAnalyzing() ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() && !ctx.isAnalyzing() ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.result() && !ctx.isAnalyzing() && !ctx.error() ? 27 : -1);
  }
}, dependencies: [MatProgressBarModule, MatProgressBar, MatButtonModule, MatButton, MatIconModule, MatIcon, DatePipe], styles: ['@charset "UTF-8";\n\n\n\n.tab-content[_ngcontent-%COMP%] {\n  padding: 28px 32px;\n  max-width: 1280px;\n  margin: 0 auto;\n  min-height: calc(100vh - 120px);\n}\n.panel-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  align-items: start;\n}\n.panel[_ngcontent-%COMP%] {\n  background: var(--bg-surface);\n  border-radius: 14px;\n  border: 1px solid var(--border);\n  overflow: hidden;\n  transition: border-color 0.2s;\n}\n.panel[_ngcontent-%COMP%]:hover {\n  border-color: var(--border-bright);\n}\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px 22px;\n  background: var(--bg-elevated);\n  border-bottom: 1px solid var(--border);\n  position: relative;\n}\n.panel-header[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--cyan) 0%,\n      transparent 70%);\n}\n.panel-header[_ngcontent-%COMP%]   .panel-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  width: 22px;\n  height: 22px;\n  color: var(--cyan);\n}\n.panel-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1.2;\n}\n.panel-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  color: var(--text-secondary);\n  margin-top: 3px;\n  letter-spacing: 0.3px;\n}\n.panel-body[_ngcontent-%COMP%] {\n  padding: 22px;\n  min-height: 420px;\n  display: flex;\n  flex-direction: column;\n}\n.upload-zone[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  border: 1.5px dashed rgba(0, 212, 239, 0.25);\n  border-radius: 12px;\n  padding: 48px 24px;\n  cursor: pointer;\n  transition: all 0.25s ease;\n  background: var(--bg-overlay);\n  height: 300px;\n  max-height: 300px;\n  position: relative;\n}\n.upload-zone[_ngcontent-%COMP%]::before, \n.upload-zone[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  border-color: var(--cyan-dim);\n  border-style: solid;\n  opacity: 0.4;\n  transition: opacity 0.25s;\n}\n.upload-zone[_ngcontent-%COMP%]::before {\n  top: 10px;\n  left: 10px;\n  border-width: 1.5px 0 0 1.5px;\n}\n.upload-zone[_ngcontent-%COMP%]::after {\n  bottom: 10px;\n  right: 10px;\n  border-width: 0 1.5px 1.5px 0;\n}\n.upload-zone[_ngcontent-%COMP%]:hover, \n.upload-zone.dragging[_ngcontent-%COMP%] {\n  border-color: var(--cyan);\n  background: var(--cyan-glow);\n  box-shadow: 0 0 24px var(--cyan-glow-md), inset 0 0 24px var(--cyan-glow);\n}\n.upload-zone[_ngcontent-%COMP%]:hover::before, \n.upload-zone[_ngcontent-%COMP%]:hover::after, \n.upload-zone.dragging[_ngcontent-%COMP%]::before, \n.upload-zone.dragging[_ngcontent-%COMP%]::after {\n  opacity: 1;\n}\n.upload-zone[_ngcontent-%COMP%]:hover   .upload-icon-wrap[_ngcontent-%COMP%], \n.upload-zone.dragging[_ngcontent-%COMP%]   .upload-icon-wrap[_ngcontent-%COMP%] {\n  background: var(--cyan-glow-md);\n  border-color: rgba(0, 212, 239, 0.4);\n  transform: scale(1.06);\n}\n.upload-zone[_ngcontent-%COMP%]:hover   .upload-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.upload-zone.dragging[_ngcontent-%COMP%]   .upload-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.upload-zone[_ngcontent-%COMP%]:hover   .upload-title[_ngcontent-%COMP%], \n.upload-zone.dragging[_ngcontent-%COMP%]   .upload-title[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.upload-icon-wrap[_ngcontent-%COMP%] {\n  width: 68px;\n  height: 68px;\n  background: var(--bg-elevated);\n  border: 1px solid var(--border-bright);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.25s ease;\n}\n.upload-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 30px;\n  width: 30px;\n  height: 30px;\n  color: var(--text-secondary);\n  transition: color 0.25s;\n}\n.upload-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--text-secondary);\n  transition: color 0.25s;\n}\n.upload-sub[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--text-muted);\n}\n.upload-sub[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%] {\n  color: var(--cyan);\n  font-weight: 500;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n.upload-formats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 4px;\n}\n.upload-formats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.65rem;\n  background: var(--bg-elevated);\n  border: 1px solid var(--border-bright);\n  border-radius: 4px;\n  padding: 2px 7px;\n  color: var(--text-muted);\n  font-weight: 500;\n}\n.upload-formats[_ngcontent-%COMP%]   .sep[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--text-muted);\n}\n.image-frame[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #000;\n  max-height: 300px;\n  flex-shrink: 0;\n  box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.05), inset 0 0 8px rgba(255, 255, 255, 0.08);\n}\n.image-wrapper[_ngcontent-%COMP%] {\n  overflow-x: hidden;\n  overflow-y: auto;\n  max-height: 300px;\n}\n.image-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 4px;\n}\n.image-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #0a0a0a;\n}\n.image-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #222;\n  border-radius: 3px;\n}\n.xray-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n  display: block;\n  filter: contrast(1.05) brightness(0.98);\n}\n@keyframes _ngcontent-%COMP%_scanBeam {\n  0% {\n    top: 0;\n  }\n  50% {\n    top: calc(100% - 3px);\n  }\n  100% {\n    top: 0;\n  }\n}\n.scan-beam[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--cyan),\n      #7ffcff,\n      var(--cyan),\n      transparent);\n  box-shadow:\n    0 0 18px var(--cyan-glow-str),\n    0 0 6px rgba(127, 252, 255, 0.8),\n    0 0 40px var(--cyan-glow-md);\n  animation: _ngcontent-%COMP%_scanBeam 1.8s linear infinite;\n}\n.scan-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 10px;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(0, 0, 0, 0.65),\n      transparent);\n}\n.scan-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(0, 212, 239, 0.85);\n  color: #000;\n  font-family: var(--font-mono);\n  font-size: 0.7rem;\n  font-weight: 600;\n  padding: 4px 12px;\n  border-radius: 20px;\n  letter-spacing: 0.5px;\n}\n.scan-label[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n  width: 13px;\n  height: 13px;\n  animation: _ngcontent-%COMP%_spin 2s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.image-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 14px;\n  flex-wrap: wrap;\n}\n.image-actions[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 130px;\n  color: var(--text-secondary) !important;\n  border-color: var(--border-bright) !important;\n  background: var(--bg-elevated) !important;\n}\n.image-actions[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover:not([disabled]) {\n  border-color: var(--cyan) !important;\n  color: var(--cyan) !important;\n  background: var(--cyan-glow) !important;\n}\n.image-actions[_ngcontent-%COMP%]   .btn-analyze[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 150px;\n  background: var(--cyan) !important;\n  color: #06091A !important;\n  font-weight: 700 !important;\n  letter-spacing: 0.3px;\n  box-shadow: 0 0 18px var(--cyan-glow-md);\n  transition: box-shadow 0.2s !important;\n}\n.image-actions[_ngcontent-%COMP%]   .btn-analyze[_ngcontent-%COMP%]:hover {\n  background: #00bcd4 !important;\n  box-shadow: 0 0 28px var(--cyan-glow-str) !important;\n}\n.image-actions[_ngcontent-%COMP%]   .btn-reset[_ngcontent-%COMP%] {\n  flex: 1;\n  color: var(--text-secondary) !important;\n  border-color: var(--border-bright) !important;\n  background: var(--bg-elevated) !important;\n}\n.image-actions[_ngcontent-%COMP%]   .btn-reset[_ngcontent-%COMP%]:hover {\n  border-color: var(--border-bright) !important;\n  background: var(--bg-overlay) !important;\n}\n.loading-state[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  text-align: center;\n  padding: 24px;\n}\n.loading-state[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 260px;\n  border-radius: 4px;\n  --mdc-linear-progress-active-indicator-color: var(--cyan);\n  --mdc-linear-progress-track-color: var(--bg-overlay);\n}\n.pulse-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.pulse-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  border: 1.5px solid var(--cyan);\n  animation: _ngcontent-%COMP%_pulseRing 2s ease-out infinite;\n}\n.pulse-ring.ring-1[_ngcontent-%COMP%] {\n  width: 78px;\n  height: 78px;\n  animation-delay: 0s;\n}\n.pulse-ring.ring-2[_ngcontent-%COMP%] {\n  width: 58px;\n  height: 58px;\n  animation-delay: 0.55s;\n}\n@keyframes _ngcontent-%COMP%_pulseRing {\n  0% {\n    transform: scale(0.5);\n    opacity: 0.8;\n  }\n  100% {\n    transform: scale(1.2);\n    opacity: 0;\n  }\n}\n.loading-icon[_ngcontent-%COMP%] {\n  font-size: 34px;\n  width: 34px;\n  height: 34px;\n  color: var(--cyan);\n  animation: _ngcontent-%COMP%_spin 3s linear infinite;\n  position: relative;\n  z-index: 1;\n  filter: drop-shadow(0 0 6px var(--cyan));\n}\n.loading-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.loading-sub[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  margin-top: -8px;\n  letter-spacing: 0.3px;\n}\n.result-container[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px 20px;\n  border-radius: 12px;\n  border: 1px solid;\n  position: relative;\n  overflow: hidden;\n}\n.status-badge.status-normal[_ngcontent-%COMP%] {\n  background: var(--green-bg);\n  border-color: var(--green-border);\n  box-shadow: 0 0 20px rgba(0, 229, 160, 0.08);\n}\n.status-badge.status-normal[_ngcontent-%COMP%]   .status-icon[_ngcontent-%COMP%] {\n  color: var(--green);\n  filter: drop-shadow(0 0 4px var(--green));\n}\n.status-badge.status-normal[_ngcontent-%COMP%]   .status-label[_ngcontent-%COMP%] {\n  color: var(--green);\n}\n.status-badge.status-normal[_ngcontent-%COMP%]   .confidence-pill[_ngcontent-%COMP%] {\n  background: var(--green-bg);\n  border: 1px solid var(--green-border);\n  color: var(--green);\n  font-family: var(--font-mono);\n}\n.status-badge.status-anomalo[_ngcontent-%COMP%] {\n  background: var(--red-bg);\n  border-color: var(--red-border);\n  box-shadow: 0 0 20px rgba(255, 70, 85, 0.08);\n}\n.status-badge.status-anomalo[_ngcontent-%COMP%]   .status-icon[_ngcontent-%COMP%] {\n  color: var(--red);\n  filter: drop-shadow(0 0 4px var(--red));\n}\n.status-badge.status-anomalo[_ngcontent-%COMP%]   .status-label[_ngcontent-%COMP%] {\n  color: var(--red);\n}\n.status-badge.status-anomalo[_ngcontent-%COMP%]   .confidence-pill[_ngcontent-%COMP%] {\n  background: var(--red-bg);\n  border: 1px solid var(--red-border);\n  color: var(--red);\n  font-family: var(--font-mono);\n}\n.status-icon[_ngcontent-%COMP%] {\n  font-size: 34px;\n  width: 34px;\n  height: 34px;\n}\n.status-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.status-text[_ngcontent-%COMP%]   .status-label[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--font-display);\n  font-size: 1.5rem;\n  font-weight: 800;\n  line-height: 1;\n  letter-spacing: -0.5px;\n}\n.status-text[_ngcontent-%COMP%]   .status-desc[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.72rem;\n  color: var(--text-secondary);\n  margin-top: 5px;\n  letter-spacing: 0.3px;\n}\n.confidence-pill[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 20px;\n}\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px 14px;\n  background: var(--bg-overlay);\n  border-radius: 10px;\n  border: 1px solid var(--border);\n}\n.detail-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--text-muted);\n  margin-top: 3px;\n  flex-shrink: 0;\n}\n.detail-item[_ngcontent-%COMP%]   .detail-label[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.62rem;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  font-weight: 600;\n}\n.detail-item[_ngcontent-%COMP%]   .detail-value[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-top: 3px;\n}\n.detail-item[_ngcontent-%COMP%]   .detail-value.accent[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.recommendation[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  background: var(--amber-bg);\n  border: 1px solid var(--amber-border);\n  border-radius: 10px;\n  font-size: 0.8rem;\n  color: #D4A017;\n}\n.recommendation[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--amber);\n  flex-shrink: 0;\n}\n.recommendation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  line-height: 1.5;\n  color: var(--text-secondary);\n}\n.recommendation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--cyan);\n  font-weight: 600;\n}\n.feedback-section[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--border);\n  padding-top: 14px;\n  margin-top: 4px;\n}\n.feedback-trigger[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 11px 16px;\n  background: var(--bg-overlay);\n  border: 1px dashed var(--border-bright);\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 0.82rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  transition: all 0.2s ease;\n  text-align: left;\n}\n.feedback-trigger[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--text-muted);\n  transition: color 0.2s;\n}\n.feedback-trigger[_ngcontent-%COMP%]   .chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  transition: transform 0.2s;\n  color: var(--text-muted);\n}\n.feedback-trigger[_ngcontent-%COMP%]:hover, \n.feedback-trigger.active[_ngcontent-%COMP%] {\n  border-color: var(--cyan-dim);\n  background: var(--cyan-glow);\n  color: var(--cyan);\n}\n.feedback-trigger[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%], \n.feedback-trigger.active[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.feedback-trigger[_ngcontent-%COMP%]:hover   .chevron[_ngcontent-%COMP%], \n.feedback-trigger.active[_ngcontent-%COMP%]   .chevron[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.feedback-panel[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding: 16px;\n  background: var(--bg-overlay);\n  border-radius: 10px;\n  border: 1px solid var(--border-bright);\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.feedback-question[_ngcontent-%COMP%] {\n  font-size: 0.87rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px;\n  line-height: 1.5;\n}\n.correction-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-weight: 700;\n  font-size: 0.9rem;\n  padding: 2px 10px 2px 6px;\n  border-radius: 20px;\n  vertical-align: middle;\n}\n.correction-label[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.correction-label.label-normal[_ngcontent-%COMP%] {\n  color: var(--green);\n  background: var(--green-bg);\n  border: 1px solid var(--green-border);\n}\n.correction-label.label-normal[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--green);\n}\n.correction-label.label-anomalo[_ngcontent-%COMP%] {\n  color: var(--red);\n  background: var(--red-bg);\n  border: 1px solid var(--red-border);\n}\n.correction-label.label-anomalo[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--red);\n}\n.feedback-confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.feedback-confirm-actions[_ngcontent-%COMP%]   .btn-confirm-yes[_ngcontent-%COMP%] {\n  flex: 1;\n  background: var(--cyan) !important;\n  color: #06091A !important;\n  font-weight: 700 !important;\n  font-size: 0.82rem !important;\n  box-shadow: 0 0 14px var(--cyan-glow-md);\n}\n.feedback-confirm-actions[_ngcontent-%COMP%]   .btn-confirm-no[_ngcontent-%COMP%] {\n  color: var(--text-secondary) !important;\n  border-color: var(--border-bright) !important;\n  background: var(--bg-elevated) !important;\n  font-size: 0.82rem !important;\n}\n.feedback-confirm-actions[_ngcontent-%COMP%]   .btn-confirm-no[_ngcontent-%COMP%]:hover {\n  border-color: var(--red-border) !important;\n  color: var(--red) !important;\n  background: var(--red-bg) !important;\n}\n.feedback-success[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 16px;\n  background: var(--green-bg);\n  border: 1px solid var(--green-border);\n  border-radius: 10px;\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--green);\n  margin-top: 4px;\n}\n.feedback-success[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: var(--green);\n  filter: drop-shadow(0 0 4px var(--green));\n}\n.empty-state[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 14px;\n  text-align: center;\n  padding: 48px 24px;\n}\n.empty-icon-wrap[_ngcontent-%COMP%] {\n  width: 78px;\n  height: 78px;\n  background: var(--bg-overlay);\n  border: 1px solid var(--border-bright);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.empty-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 34px;\n  width: 34px;\n  height: 34px;\n  color: var(--text-muted);\n}\n.empty-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.empty-sub[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  line-height: 1.7;\n}\n.empty-sub[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--cyan);\n  font-weight: 600;\n}\n.error-state[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  text-align: center;\n  padding: 48px 24px;\n}\n.error-state[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%] {\n  font-size: 42px;\n  width: 42px;\n  height: 42px;\n  color: var(--red);\n  opacity: 0.7;\n}\n.error-state[_ngcontent-%COMP%]   .error-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--red);\n}\n.error-state[_ngcontent-%COMP%]   .error-msg[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  line-height: 1.6;\n  max-width: 300px;\n}\n@media (max-width: 900px) {\n  .tab-content[_ngcontent-%COMP%] {\n    padding: 20px 16px;\n  }\n  .panel-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=triagem.component.css.map */'], data: { animation: [
  trigger("fadeSlideIn", [
    transition(":enter", [
      style({ opacity: 0, transform: "translateY(16px)" }),
      animate("380ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
    ])
  ]),
  trigger("slideDown", [
    transition(":enter", [
      style({ opacity: 0, transform: "translateY(-10px)" }),
      animate("250ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
    ]),
    transition(":leave", [
      animate("180ms ease-in", style({ opacity: 0, transform: "translateY(-10px)" }))
    ])
  ])
] } });
var TriagemComponent = _TriagemComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TriagemComponent, [{
    type: Component,
    args: [{ selector: "app-triagem", standalone: true, imports: [DatePipe, MatProgressBarModule, MatButtonModule, MatIconModule], animations: [
      trigger("fadeSlideIn", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(16px)" }),
          animate("380ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
        ])
      ]),
      trigger("slideDown", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(-10px)" }),
          animate("250ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
        ]),
        transition(":leave", [
          animate("180ms ease-in", style({ opacity: 0, transform: "translateY(-10px)" }))
        ])
      ])
    ], template: `<div class="tab-content">
  <div class="panel-grid">

    <!-- \u2500\u2500 Left: Image Panel \u2500\u2500 -->
    <div class="panel image-panel">
      <div class="panel-header">
        <mat-icon class="panel-icon">image_search</mat-icon>
        <div>
          <h2>Imagem de Raio-X</h2>
          <p>Carregue uma imagem para triagem</p>
        </div>
      </div>

      <div class="panel-body">

        @if (!selectedImage()) {
          <!-- Upload Zone -->
          <div
            class="upload-zone"
            [class.dragging]="isDragging()"
            (click)="triggerFileInput()"
            (dragover)="onDragOver($event)"
            (dragleave)="onDragLeave()"
            (drop)="onDrop($event)"
          >
            <input
              type="file"
              #fileInput
              accept="image/png,image/jpeg,image/jpg"
              class="hidden-input"
              (change)="onFileSelected($event)"
            />
            <div class="upload-icon-wrap">
              <mat-icon>cloud_upload</mat-icon>
            </div>
            <p class="upload-title">Arraste a imagem aqui</p>
            <p class="upload-sub">ou <span class="link">clique para selecionar</span></p>
            <div class="upload-formats">
              <span>PNG</span><span>JPG</span><span>JPEG</span>
              <span class="sep">\xB7</span>
              <span>M\xE1x. 10 MB</span>
            </div>
          </div>
        } @else {
          <!-- Image Preview -->
          <div class="image-frame">
            <div class="image-wrapper">
              <img [src]="selectedImage()" alt="Raio-X" class="xray-image" />
            </div>
            @if (isAnalyzing()) {
              <div class="scan-beam"></div>
              <div class="scan-overlay">
                <div class="scan-label">
                  <mat-icon>radar</mat-icon>
                  A processar...
                </div>
              </div>
            }
          </div>

          <div class="image-actions">
            <button
              mat-stroked-button
              class="btn-secondary"
              (click)="triggerChangeInput()"
              [disabled]="isAnalyzing()"
            >
              <mat-icon>swap_horiz</mat-icon>
              Alterar Imagem
            </button>
            <input
              type="file"
              #changeInput
              accept="image/png,image/jpeg,image/jpg"
              class="hidden-input"
              (change)="onFileSelected($event)"
            />

            @if (!isAnalyzing() && !result()) {
              <button mat-flat-button class="btn-analyze" (click)="analyze()">
                <mat-icon>analytics</mat-icon>
                Analisar Triagem
              </button>
            }

            @if (result() || error()) {
              <button mat-stroked-button class="btn-reset" (click)="reset()">
                <mat-icon>refresh</mat-icon>
                Nova An\xE1lise
              </button>
            }
          </div>
        }

      </div>
    </div>

    <!-- \u2500\u2500 Right: Results Panel \u2500\u2500 -->
    <div class="panel results-panel">
      <div class="panel-header">
        <mat-icon class="panel-icon">assignment_turned_in</mat-icon>
        <div>
          <h2>Resultado da Triagem</h2>
          <p>Classifica\xE7\xE3o preliminar da imagem</p>
        </div>
      </div>

      <div class="panel-body">

        <!-- Loading -->
        @if (isAnalyzing()) {
          <div class="loading-state" @fadeSlideIn>
            <div class="pulse-container">
              <div class="pulse-ring ring-1"></div>
              <div class="pulse-ring ring-2"></div>
              <mat-icon class="loading-icon">radar</mat-icon>
            </div>
            <p class="loading-title">A analisar a imagem</p>
            <p class="loading-sub">Processando padr\xF5es e caracter\xEDsticas...</p>
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
          </div>
        }

        <!-- Result -->
        @if (result() && !isAnalyzing()) {
          <div class="result-container" @fadeSlideIn>

            <!-- Status Badge -->
            <div
              class="status-badge"
              [class.status-normal]="result()!.status === 'Normal'"
              [class.status-anomalo]="result()!.status === 'An\xF4malo'"
            >
              <mat-icon class="status-icon">
                {{ result()!.status === 'Normal' ? 'check_circle' : 'error' }}
              </mat-icon>
              <div class="status-text">
                <span class="status-label">{{ result()!.status }}</span>
                <span class="status-desc">
                  {{ result()!.status === 'Normal' ? 'Sem anomalias detectadas' : 'Anomalia identificada' }}
                </span>
              </div>
              <div class="confidence-pill">{{ result()!.confidence }}%</div>
            </div>

            <!-- Detail Table -->
            <div class="detail-grid">
              <div class="detail-item">
                <mat-icon>speed</mat-icon>
                <div>
                  <span class="detail-label">Confian\xE7a</span>
                  <span class="detail-value accent">{{ result()!.confidence }}%</span>
                </div>
              </div>
              <div class="detail-item">
                <mat-icon>calendar_today</mat-icon>
                <div>
                  <span class="detail-label">Data</span>
                  <span class="detail-value">{{ result()!.timestamp | date:'dd/MM/yyyy' }}</span>
                </div>
              </div>
              <div class="detail-item">
                <mat-icon>schedule</mat-icon>
                <div>
                  <span class="detail-label">Hora</span>
                  <span class="detail-value">{{ result()!.timestamp | date:'HH:mm:ss' }}</span>
                </div>
              </div>
              <div class="detail-item">
                <mat-icon>medical_services</mat-icon>
                <div>
                  <span class="detail-label">Tipo</span>
                  <span class="detail-value">Triagem Inicial</span>
                </div>
              </div>
            </div>

            @if (result()!.status === 'An\xF4malo') {
              <div class="recommendation">
                <mat-icon>arrow_forward</mat-icon>
                <p>Recomenda-se prosseguir para an\xE1lise detalhada no separador <strong>Diagn\xF3stico</strong>.</p>
              </div>
            }

            <!-- Feedback -->
            @if (!feedbackSubmitted()) {
              <div class="feedback-section">
                <button
                  class="feedback-trigger"
                  [class.active]="showFeedback()"
                  (click)="toggleFeedback()"
                >
                  <mat-icon>feedback</mat-icon>
                  <span>Acha que a previs\xE3o est\xE1 errada?</span>
                  <mat-icon class="chevron">{{ showFeedback() ? 'expand_less' : 'expand_more' }}</mat-icon>
                </button>

                @if (showFeedback()) {
                  <div class="feedback-panel" @slideDown>
                    <p class="feedback-question">
                      Considera o resultado
                      <span
                        class="correction-label"
                        [class.label-normal]="suggestedCorrection() === 'Normal'"
                        [class.label-anomalo]="suggestedCorrection() === 'An\xF4malo'"
                      >
                        <mat-icon>{{ suggestedCorrection() === 'Normal' ? 'check_circle' : 'error' }}</mat-icon>
                        {{ suggestedCorrection() }}
                      </span>
                      ?
                    </p>
                    <div class="feedback-confirm-actions">
                      <button mat-flat-button class="btn-confirm-yes" (click)="confirmFeedback()">
                        <mat-icon>thumb_up</mat-icon>
                        Sim, enviar feedback
                      </button>
                      <button mat-stroked-button class="btn-confirm-no" (click)="dismissFeedback()">
                        <mat-icon>close</mat-icon>
                        N\xE3o
                      </button>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <div class="feedback-success" @fadeSlideIn>
                <mat-icon>verified</mat-icon>
                <span>Obrigado pelo seu feedback m\xE9dico!</span>
              </div>
            }

          </div>
        }

        <!-- Error State -->
        @if (error() && !isAnalyzing()) {
          <div class="error-state" @fadeSlideIn>
            <mat-icon class="error-icon">cloud_off</mat-icon>
            <p class="error-title">Erro na an\xE1lise</p>
            <p class="error-msg">{{ error() }}</p>
          </div>
        }

        <!-- Empty State -->
        @if (!result() && !isAnalyzing() && !error()) {
          <div class="empty-state">
            <div class="empty-icon-wrap">
              <mat-icon>medical_information</mat-icon>
            </div>
            <p class="empty-title">Aguardando imagem</p>
            <p class="empty-sub">
              Carregue uma imagem de raio-X e clique em<br />
              <strong>"Analisar Triagem"</strong> para obter o resultado.
            </p>
          </div>
        }

      </div>
    </div>

  </div>
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/triagem/triagem.component.scss */\n.tab-content {\n  padding: 28px 32px;\n  max-width: 1280px;\n  margin: 0 auto;\n  min-height: calc(100vh - 120px);\n}\n.panel-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  align-items: start;\n}\n.panel {\n  background: var(--bg-surface);\n  border-radius: 14px;\n  border: 1px solid var(--border);\n  overflow: hidden;\n  transition: border-color 0.2s;\n}\n.panel:hover {\n  border-color: var(--border-bright);\n}\n.panel-header {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px 22px;\n  background: var(--bg-elevated);\n  border-bottom: 1px solid var(--border);\n  position: relative;\n}\n.panel-header::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--cyan) 0%,\n      transparent 70%);\n}\n.panel-header .panel-icon {\n  font-size: 22px;\n  width: 22px;\n  height: 22px;\n  color: var(--cyan);\n}\n.panel-header h2 {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1.2;\n}\n.panel-header p {\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  color: var(--text-secondary);\n  margin-top: 3px;\n  letter-spacing: 0.3px;\n}\n.panel-body {\n  padding: 22px;\n  min-height: 420px;\n  display: flex;\n  flex-direction: column;\n}\n.upload-zone {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  border: 1.5px dashed rgba(0, 212, 239, 0.25);\n  border-radius: 12px;\n  padding: 48px 24px;\n  cursor: pointer;\n  transition: all 0.25s ease;\n  background: var(--bg-overlay);\n  height: 300px;\n  max-height: 300px;\n  position: relative;\n}\n.upload-zone::before,\n.upload-zone::after {\n  content: "";\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  border-color: var(--cyan-dim);\n  border-style: solid;\n  opacity: 0.4;\n  transition: opacity 0.25s;\n}\n.upload-zone::before {\n  top: 10px;\n  left: 10px;\n  border-width: 1.5px 0 0 1.5px;\n}\n.upload-zone::after {\n  bottom: 10px;\n  right: 10px;\n  border-width: 0 1.5px 1.5px 0;\n}\n.upload-zone:hover,\n.upload-zone.dragging {\n  border-color: var(--cyan);\n  background: var(--cyan-glow);\n  box-shadow: 0 0 24px var(--cyan-glow-md), inset 0 0 24px var(--cyan-glow);\n}\n.upload-zone:hover::before,\n.upload-zone:hover::after,\n.upload-zone.dragging::before,\n.upload-zone.dragging::after {\n  opacity: 1;\n}\n.upload-zone:hover .upload-icon-wrap,\n.upload-zone.dragging .upload-icon-wrap {\n  background: var(--cyan-glow-md);\n  border-color: rgba(0, 212, 239, 0.4);\n  transform: scale(1.06);\n}\n.upload-zone:hover .upload-icon-wrap mat-icon,\n.upload-zone.dragging .upload-icon-wrap mat-icon {\n  color: var(--cyan);\n}\n.upload-zone:hover .upload-title,\n.upload-zone.dragging .upload-title {\n  color: var(--cyan);\n}\n.upload-icon-wrap {\n  width: 68px;\n  height: 68px;\n  background: var(--bg-elevated);\n  border: 1px solid var(--border-bright);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.25s ease;\n}\n.upload-icon-wrap mat-icon {\n  font-size: 30px;\n  width: 30px;\n  height: 30px;\n  color: var(--text-secondary);\n  transition: color 0.25s;\n}\n.upload-title {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--text-secondary);\n  transition: color 0.25s;\n}\n.upload-sub {\n  font-size: 0.82rem;\n  color: var(--text-muted);\n}\n.upload-sub .link {\n  color: var(--cyan);\n  font-weight: 500;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n.upload-formats {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 4px;\n}\n.upload-formats span {\n  font-family: var(--font-mono);\n  font-size: 0.65rem;\n  background: var(--bg-elevated);\n  border: 1px solid var(--border-bright);\n  border-radius: 4px;\n  padding: 2px 7px;\n  color: var(--text-muted);\n  font-weight: 500;\n}\n.upload-formats .sep {\n  background: none;\n  border: none;\n  color: var(--text-muted);\n}\n.image-frame {\n  position: relative;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #000;\n  max-height: 300px;\n  flex-shrink: 0;\n  box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.05), inset 0 0 8px rgba(255, 255, 255, 0.08);\n}\n.image-wrapper {\n  overflow-x: hidden;\n  overflow-y: auto;\n  max-height: 300px;\n}\n.image-wrapper::-webkit-scrollbar {\n  width: 4px;\n}\n.image-wrapper::-webkit-scrollbar-track {\n  background: #0a0a0a;\n}\n.image-wrapper::-webkit-scrollbar-thumb {\n  background: #222;\n  border-radius: 3px;\n}\n.xray-image {\n  width: 100%;\n  height: auto;\n  display: block;\n  filter: contrast(1.05) brightness(0.98);\n}\n@keyframes scanBeam {\n  0% {\n    top: 0;\n  }\n  50% {\n    top: calc(100% - 3px);\n  }\n  100% {\n    top: 0;\n  }\n}\n.scan-beam {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--cyan),\n      #7ffcff,\n      var(--cyan),\n      transparent);\n  box-shadow:\n    0 0 18px var(--cyan-glow-str),\n    0 0 6px rgba(127, 252, 255, 0.8),\n    0 0 40px var(--cyan-glow-md);\n  animation: scanBeam 1.8s linear infinite;\n}\n.scan-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 10px;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(0, 0, 0, 0.65),\n      transparent);\n}\n.scan-label {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(0, 212, 239, 0.85);\n  color: #000;\n  font-family: var(--font-mono);\n  font-size: 0.7rem;\n  font-weight: 600;\n  padding: 4px 12px;\n  border-radius: 20px;\n  letter-spacing: 0.5px;\n}\n.scan-label mat-icon {\n  font-size: 13px;\n  width: 13px;\n  height: 13px;\n  animation: spin 2s linear infinite;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.image-actions {\n  display: flex;\n  gap: 10px;\n  margin-top: 14px;\n  flex-wrap: wrap;\n}\n.image-actions .btn-secondary {\n  flex: 1;\n  min-width: 130px;\n  color: var(--text-secondary) !important;\n  border-color: var(--border-bright) !important;\n  background: var(--bg-elevated) !important;\n}\n.image-actions .btn-secondary:hover:not([disabled]) {\n  border-color: var(--cyan) !important;\n  color: var(--cyan) !important;\n  background: var(--cyan-glow) !important;\n}\n.image-actions .btn-analyze {\n  flex: 1;\n  min-width: 150px;\n  background: var(--cyan) !important;\n  color: #06091A !important;\n  font-weight: 700 !important;\n  letter-spacing: 0.3px;\n  box-shadow: 0 0 18px var(--cyan-glow-md);\n  transition: box-shadow 0.2s !important;\n}\n.image-actions .btn-analyze:hover {\n  background: #00bcd4 !important;\n  box-shadow: 0 0 28px var(--cyan-glow-str) !important;\n}\n.image-actions .btn-reset {\n  flex: 1;\n  color: var(--text-secondary) !important;\n  border-color: var(--border-bright) !important;\n  background: var(--bg-elevated) !important;\n}\n.image-actions .btn-reset:hover {\n  border-color: var(--border-bright) !important;\n  background: var(--bg-overlay) !important;\n}\n.loading-state {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  text-align: center;\n  padding: 24px;\n}\n.loading-state mat-progress-bar {\n  width: 100%;\n  max-width: 260px;\n  border-radius: 4px;\n  --mdc-linear-progress-active-indicator-color: var(--cyan);\n  --mdc-linear-progress-track-color: var(--bg-overlay);\n}\n.pulse-container {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.pulse-ring {\n  position: absolute;\n  border-radius: 50%;\n  border: 1.5px solid var(--cyan);\n  animation: pulseRing 2s ease-out infinite;\n}\n.pulse-ring.ring-1 {\n  width: 78px;\n  height: 78px;\n  animation-delay: 0s;\n}\n.pulse-ring.ring-2 {\n  width: 58px;\n  height: 58px;\n  animation-delay: 0.55s;\n}\n@keyframes pulseRing {\n  0% {\n    transform: scale(0.5);\n    opacity: 0.8;\n  }\n  100% {\n    transform: scale(1.2);\n    opacity: 0;\n  }\n}\n.loading-icon {\n  font-size: 34px;\n  width: 34px;\n  height: 34px;\n  color: var(--cyan);\n  animation: spin 3s linear infinite;\n  position: relative;\n  z-index: 1;\n  filter: drop-shadow(0 0 6px var(--cyan));\n}\n.loading-title {\n  font-family: var(--font-display);\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.loading-sub {\n  font-family: var(--font-mono);\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  margin-top: -8px;\n  letter-spacing: 0.3px;\n}\n.result-container {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.status-badge {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px 20px;\n  border-radius: 12px;\n  border: 1px solid;\n  position: relative;\n  overflow: hidden;\n}\n.status-badge.status-normal {\n  background: var(--green-bg);\n  border-color: var(--green-border);\n  box-shadow: 0 0 20px rgba(0, 229, 160, 0.08);\n}\n.status-badge.status-normal .status-icon {\n  color: var(--green);\n  filter: drop-shadow(0 0 4px var(--green));\n}\n.status-badge.status-normal .status-label {\n  color: var(--green);\n}\n.status-badge.status-normal .confidence-pill {\n  background: var(--green-bg);\n  border: 1px solid var(--green-border);\n  color: var(--green);\n  font-family: var(--font-mono);\n}\n.status-badge.status-anomalo {\n  background: var(--red-bg);\n  border-color: var(--red-border);\n  box-shadow: 0 0 20px rgba(255, 70, 85, 0.08);\n}\n.status-badge.status-anomalo .status-icon {\n  color: var(--red);\n  filter: drop-shadow(0 0 4px var(--red));\n}\n.status-badge.status-anomalo .status-label {\n  color: var(--red);\n}\n.status-badge.status-anomalo .confidence-pill {\n  background: var(--red-bg);\n  border: 1px solid var(--red-border);\n  color: var(--red);\n  font-family: var(--font-mono);\n}\n.status-icon {\n  font-size: 34px;\n  width: 34px;\n  height: 34px;\n}\n.status-text {\n  flex: 1;\n}\n.status-text .status-label {\n  display: block;\n  font-family: var(--font-display);\n  font-size: 1.5rem;\n  font-weight: 800;\n  line-height: 1;\n  letter-spacing: -0.5px;\n}\n.status-text .status-desc {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.72rem;\n  color: var(--text-secondary);\n  margin-top: 5px;\n  letter-spacing: 0.3px;\n}\n.confidence-pill {\n  font-size: 0.82rem;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 20px;\n}\n.detail-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.detail-item {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px 14px;\n  background: var(--bg-overlay);\n  border-radius: 10px;\n  border: 1px solid var(--border);\n}\n.detail-item mat-icon {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--text-muted);\n  margin-top: 3px;\n  flex-shrink: 0;\n}\n.detail-item .detail-label {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.62rem;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  font-weight: 600;\n}\n.detail-item .detail-value {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-top: 3px;\n}\n.detail-item .detail-value.accent {\n  color: var(--cyan);\n}\n.recommendation {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  background: var(--amber-bg);\n  border: 1px solid var(--amber-border);\n  border-radius: 10px;\n  font-size: 0.8rem;\n  color: #D4A017;\n}\n.recommendation mat-icon {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--amber);\n  flex-shrink: 0;\n}\n.recommendation p {\n  line-height: 1.5;\n  color: var(--text-secondary);\n}\n.recommendation p strong {\n  color: var(--cyan);\n  font-weight: 600;\n}\n.feedback-section {\n  border-top: 1px solid var(--border);\n  padding-top: 14px;\n  margin-top: 4px;\n}\n.feedback-trigger {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 11px 16px;\n  background: var(--bg-overlay);\n  border: 1px dashed var(--border-bright);\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 0.82rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  transition: all 0.2s ease;\n  text-align: left;\n}\n.feedback-trigger mat-icon {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--text-muted);\n  transition: color 0.2s;\n}\n.feedback-trigger .chevron {\n  margin-left: auto;\n  transition: transform 0.2s;\n  color: var(--text-muted);\n}\n.feedback-trigger:hover,\n.feedback-trigger.active {\n  border-color: var(--cyan-dim);\n  background: var(--cyan-glow);\n  color: var(--cyan);\n}\n.feedback-trigger:hover mat-icon,\n.feedback-trigger.active mat-icon {\n  color: var(--cyan);\n}\n.feedback-trigger:hover .chevron,\n.feedback-trigger.active .chevron {\n  color: var(--cyan);\n}\n.feedback-panel {\n  margin-top: 10px;\n  padding: 16px;\n  background: var(--bg-overlay);\n  border-radius: 10px;\n  border: 1px solid var(--border-bright);\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.feedback-question {\n  font-size: 0.87rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px;\n  line-height: 1.5;\n}\n.correction-label {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-weight: 700;\n  font-size: 0.9rem;\n  padding: 2px 10px 2px 6px;\n  border-radius: 20px;\n  vertical-align: middle;\n}\n.correction-label mat-icon {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.correction-label.label-normal {\n  color: var(--green);\n  background: var(--green-bg);\n  border: 1px solid var(--green-border);\n}\n.correction-label.label-normal mat-icon {\n  color: var(--green);\n}\n.correction-label.label-anomalo {\n  color: var(--red);\n  background: var(--red-bg);\n  border: 1px solid var(--red-border);\n}\n.correction-label.label-anomalo mat-icon {\n  color: var(--red);\n}\n.feedback-confirm-actions {\n  display: flex;\n  gap: 10px;\n}\n.feedback-confirm-actions .btn-confirm-yes {\n  flex: 1;\n  background: var(--cyan) !important;\n  color: #06091A !important;\n  font-weight: 700 !important;\n  font-size: 0.82rem !important;\n  box-shadow: 0 0 14px var(--cyan-glow-md);\n}\n.feedback-confirm-actions .btn-confirm-no {\n  color: var(--text-secondary) !important;\n  border-color: var(--border-bright) !important;\n  background: var(--bg-elevated) !important;\n  font-size: 0.82rem !important;\n}\n.feedback-confirm-actions .btn-confirm-no:hover {\n  border-color: var(--red-border) !important;\n  color: var(--red) !important;\n  background: var(--red-bg) !important;\n}\n.feedback-success {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 16px;\n  background: var(--green-bg);\n  border: 1px solid var(--green-border);\n  border-radius: 10px;\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--green);\n  margin-top: 4px;\n}\n.feedback-success mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: var(--green);\n  filter: drop-shadow(0 0 4px var(--green));\n}\n.empty-state {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 14px;\n  text-align: center;\n  padding: 48px 24px;\n}\n.empty-icon-wrap {\n  width: 78px;\n  height: 78px;\n  background: var(--bg-overlay);\n  border: 1px solid var(--border-bright);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.empty-icon-wrap mat-icon {\n  font-size: 34px;\n  width: 34px;\n  height: 34px;\n  color: var(--text-muted);\n}\n.empty-title {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.empty-sub {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  line-height: 1.7;\n}\n.empty-sub strong {\n  color: var(--cyan);\n  font-weight: 600;\n}\n.error-state {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  text-align: center;\n  padding: 48px 24px;\n}\n.error-state .error-icon {\n  font-size: 42px;\n  width: 42px;\n  height: 42px;\n  color: var(--red);\n  opacity: 0.7;\n}\n.error-state .error-title {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--red);\n}\n.error-state .error-msg {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  line-height: 1.6;\n  max-width: 300px;\n}\n@media (max-width: 900px) {\n  .tab-content {\n    padding: 20px 16px;\n  }\n  .panel-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=triagem.component.css.map */\n'] }]
  }], () => [{ type: AnalysisService }], { fileInputRef: [{
    type: ViewChild,
    args: ["fileInput"]
  }], changeInputRef: [{
    type: ViewChild,
    args: ["changeInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TriagemComponent, { className: "TriagemComponent", filePath: "src/app/components/triagem/triagem.component.ts", lineNumber: 39 });
})();

// src/app/components/diagnostico/diagnostico.component.ts
var _c07 = ["fileInput"];
var _c16 = ["changeInput"];
function DiagnosticoComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275listener("click", function DiagnosticoComponent_Conditional_12_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.triggerFileInput());
    })("dragover", function DiagnosticoComponent_Conditional_12_Template_div_dragover_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragOver($event));
    })("dragleave", function DiagnosticoComponent_Conditional_12_Template_div_dragleave_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragLeave());
    })("drop", function DiagnosticoComponent_Conditional_12_Template_div_drop_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDrop($event));
    });
    \u0275\u0275elementStart(1, "input", 15, 0);
    \u0275\u0275listener("change", function DiagnosticoComponent_Conditional_12_Template_input_change_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 16)(4, "mat-icon");
    \u0275\u0275text(5, "cloud_upload");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 17);
    \u0275\u0275text(7, "Arraste a imagem aqui");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 18);
    \u0275\u0275text(9, "ou ");
    \u0275\u0275elementStart(10, "span", 19);
    \u0275\u0275text(11, "clique para selecionar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 20)(13, "span");
    \u0275\u0275text(14, "PNG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "JPG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "JPEG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 21);
    \u0275\u0275text(20, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "M\xE1x. 10 MB");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("dragging", ctx_r1.isDragging());
  }
}
function DiagnosticoComponent_Conditional_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 29);
    \u0275\u0275elementStart(1, "div", 30)(2, "div", 31)(3, "mat-icon");
    \u0275\u0275text(4, "biotech");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " A diagnosticar... ");
    \u0275\u0275elementEnd()();
  }
}
function DiagnosticoComponent_Conditional_13_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function DiagnosticoComponent_Conditional_13_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.analyze());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "analytics");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Diagnosticar ");
    \u0275\u0275elementEnd();
  }
}
function DiagnosticoComponent_Conditional_13_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function DiagnosticoComponent_Conditional_13_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.reset());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Nova An\xE1lise ");
    \u0275\u0275elementEnd();
  }
}
function DiagnosticoComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23);
    \u0275\u0275element(2, "img", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, DiagnosticoComponent_Conditional_13_Conditional_3_Template, 6, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 25)(5, "button", 26);
    \u0275\u0275listener("click", function DiagnosticoComponent_Conditional_13_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.triggerChangeInput());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "swap_horiz");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Alterar Imagem ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 15, 1);
    \u0275\u0275listener("change", function DiagnosticoComponent_Conditional_13_Template_input_change_9_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, DiagnosticoComponent_Conditional_13_Conditional_11_Template, 4, 0, "button", 27);
    \u0275\u0275conditionalCreate(12, DiagnosticoComponent_Conditional_13_Conditional_12_Template, 4, 0, "button", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r1.selectedImage(), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isAnalyzing() ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isAnalyzing());
    \u0275\u0275advance(6);
    \u0275\u0275conditional(!ctx_r1.isAnalyzing() && !ctx_r1.result() ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.result() || ctx_r1.error() ? 12 : -1);
  }
}
function DiagnosticoComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 34);
    \u0275\u0275element(2, "div", 35)(3, "div", 36);
    \u0275\u0275elementStart(4, "mat-icon", 37);
    \u0275\u0275text(5, "biotech");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 38);
    \u0275\u0275text(7, "A processar diagn\xF3stico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 39);
    \u0275\u0275text(9, "Identificando padr\xF5es e anomalias...");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "mat-progress-bar", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("@fadeSlideIn", void 0);
  }
}
function DiagnosticoComponent_Conditional_25_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 60)(2, "div", 61)(3, "mat-icon", 62);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 63);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 64);
    \u0275\u0275element(10, "div", 65);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const disease_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("@barGrow", void 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", "icon-" + disease_r6.colorKey);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", disease_r6.icon, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(disease_r6.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "color-text-" + disease_r6.colorKey);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", disease_r6.probability, "% ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.animateBars() ? disease_r6.probability + "%" : "0%");
    \u0275\u0275property("ngClass", "fill-" + disease_r6.colorKey);
  }
}
function DiagnosticoComponent_Conditional_25_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "mat-icon");
    \u0275\u0275text(2, "medical_services");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Este resultado \xE9 uma ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6, "an\xE1lise preliminar automatizada");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, ". Consulte um m\xE9dico especialista para diagn\xF3stico definitivo.");
    \u0275\u0275elementEnd()();
  }
}
function DiagnosticoComponent_Conditional_25_Conditional_43_Conditional_8_For_10_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275text(1, "exclusivo");
    \u0275\u0275elementEnd();
  }
}
function DiagnosticoComponent_Conditional_25_Conditional_43_Conditional_8_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 74);
    \u0275\u0275listener("click", function DiagnosticoComponent_Conditional_25_Conditional_43_Conditional_8_For_10_Template_button_click_0_listener() {
      const disease_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.toggleDisease(disease_r10));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, DiagnosticoComponent_Conditional_25_Conditional_43_Conditional_8_For_10_Conditional_5_Template, 2, 0, "span", 75);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const disease_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("checked", ctx_r1.isDiseaseSelected(disease_r10))("disabled", ctx_r1.isDisabled(disease_r10));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isDiseaseSelected(disease_r10) ? "check_box" : "check_box_outline_blank", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(disease_r10);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isDisabled(disease_r10) ? 5 : -1);
  }
}
function DiagnosticoComponent_Conditional_25_Conditional_43_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "p", 69);
    \u0275\u0275text(2, " Assinale as condi\xE7\xF5es ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4, "realmente presentes");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " na imagem: ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 70);
    \u0275\u0275text(7, "Pode selecionar mais de uma op\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 71);
    \u0275\u0275repeaterCreate(9, DiagnosticoComponent_Conditional_25_Conditional_43_Conditional_8_For_10_Template, 6, 7, "button", 72, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 73);
    \u0275\u0275listener("click", function DiagnosticoComponent_Conditional_25_Conditional_43_Conditional_8_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.submitFeedback());
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "send");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " Enviar Feedback ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("@slideDown", void 0);
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.allDiseases);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.hasAnyFeedback());
  }
}
function DiagnosticoComponent_Conditional_25_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58)(1, "button", 66);
    \u0275\u0275listener("click", function DiagnosticoComponent_Conditional_25_Conditional_43_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleFeedback());
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "feedback");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Acha que a previs\xE3o est\xE1 errada?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-icon", 67);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, DiagnosticoComponent_Conditional_25_Conditional_43_Conditional_8_Template, 15, 2, "div", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.showFeedback());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.showFeedback() ? "expand_less" : "expand_more");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showFeedback() ? 8 : -1);
  }
}
function DiagnosticoComponent_Conditional_25_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "mat-icon");
    \u0275\u0275text(2, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Obrigado pelo seu feedback m\xE9dico!");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275property("@fadeSlideIn", void 0);
  }
}
function DiagnosticoComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 41)(2, "div", 42)(3, "mat-icon");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 43)(6, "span", 44);
    \u0275\u0275text(7, "Diagn\xF3stico Prim\xE1rio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 45);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 46)(11, "span", 47);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 48);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 49)(16, "h3", 50)(17, "mat-icon");
    \u0275\u0275text(18, "bar_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " Probabilidades por Condi\xE7\xE3o ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 51);
    \u0275\u0275repeaterCreate(21, DiagnosticoComponent_Conditional_25_For_22_Template, 11, 9, "div", 52, \u0275\u0275componentInstance().trackByName, true);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 53)(24, "div", 54)(25, "mat-icon");
    \u0275\u0275text(26, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div")(28, "span", 55);
    \u0275\u0275text(29, "Data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 56);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 54)(34, "mat-icon");
    \u0275\u0275text(35, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div")(37, "span", 55);
    \u0275\u0275text(38, "Hora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 56);
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(42, DiagnosticoComponent_Conditional_25_Conditional_42_Template, 8, 0, "div", 57);
    \u0275\u0275conditionalCreate(43, DiagnosticoComponent_Conditional_25_Conditional_43_Template, 9, 4, "div", 58)(44, DiagnosticoComponent_Conditional_25_Conditional_44_Template, 5, 1, "div", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("@fadeSlideIn", void 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "color-" + ctx_r1.result().primaryDiagnosis.colorKey);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.result().primaryDiagnosis.icon);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.result().primaryDiagnosis.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.result().primaryDiagnosis.probability, "%");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "sev-" + ctx_r1.result().primaryDiagnosis.severity);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getSeverityLabel(ctx_r1.result().primaryDiagnosis.severity), " ");
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.result().probabilities);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(32, 11, ctx_r1.result().timestamp, "dd/MM/yyyy"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(41, 14, ctx_r1.result().timestamp, "HH:mm:ss"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.result().primaryDiagnosis.name !== "Normal" ? 42 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.feedbackSubmitted() ? 43 : 44);
  }
}
function DiagnosticoComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "mat-icon", 76);
    \u0275\u0275text(2, "cloud_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 77);
    \u0275\u0275text(4, "Erro na an\xE1lise");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 78);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("@fadeSlideIn", void 0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function DiagnosticoComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 79)(2, "mat-icon");
    \u0275\u0275text(3, "biotech");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 80);
    \u0275\u0275text(5, "Aguardando imagem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 81);
    \u0275\u0275text(7, " Carregue uma imagem de raio-X e clique em");
    \u0275\u0275element(8, "br");
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10, '"Diagnosticar"');
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " para obter as probabilidades. ");
    \u0275\u0275elementEnd()();
  }
}
var _DiagnosticoComponent = class _DiagnosticoComponent {
  constructor(analysisService) {
    this.analysisService = analysisService;
    this.selectedImage = signal(null, ...ngDevMode ? [{ debugName: "selectedImage" }] : []);
    this.selectedFile = signal(null, ...ngDevMode ? [{ debugName: "selectedFile" }] : []);
    this.isAnalyzing = signal(false, ...ngDevMode ? [{ debugName: "isAnalyzing" }] : []);
    this.result = signal(null, ...ngDevMode ? [{ debugName: "result" }] : []);
    this.isDragging = signal(false, ...ngDevMode ? [{ debugName: "isDragging" }] : []);
    this.showFeedback = signal(false, ...ngDevMode ? [{ debugName: "showFeedback" }] : []);
    this.feedbackSubmitted = signal(false, ...ngDevMode ? [{ debugName: "feedbackSubmitted" }] : []);
    this.animateBars = signal(false, ...ngDevMode ? [{ debugName: "animateBars" }] : []);
    this.error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
    this.feedbackSelections = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "feedbackSelections" }] : []);
    this.normalSelected = computed(() => this.feedbackSelections().has("Normal"), ...ngDevMode ? [{ debugName: "normalSelected" }] : []);
    this.anyDiseaseSelected = computed(() => [...this.feedbackSelections()].some((s) => s !== "Normal"), ...ngDevMode ? [{ debugName: "anyDiseaseSelected" }] : []);
    this.hasAnyFeedback = computed(() => this.feedbackSelections().size > 0, ...ngDevMode ? [{ debugName: "hasAnyFeedback" }] : []);
    this.allDiseases = ["Normal", "Pneumonia", "Tuberculose", "Cardiomegalia", "Derrame Pleural"];
  }
  triggerFileInput() {
    this.fileInputRef.nativeElement.click();
  }
  triggerChangeInput() {
    this.changeInputRef.nativeElement.click();
  }
  onFileSelected(event) {
    const file = event.target.files?.[0];
    if (file)
      this.loadImage(file);
  }
  onDragOver(event) {
    event.preventDefault();
    this.isDragging.set(true);
  }
  onDragLeave() {
    this.isDragging.set(false);
  }
  onDrop(event) {
    event.preventDefault();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith("image/"))
      this.loadImage(file);
  }
  loadImage(file) {
    this.selectedFile.set(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      this.selectedImage.set(reader.result);
      this.result.set(null);
      this.error.set(null);
      this.animateBars.set(false);
      this.feedbackSubmitted.set(false);
      this.showFeedback.set(false);
      this.feedbackSelections.set(/* @__PURE__ */ new Set());
    };
    reader.readAsDataURL(file);
  }
  analyze() {
    const file = this.selectedFile();
    if (!file)
      return;
    this.isAnalyzing.set(true);
    this.result.set(null);
    this.error.set(null);
    this.animateBars.set(false);
    this.analysisService.analisarDiagnostico(file).subscribe({
      next: (result) => {
        this.isAnalyzing.set(false);
        this.result.set(result);
        setTimeout(() => this.animateBars.set(true), 80);
      },
      error: () => {
        this.isAnalyzing.set(false);
        this.error.set("Erro ao contactar o servidor. Verifique se o backend e o modelo IA est\xE3o activos.");
      }
    });
  }
  reset() {
    this.selectedImage.set(null);
    this.selectedFile.set(null);
    this.result.set(null);
    this.error.set(null);
    this.isAnalyzing.set(false);
    this.animateBars.set(false);
    this.showFeedback.set(false);
    this.feedbackSubmitted.set(false);
    this.feedbackSelections.set(/* @__PURE__ */ new Set());
  }
  toggleFeedback() {
    this.showFeedback.update((v) => !v);
  }
  toggleDisease(disease) {
    if (this.isDisabled(disease))
      return;
    const next = new Set(this.feedbackSelections());
    if (next.has(disease)) {
      next.delete(disease);
    } else {
      next.add(disease);
    }
    this.feedbackSelections.set(next);
  }
  isDiseaseSelected(disease) {
    return this.feedbackSelections().has(disease);
  }
  isDisabled(disease) {
    if (disease === "Normal") {
      return this.anyDiseaseSelected();
    } else {
      return this.normalSelected();
    }
  }
  submitFeedback() {
    const res = this.result();
    if (!this.hasAnyFeedback() || !res)
      return;
    this.analysisService.enviarFeedbackDiagnostico(res.id, res.primaryDiagnosis.name, [...this.feedbackSelections()]).subscribe();
    this.feedbackSubmitted.set(true);
    this.showFeedback.set(false);
  }
  getSeverityLabel(severity) {
    const map2 = {
      none: "Nenhuma",
      low: "Baixa",
      moderate: "Moderada",
      high: "Alta"
    };
    return map2[severity] ?? severity;
  }
  trackByName(_, item) {
    return item.name;
  }
};
_DiagnosticoComponent.\u0275fac = function DiagnosticoComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DiagnosticoComponent)(\u0275\u0275directiveInject(AnalysisService));
};
_DiagnosticoComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DiagnosticoComponent, selectors: [["app-diagnostico"]], viewQuery: function DiagnosticoComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c07, 5);
    \u0275\u0275viewQuery(_c16, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInputRef = _t.first);
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.changeInputRef = _t.first);
  }
}, decls: 28, vars: 5, consts: [["fileInput", ""], ["changeInput", ""], [1, "tab-content"], [1, "panel-grid"], [1, "panel", "image-panel"], [1, "panel-header"], [1, "panel-icon"], [1, "panel-body"], [1, "upload-zone", 3, "dragging"], [1, "panel", "results-panel"], [1, "loading-state"], [1, "result-container"], [1, "error-state"], [1, "empty-state"], [1, "upload-zone", 3, "click", "dragover", "dragleave", "drop"], ["type", "file", "accept", "image/png,image/jpeg,image/jpg", 1, "hidden-input", 3, "change"], [1, "upload-icon-wrap"], [1, "upload-title"], [1, "upload-sub"], [1, "link"], [1, "upload-formats"], [1, "sep"], [1, "image-frame"], [1, "image-wrapper"], ["alt", "Raio-X", 1, "xray-image", 3, "src"], [1, "image-actions"], ["mat-stroked-button", "", 1, "btn-secondary", 3, "click", "disabled"], ["mat-flat-button", "", 1, "btn-analyze"], ["mat-stroked-button", "", 1, "btn-reset"], [1, "scan-beam"], [1, "scan-overlay"], [1, "scan-label"], ["mat-flat-button", "", 1, "btn-analyze", 3, "click"], ["mat-stroked-button", "", 1, "btn-reset", 3, "click"], [1, "pulse-container"], [1, "pulse-ring", "ring-1"], [1, "pulse-ring", "ring-2"], [1, "loading-icon"], [1, "loading-title"], [1, "loading-sub"], ["mode", "indeterminate"], [1, "primary-banner", 3, "ngClass"], [1, "primary-icon-wrap"], [1, "primary-text"], [1, "primary-label"], [1, "primary-name"], [1, "primary-meta"], [1, "primary-prob"], [1, "severity-badge", 3, "ngClass"], [1, "prob-section"], [1, "prob-title"], [1, "prob-list"], [1, "prob-item"], [1, "detail-grid"], [1, "detail-item"], [1, "detail-label"], [1, "detail-value"], [1, "warning-note"], [1, "feedback-section"], [1, "feedback-success"], [1, "prob-header"], [1, "prob-name"], [1, "prob-icon", 3, "ngClass"], [1, "prob-value", 3, "ngClass"], [1, "prob-bar-track"], [1, "prob-bar-fill", 3, "ngClass"], [1, "feedback-trigger", 3, "click"], [1, "chevron"], [1, "feedback-panel"], [1, "feedback-question"], [1, "feedback-hint"], [1, "disease-checkboxes"], [1, "disease-check", 3, "checked", "disabled"], ["mat-flat-button", "", 1, "btn-submit-feedback", 3, "click", "disabled"], [1, "disease-check", 3, "click"], [1, "exclusive-hint"], [1, "error-icon"], [1, "error-title"], [1, "error-msg"], [1, "empty-icon-wrap"], [1, "empty-title"], [1, "empty-sub"]], template: function DiagnosticoComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "mat-icon", 6);
    \u0275\u0275text(5, "biotech");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h2");
    \u0275\u0275text(8, "Imagem de Raio-X");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "Carregue uma imagem para diagn\xF3stico detalhado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 7);
    \u0275\u0275conditionalCreate(12, DiagnosticoComponent_Conditional_12_Template, 23, 2, "div", 8)(13, DiagnosticoComponent_Conditional_13_Template, 13, 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 9)(15, "div", 5)(16, "mat-icon", 6);
    \u0275\u0275text(17, "summarize");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div")(19, "h2");
    \u0275\u0275text(20, "Diagn\xF3stico Detalhado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p");
    \u0275\u0275text(22, "Probabilidade por condi\xE7\xE3o");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 7);
    \u0275\u0275conditionalCreate(24, DiagnosticoComponent_Conditional_24_Template, 11, 1, "div", 10);
    \u0275\u0275conditionalCreate(25, DiagnosticoComponent_Conditional_25_Template, 45, 17, "div", 11);
    \u0275\u0275conditionalCreate(26, DiagnosticoComponent_Conditional_26_Template, 7, 2, "div", 12);
    \u0275\u0275conditionalCreate(27, DiagnosticoComponent_Conditional_27_Template, 12, 0, "div", 13);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(12);
    \u0275\u0275conditional(!ctx.selectedImage() ? 12 : 13);
    \u0275\u0275advance(12);
    \u0275\u0275conditional(ctx.isAnalyzing() ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.result() && !ctx.isAnalyzing() ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() && !ctx.isAnalyzing() ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.result() && !ctx.isAnalyzing() && !ctx.error() ? 27 : -1);
  }
}, dependencies: [NgClass, MatProgressBarModule, MatProgressBar, MatButtonModule, MatButton, MatIconModule, MatIcon, DatePipe], styles: ['@charset "UTF-8";\n\n\n\n.tab-content[_ngcontent-%COMP%] {\n  padding: 28px 32px;\n  max-width: 1280px;\n  margin: 0 auto;\n  min-height: calc(100vh - 120px);\n}\n.panel-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  align-items: start;\n}\n.panel[_ngcontent-%COMP%] {\n  background: var(--bg-surface);\n  border-radius: 14px;\n  border: 1px solid var(--border);\n  overflow: hidden;\n  transition: border-color 0.2s;\n}\n.panel[_ngcontent-%COMP%]:hover {\n  border-color: var(--border-bright);\n}\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px 22px;\n  background: var(--bg-elevated);\n  border-bottom: 1px solid var(--border);\n  position: relative;\n}\n.panel-header[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--violet) 0%,\n      transparent 70%);\n}\n.panel-header[_ngcontent-%COMP%]   .panel-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  width: 22px;\n  height: 22px;\n  color: var(--violet);\n}\n.panel-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1.2;\n}\n.panel-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  color: var(--text-secondary);\n  margin-top: 3px;\n  letter-spacing: 0.3px;\n}\n.panel-body[_ngcontent-%COMP%] {\n  padding: 22px;\n  min-height: 420px;\n  display: flex;\n  flex-direction: column;\n}\n.upload-zone[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  border: 1.5px dashed rgba(157, 111, 255, 0.25);\n  border-radius: 12px;\n  padding: 48px 24px;\n  cursor: pointer;\n  transition: all 0.25s ease;\n  background: var(--bg-overlay);\n  height: 300px;\n  max-height: 300px;\n  position: relative;\n}\n.upload-zone[_ngcontent-%COMP%]::before, \n.upload-zone[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  border-color: var(--violet-dim);\n  border-style: solid;\n  opacity: 0.4;\n  transition: opacity 0.25s;\n}\n.upload-zone[_ngcontent-%COMP%]::before {\n  top: 10px;\n  left: 10px;\n  border-width: 1.5px 0 0 1.5px;\n}\n.upload-zone[_ngcontent-%COMP%]::after {\n  bottom: 10px;\n  right: 10px;\n  border-width: 0 1.5px 1.5px 0;\n}\n.upload-zone[_ngcontent-%COMP%]:hover, \n.upload-zone.dragging[_ngcontent-%COMP%] {\n  border-color: var(--violet);\n  background: var(--violet-glow);\n  box-shadow: 0 0 24px var(--violet-glow-md), inset 0 0 24px var(--violet-glow);\n}\n.upload-zone[_ngcontent-%COMP%]:hover::before, \n.upload-zone[_ngcontent-%COMP%]:hover::after, \n.upload-zone.dragging[_ngcontent-%COMP%]::before, \n.upload-zone.dragging[_ngcontent-%COMP%]::after {\n  opacity: 1;\n}\n.upload-zone[_ngcontent-%COMP%]:hover   .upload-icon-wrap[_ngcontent-%COMP%], \n.upload-zone.dragging[_ngcontent-%COMP%]   .upload-icon-wrap[_ngcontent-%COMP%] {\n  background: var(--violet-glow-md);\n  border-color: rgba(157, 111, 255, 0.4);\n  transform: scale(1.06);\n}\n.upload-zone[_ngcontent-%COMP%]:hover   .upload-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.upload-zone.dragging[_ngcontent-%COMP%]   .upload-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--violet);\n}\n.upload-zone[_ngcontent-%COMP%]:hover   .upload-title[_ngcontent-%COMP%], \n.upload-zone.dragging[_ngcontent-%COMP%]   .upload-title[_ngcontent-%COMP%] {\n  color: var(--violet);\n}\n.upload-icon-wrap[_ngcontent-%COMP%] {\n  width: 68px;\n  height: 68px;\n  background: var(--bg-elevated);\n  border: 1px solid var(--border-bright);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.25s ease;\n}\n.upload-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 30px;\n  width: 30px;\n  height: 30px;\n  color: var(--text-secondary);\n  transition: color 0.25s;\n}\n.upload-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--text-secondary);\n  transition: color 0.25s;\n}\n.upload-sub[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--text-muted);\n}\n.upload-sub[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%] {\n  color: var(--violet);\n  font-weight: 500;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n.upload-formats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 4px;\n}\n.upload-formats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.65rem;\n  background: var(--bg-elevated);\n  border: 1px solid var(--border-bright);\n  border-radius: 4px;\n  padding: 2px 7px;\n  color: var(--text-muted);\n  font-weight: 500;\n}\n.upload-formats[_ngcontent-%COMP%]   .sep[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--text-muted);\n}\n.image-frame[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #000;\n  max-height: 300px;\n  flex-shrink: 0;\n  box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.05), inset 0 0 8px rgba(255, 255, 255, 0.08);\n}\n.image-wrapper[_ngcontent-%COMP%] {\n  overflow-x: hidden;\n  overflow-y: auto;\n  max-height: 300px;\n}\n.image-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 4px;\n}\n.image-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #0a0a0a;\n}\n.image-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #222;\n  border-radius: 3px;\n}\n.xray-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n  display: block;\n  filter: contrast(1.05) brightness(0.98);\n}\n@keyframes _ngcontent-%COMP%_scanBeam {\n  0% {\n    top: 0;\n  }\n  50% {\n    top: calc(100% - 3px);\n  }\n  100% {\n    top: 0;\n  }\n}\n.scan-beam[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--violet),\n      #c8a0ff,\n      var(--violet),\n      transparent);\n  box-shadow:\n    0 0 18px var(--violet-glow-str),\n    0 0 6px rgba(200, 160, 255, 0.8),\n    0 0 40px var(--violet-glow-md);\n  animation: _ngcontent-%COMP%_scanBeam 1.8s linear infinite;\n}\n.scan-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 10px;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(0, 0, 0, 0.65),\n      transparent);\n}\n.scan-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(157, 111, 255, 0.88);\n  color: #fff;\n  font-family: var(--font-mono);\n  font-size: 0.7rem;\n  font-weight: 600;\n  padding: 4px 12px;\n  border-radius: 20px;\n  letter-spacing: 0.5px;\n}\n.scan-label[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n  width: 13px;\n  height: 13px;\n  animation: _ngcontent-%COMP%_spin 2s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.image-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 14px;\n  flex-wrap: wrap;\n}\n.image-actions[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 130px;\n  color: var(--text-secondary) !important;\n  border-color: var(--border-bright) !important;\n  background: var(--bg-elevated) !important;\n}\n.image-actions[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover:not([disabled]) {\n  border-color: var(--violet) !important;\n  color: var(--violet) !important;\n  background: var(--violet-glow) !important;\n}\n.image-actions[_ngcontent-%COMP%]   .btn-analyze[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 150px;\n  background: var(--violet) !important;\n  color: #fff !important;\n  font-weight: 700 !important;\n  letter-spacing: 0.3px;\n  box-shadow: 0 0 18px var(--violet-glow-md);\n  transition: box-shadow 0.2s !important;\n}\n.image-actions[_ngcontent-%COMP%]   .btn-analyze[_ngcontent-%COMP%]:hover {\n  background: #8b5cf6 !important;\n  box-shadow: 0 0 28px var(--violet-glow-str) !important;\n}\n.image-actions[_ngcontent-%COMP%]   .btn-reset[_ngcontent-%COMP%] {\n  flex: 1;\n  color: var(--text-secondary) !important;\n  border-color: var(--border-bright) !important;\n  background: var(--bg-elevated) !important;\n}\n.image-actions[_ngcontent-%COMP%]   .btn-reset[_ngcontent-%COMP%]:hover {\n  border-color: var(--border-bright) !important;\n  background: var(--bg-overlay) !important;\n}\n.loading-state[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  text-align: center;\n  padding: 24px;\n}\n.loading-state[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 260px;\n  border-radius: 4px;\n  --mdc-linear-progress-active-indicator-color: var(--violet);\n  --mdc-linear-progress-track-color: var(--bg-overlay);\n}\n.pulse-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.pulse-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  border: 1.5px solid var(--violet);\n  animation: _ngcontent-%COMP%_pulseRing 2s ease-out infinite;\n}\n.pulse-ring.ring-1[_ngcontent-%COMP%] {\n  width: 78px;\n  height: 78px;\n  animation-delay: 0s;\n}\n.pulse-ring.ring-2[_ngcontent-%COMP%] {\n  width: 58px;\n  height: 58px;\n  animation-delay: 0.55s;\n}\n@keyframes _ngcontent-%COMP%_pulseRing {\n  0% {\n    transform: scale(0.5);\n    opacity: 0.8;\n  }\n  100% {\n    transform: scale(1.2);\n    opacity: 0;\n  }\n}\n.loading-icon[_ngcontent-%COMP%] {\n  font-size: 34px;\n  width: 34px;\n  height: 34px;\n  color: var(--violet);\n  animation: _ngcontent-%COMP%_spin 3s linear infinite;\n  position: relative;\n  z-index: 1;\n  filter: drop-shadow(0 0 6px var(--violet));\n}\n.loading-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.loading-sub[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  margin-top: -8px;\n  letter-spacing: 0.3px;\n}\n.result-container[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.primary-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 18px;\n  border-radius: 12px;\n  border: 1px solid;\n  position: relative;\n}\n.primary-banner.color-green[_ngcontent-%COMP%] {\n  background: var(--green-bg);\n  border-color: var(--green-border);\n  box-shadow: 0 0 18px rgba(0, 229, 160, 0.07);\n}\n.primary-banner.color-green[_ngcontent-%COMP%]   .primary-icon-wrap[_ngcontent-%COMP%] {\n  background: rgba(0, 229, 160, 0.12);\n}\n.primary-banner.color-green[_ngcontent-%COMP%]   .primary-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--green);\n  filter: drop-shadow(0 0 4px var(--green));\n}\n.primary-banner.color-green[_ngcontent-%COMP%]   .primary-name[_ngcontent-%COMP%] {\n  color: var(--green);\n}\n.primary-banner.color-green[_ngcontent-%COMP%]   .primary-prob[_ngcontent-%COMP%] {\n  color: var(--green);\n}\n.primary-banner.color-orange[_ngcontent-%COMP%] {\n  background: var(--orange-bg);\n  border-color: var(--orange-border);\n  box-shadow: 0 0 18px rgba(255, 126, 61, 0.07);\n}\n.primary-banner.color-orange[_ngcontent-%COMP%]   .primary-icon-wrap[_ngcontent-%COMP%] {\n  background: rgba(255, 126, 61, 0.12);\n}\n.primary-banner.color-orange[_ngcontent-%COMP%]   .primary-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--orange);\n  filter: drop-shadow(0 0 4px var(--orange));\n}\n.primary-banner.color-orange[_ngcontent-%COMP%]   .primary-name[_ngcontent-%COMP%] {\n  color: var(--orange);\n}\n.primary-banner.color-orange[_ngcontent-%COMP%]   .primary-prob[_ngcontent-%COMP%] {\n  color: var(--orange);\n}\n.primary-banner.color-red[_ngcontent-%COMP%] {\n  background: var(--red-bg);\n  border-color: var(--red-border);\n  box-shadow: 0 0 18px rgba(255, 70, 85, 0.07);\n}\n.primary-banner.color-red[_ngcontent-%COMP%]   .primary-icon-wrap[_ngcontent-%COMP%] {\n  background: rgba(255, 70, 85, 0.12);\n}\n.primary-banner.color-red[_ngcontent-%COMP%]   .primary-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--red);\n  filter: drop-shadow(0 0 4px var(--red));\n}\n.primary-banner.color-red[_ngcontent-%COMP%]   .primary-name[_ngcontent-%COMP%] {\n  color: var(--red);\n}\n.primary-banner.color-red[_ngcontent-%COMP%]   .primary-prob[_ngcontent-%COMP%] {\n  color: var(--red);\n}\n.primary-banner.color-purple[_ngcontent-%COMP%] {\n  background: var(--violet-glow);\n  border-color: rgba(157, 111, 255, 0.28);\n  box-shadow: 0 0 18px rgba(157, 111, 255, 0.07);\n}\n.primary-banner.color-purple[_ngcontent-%COMP%]   .primary-icon-wrap[_ngcontent-%COMP%] {\n  background: var(--violet-glow-md);\n}\n.primary-banner.color-purple[_ngcontent-%COMP%]   .primary-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--violet);\n  filter: drop-shadow(0 0 4px var(--violet));\n}\n.primary-banner.color-purple[_ngcontent-%COMP%]   .primary-name[_ngcontent-%COMP%] {\n  color: var(--violet);\n}\n.primary-banner.color-purple[_ngcontent-%COMP%]   .primary-prob[_ngcontent-%COMP%] {\n  color: var(--violet);\n}\n.primary-banner.color-cyan[_ngcontent-%COMP%] {\n  background: var(--cyan-glow);\n  border-color: rgba(0, 212, 239, 0.28);\n  box-shadow: 0 0 18px rgba(0, 212, 239, 0.07);\n}\n.primary-banner.color-cyan[_ngcontent-%COMP%]   .primary-icon-wrap[_ngcontent-%COMP%] {\n  background: var(--cyan-glow-md);\n}\n.primary-banner.color-cyan[_ngcontent-%COMP%]   .primary-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--cyan);\n  filter: drop-shadow(0 0 4px var(--cyan));\n}\n.primary-banner.color-cyan[_ngcontent-%COMP%]   .primary-name[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.primary-banner.color-cyan[_ngcontent-%COMP%]   .primary-prob[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.primary-icon-wrap[_ngcontent-%COMP%] {\n  width: 46px;\n  height: 46px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.primary-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  width: 22px;\n  height: 22px;\n}\n.primary-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.primary-text[_ngcontent-%COMP%]   .primary-label[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.62rem;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  font-weight: 600;\n  color: var(--text-muted);\n}\n.primary-text[_ngcontent-%COMP%]   .primary-name[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--font-display);\n  font-size: 1.3rem;\n  font-weight: 800;\n  letter-spacing: -0.3px;\n  line-height: 1.1;\n  margin-top: 4px;\n}\n.primary-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 6px;\n}\n.primary-meta[_ngcontent-%COMP%]   .primary-prob[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 1.5rem;\n  font-weight: 700;\n  letter-spacing: -1px;\n  line-height: 1;\n}\n.primary-meta[_ngcontent-%COMP%]   .severity-badge[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.6rem;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.primary-meta[_ngcontent-%COMP%]   .severity-badge.sev-none[_ngcontent-%COMP%] {\n  background: var(--green-bg);\n  color: var(--green);\n  border: 1px solid var(--green-border);\n}\n.primary-meta[_ngcontent-%COMP%]   .severity-badge.sev-low[_ngcontent-%COMP%] {\n  background: var(--cyan-glow);\n  color: var(--cyan);\n  border: 1px solid rgba(0, 212, 239, 0.2);\n}\n.primary-meta[_ngcontent-%COMP%]   .severity-badge.sev-moderate[_ngcontent-%COMP%] {\n  background: var(--amber-bg);\n  color: var(--amber);\n  border: 1px solid var(--amber-border);\n}\n.primary-meta[_ngcontent-%COMP%]   .severity-badge.sev-high[_ngcontent-%COMP%] {\n  background: var(--red-bg);\n  color: var(--red);\n  border: 1px solid var(--red-border);\n}\n.prob-section[_ngcontent-%COMP%] {\n  background: var(--bg-overlay);\n  border-radius: 12px;\n  border: 1px solid var(--border);\n  padding: 16px;\n}\n.prob-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--font-mono);\n  font-size: 0.65rem;\n  font-weight: 600;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.9px;\n  margin-bottom: 16px;\n}\n.prob-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  color: var(--violet);\n}\n.prob-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.prob-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n}\n.prob-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.prob-name[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.82rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n}\n.prob-name[_ngcontent-%COMP%]   .prob-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.prob-name[_ngcontent-%COMP%]   .prob-icon.icon-green[_ngcontent-%COMP%] {\n  color: var(--green);\n}\n.prob-name[_ngcontent-%COMP%]   .prob-icon.icon-orange[_ngcontent-%COMP%] {\n  color: var(--orange);\n}\n.prob-name[_ngcontent-%COMP%]   .prob-icon.icon-red[_ngcontent-%COMP%] {\n  color: var(--red);\n}\n.prob-name[_ngcontent-%COMP%]   .prob-icon.icon-purple[_ngcontent-%COMP%] {\n  color: var(--violet);\n}\n.prob-name[_ngcontent-%COMP%]   .prob-icon.icon-cyan[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.prob-value[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.82rem;\n  font-weight: 700;\n}\n.prob-value.color-text-green[_ngcontent-%COMP%] {\n  color: var(--green);\n}\n.prob-value.color-text-orange[_ngcontent-%COMP%] {\n  color: var(--orange);\n}\n.prob-value.color-text-red[_ngcontent-%COMP%] {\n  color: var(--red);\n}\n.prob-value.color-text-purple[_ngcontent-%COMP%] {\n  color: var(--violet);\n}\n.prob-value.color-text-cyan[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.prob-bar-track[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 8px;\n  background: var(--bg-elevated);\n  border-radius: 4px;\n  overflow: hidden;\n}\n.prob-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 4px;\n  transition: width 1.4s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.prob-bar-fill.fill-green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      var(--green-dim),\n      var(--green));\n  box-shadow: 0 0 6px rgba(0, 229, 160, 0.5);\n}\n.prob-bar-fill.fill-orange[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #cc5500,\n      var(--orange));\n  box-shadow: 0 0 6px rgba(255, 126, 61, 0.5);\n}\n.prob-bar-fill.fill-red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      var(--red-dim),\n      var(--red));\n  box-shadow: 0 0 6px rgba(255, 70, 85, 0.5);\n}\n.prob-bar-fill.fill-purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      var(--violet-dim),\n      var(--violet));\n  box-shadow: 0 0 6px rgba(157, 111, 255, 0.5);\n}\n.prob-bar-fill.fill-cyan[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      var(--cyan-dim),\n      var(--cyan));\n  box-shadow: 0 0 6px rgba(0, 212, 239, 0.5);\n}\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px 14px;\n  background: var(--bg-overlay);\n  border-radius: 10px;\n  border: 1px solid var(--border);\n}\n.detail-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--text-muted);\n  margin-top: 3px;\n  flex-shrink: 0;\n}\n.detail-item[_ngcontent-%COMP%]   .detail-label[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.62rem;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  font-weight: 600;\n}\n.detail-item[_ngcontent-%COMP%]   .detail-value[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-top: 3px;\n}\n.warning-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px 14px;\n  background: var(--amber-bg);\n  border: 1px solid var(--amber-border);\n  border-radius: 10px;\n  font-size: 0.78rem;\n  color: var(--text-secondary);\n  line-height: 1.5;\n}\n.warning-note[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--amber);\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.warning-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--amber);\n  font-weight: 600;\n}\n.feedback-section[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--border);\n  padding-top: 14px;\n  margin-top: 4px;\n}\n.feedback-trigger[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 11px 16px;\n  background: var(--bg-overlay);\n  border: 1px dashed var(--border-bright);\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 0.82rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  transition: all 0.2s ease;\n  text-align: left;\n}\n.feedback-trigger[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--text-muted);\n  transition: color 0.2s;\n}\n.feedback-trigger[_ngcontent-%COMP%]   .chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: var(--text-muted);\n  transition: color 0.2s;\n}\n.feedback-trigger[_ngcontent-%COMP%]:hover, \n.feedback-trigger.active[_ngcontent-%COMP%] {\n  border-color: var(--violet-dim);\n  background: var(--violet-glow);\n  color: var(--violet);\n}\n.feedback-trigger[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%], \n.feedback-trigger.active[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--violet);\n}\n.feedback-trigger[_ngcontent-%COMP%]:hover   .chevron[_ngcontent-%COMP%], \n.feedback-trigger.active[_ngcontent-%COMP%]   .chevron[_ngcontent-%COMP%] {\n  color: var(--violet);\n}\n.feedback-panel[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding: 16px;\n  background: var(--bg-overlay);\n  border-radius: 10px;\n  border: 1px solid var(--border-bright);\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.feedback-question[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.feedback-question[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--violet);\n}\n.feedback-hint[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  color: var(--text-muted);\n  margin-top: -6px;\n  letter-spacing: 0.3px;\n}\n.disease-checkboxes[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.disease-check[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px;\n  border: 1px solid var(--border-bright);\n  border-radius: 8px;\n  background: var(--bg-elevated);\n  font-size: 0.82rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-align: left;\n  width: 100%;\n}\n.disease-check[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: var(--text-muted);\n  flex-shrink: 0;\n  transition: color 0.2s;\n}\n.disease-check[_ngcontent-%COMP%]:hover:not(.disabled) {\n  border-color: rgba(157, 111, 255, 0.4);\n  background: var(--violet-glow);\n  color: var(--violet);\n}\n.disease-check[_ngcontent-%COMP%]:hover:not(.disabled)   mat-icon[_ngcontent-%COMP%] {\n  color: var(--violet);\n}\n.disease-check.checked[_ngcontent-%COMP%] {\n  border-color: rgba(157, 111, 255, 0.5);\n  background: var(--violet-glow-md);\n  color: var(--violet);\n  font-weight: 600;\n}\n.disease-check.checked[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--violet);\n}\n.disease-check.disabled[_ngcontent-%COMP%] {\n  opacity: 0.28;\n  cursor: not-allowed;\n  pointer-events: none;\n  filter: grayscale(0.5);\n}\n.exclusive-hint[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-family: var(--font-mono);\n  font-size: 0.58rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: #fff;\n  background: rgba(255, 255, 255, 0.12);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.btn-submit-feedback[_ngcontent-%COMP%] {\n  background: var(--violet) !important;\n  color: #fff !important;\n  font-weight: 700 !important;\n  align-self: flex-end;\n  padding: 8px 20px;\n  box-shadow: 0 0 14px var(--violet-glow-md);\n  transition: box-shadow 0.2s !important;\n}\n.btn-submit-feedback[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0 22px var(--violet-glow-str) !important;\n}\n.btn-submit-feedback[disabled][_ngcontent-%COMP%] {\n  background: var(--bg-elevated) !important;\n  color: var(--text-muted) !important;\n  box-shadow: none !important;\n}\n.feedback-success[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 16px;\n  background: var(--green-bg);\n  border: 1px solid var(--green-border);\n  border-radius: 10px;\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--green);\n  margin-top: 4px;\n}\n.feedback-success[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: var(--green);\n  filter: drop-shadow(0 0 4px var(--green));\n}\n.empty-state[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 14px;\n  text-align: center;\n  padding: 48px 24px;\n}\n.empty-icon-wrap[_ngcontent-%COMP%] {\n  width: 78px;\n  height: 78px;\n  background: var(--bg-overlay);\n  border: 1px solid var(--border-bright);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.empty-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 34px;\n  width: 34px;\n  height: 34px;\n  color: var(--text-muted);\n}\n.empty-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.empty-sub[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  line-height: 1.7;\n}\n.empty-sub[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--violet);\n  font-weight: 600;\n}\n.error-state[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  text-align: center;\n  padding: 48px 24px;\n}\n.error-state[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%] {\n  font-size: 42px;\n  width: 42px;\n  height: 42px;\n  color: var(--red);\n  opacity: 0.7;\n}\n.error-state[_ngcontent-%COMP%]   .error-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--red);\n}\n.error-state[_ngcontent-%COMP%]   .error-msg[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  line-height: 1.6;\n  max-width: 300px;\n}\n@media (max-width: 900px) {\n  .tab-content[_ngcontent-%COMP%] {\n    padding: 20px 16px;\n  }\n  .panel-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=diagnostico.component.css.map */'], data: { animation: [
  trigger("fadeSlideIn", [
    transition(":enter", [
      style({ opacity: 0, transform: "translateY(16px)" }),
      animate("380ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
    ])
  ]),
  trigger("slideDown", [
    transition(":enter", [
      style({ opacity: 0, transform: "translateY(-10px)" }),
      animate("250ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
    ]),
    transition(":leave", [
      animate("180ms ease-in", style({ opacity: 0, transform: "translateY(-10px)" }))
    ])
  ]),
  trigger("barGrow", [
    transition(":enter", [
      style({ opacity: 0 }),
      animate("200ms ease-out", style({ opacity: 1 }))
    ])
  ])
] } });
var DiagnosticoComponent = _DiagnosticoComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DiagnosticoComponent, [{
    type: Component,
    args: [{ selector: "app-diagnostico", standalone: true, imports: [DatePipe, NgClass, MatProgressBarModule, MatButtonModule, MatIconModule], animations: [
      trigger("fadeSlideIn", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(16px)" }),
          animate("380ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
        ])
      ]),
      trigger("slideDown", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(-10px)" }),
          animate("250ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
        ]),
        transition(":leave", [
          animate("180ms ease-in", style({ opacity: 0, transform: "translateY(-10px)" }))
        ])
      ]),
      trigger("barGrow", [
        transition(":enter", [
          style({ opacity: 0 }),
          animate("200ms ease-out", style({ opacity: 1 }))
        ])
      ])
    ], template: `<div class="tab-content">
  <div class="panel-grid">

    <!-- \u2500\u2500 Left: Image Panel \u2500\u2500 -->
    <div class="panel image-panel">
      <div class="panel-header">
        <mat-icon class="panel-icon">biotech</mat-icon>
        <div>
          <h2>Imagem de Raio-X</h2>
          <p>Carregue uma imagem para diagn\xF3stico detalhado</p>
        </div>
      </div>

      <div class="panel-body">

        @if (!selectedImage()) {
          <div
            class="upload-zone"
            [class.dragging]="isDragging()"
            (click)="triggerFileInput()"
            (dragover)="onDragOver($event)"
            (dragleave)="onDragLeave()"
            (drop)="onDrop($event)"
          >
            <input
              type="file"
              #fileInput
              accept="image/png,image/jpeg,image/jpg"
              class="hidden-input"
              (change)="onFileSelected($event)"
            />
            <div class="upload-icon-wrap">
              <mat-icon>cloud_upload</mat-icon>
            </div>
            <p class="upload-title">Arraste a imagem aqui</p>
            <p class="upload-sub">ou <span class="link">clique para selecionar</span></p>
            <div class="upload-formats">
              <span>PNG</span><span>JPG</span><span>JPEG</span>
              <span class="sep">\xB7</span>
              <span>M\xE1x. 10 MB</span>
            </div>
          </div>
        } @else {
          <div class="image-frame">
            <div class="image-wrapper">
              <img [src]="selectedImage()" alt="Raio-X" class="xray-image" />
            </div>
            @if (isAnalyzing()) {
              <div class="scan-beam"></div>
              <div class="scan-overlay">
                <div class="scan-label">
                  <mat-icon>biotech</mat-icon>
                  A diagnosticar...
                </div>
              </div>
            }
          </div>

          <div class="image-actions">
            <button
              mat-stroked-button
              class="btn-secondary"
              (click)="triggerChangeInput()"
              [disabled]="isAnalyzing()"
            >
              <mat-icon>swap_horiz</mat-icon>
              Alterar Imagem
            </button>
            <input
              type="file"
              #changeInput
              accept="image/png,image/jpeg,image/jpg"
              class="hidden-input"
              (change)="onFileSelected($event)"
            />

            @if (!isAnalyzing() && !result()) {
              <button mat-flat-button class="btn-analyze" (click)="analyze()">
                <mat-icon>analytics</mat-icon>
                Diagnosticar
              </button>
            }

            @if (result() || error()) {
              <button mat-stroked-button class="btn-reset" (click)="reset()">
                <mat-icon>refresh</mat-icon>
                Nova An\xE1lise
              </button>
            }
          </div>
        }

      </div>
    </div>

    <!-- \u2500\u2500 Right: Results Panel \u2500\u2500 -->
    <div class="panel results-panel">
      <div class="panel-header">
        <mat-icon class="panel-icon">summarize</mat-icon>
        <div>
          <h2>Diagn\xF3stico Detalhado</h2>
          <p>Probabilidade por condi\xE7\xE3o</p>
        </div>
      </div>

      <div class="panel-body">

        <!-- Loading -->
        @if (isAnalyzing()) {
          <div class="loading-state" @fadeSlideIn>
            <div class="pulse-container">
              <div class="pulse-ring ring-1"></div>
              <div class="pulse-ring ring-2"></div>
              <mat-icon class="loading-icon">biotech</mat-icon>
            </div>
            <p class="loading-title">A processar diagn\xF3stico</p>
            <p class="loading-sub">Identificando padr\xF5es e anomalias...</p>
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
          </div>
        }

        <!-- Result -->
        @if (result() && !isAnalyzing()) {
          <div class="result-container" @fadeSlideIn>

            <!-- Primary Diagnosis Banner -->
            <div class="primary-banner" [ngClass]="'color-' + result()!.primaryDiagnosis.colorKey">
              <div class="primary-icon-wrap">
                <mat-icon>{{ result()!.primaryDiagnosis.icon }}</mat-icon>
              </div>
              <div class="primary-text">
                <span class="primary-label">Diagn\xF3stico Prim\xE1rio</span>
                <span class="primary-name">{{ result()!.primaryDiagnosis.name }}</span>
              </div>
              <div class="primary-meta">
                <span class="primary-prob">{{ result()!.primaryDiagnosis.probability }}%</span>
                <span class="severity-badge" [ngClass]="'sev-' + result()!.primaryDiagnosis.severity">
                  {{ getSeverityLabel(result()!.primaryDiagnosis.severity) }}
                </span>
              </div>
            </div>

            <!-- Probability Bars -->
            <div class="prob-section">
              <h3 class="prob-title">
                <mat-icon>bar_chart</mat-icon>
                Probabilidades por Condi\xE7\xE3o
              </h3>

              <div class="prob-list">
                @for (disease of result()!.probabilities; track trackByName($index, disease)) {
                  <div class="prob-item" @barGrow>
                    <div class="prob-header">
                      <div class="prob-name">
                        <mat-icon class="prob-icon" [ngClass]="'icon-' + disease.colorKey">
                          {{ disease.icon }}
                        </mat-icon>
                        <span>{{ disease.name }}</span>
                      </div>
                      <span class="prob-value" [ngClass]="'color-text-' + disease.colorKey">
                        {{ disease.probability }}%
                      </span>
                    </div>
                    <div class="prob-bar-track">
                      <div
                        class="prob-bar-fill"
                        [ngClass]="'fill-' + disease.colorKey"
                        [style.width]="animateBars() ? disease.probability + '%' : '0%'"
                      ></div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Meta Info -->
            <div class="detail-grid">
              <div class="detail-item">
                <mat-icon>calendar_today</mat-icon>
                <div>
                  <span class="detail-label">Data</span>
                  <span class="detail-value">{{ result()!.timestamp | date:'dd/MM/yyyy' }}</span>
                </div>
              </div>
              <div class="detail-item">
                <mat-icon>schedule</mat-icon>
                <div>
                  <span class="detail-label">Hora</span>
                  <span class="detail-value">{{ result()!.timestamp | date:'HH:mm:ss' }}</span>
                </div>
              </div>
            </div>

            @if (result()!.primaryDiagnosis.name !== 'Normal') {
              <div class="warning-note">
                <mat-icon>medical_services</mat-icon>
                <p>Este resultado \xE9 uma <strong>an\xE1lise preliminar automatizada</strong>. Consulte um m\xE9dico especialista para diagn\xF3stico definitivo.</p>
              </div>
            }

            <!-- Feedback -->
            @if (!feedbackSubmitted()) {
              <div class="feedback-section">
                <button
                  class="feedback-trigger"
                  [class.active]="showFeedback()"
                  (click)="toggleFeedback()"
                >
                  <mat-icon>feedback</mat-icon>
                  <span>Acha que a previs\xE3o est\xE1 errada?</span>
                  <mat-icon class="chevron">{{ showFeedback() ? 'expand_less' : 'expand_more' }}</mat-icon>
                </button>

                @if (showFeedback()) {
                  <div class="feedback-panel" @slideDown>
                    <p class="feedback-question">
                      Assinale as condi\xE7\xF5es <strong>realmente presentes</strong> na imagem:
                    </p>
                    <p class="feedback-hint">Pode selecionar mais de uma op\xE7\xE3o</p>

                    <div class="disease-checkboxes">
                      @for (disease of allDiseases; track disease) {
                        <button
                          class="disease-check"
                          [class.checked]="isDiseaseSelected(disease)"
                          [class.disabled]="isDisabled(disease)"
                          (click)="toggleDisease(disease)"
                        >
                          <mat-icon>
                            {{ isDiseaseSelected(disease) ? 'check_box' : 'check_box_outline_blank' }}
                          </mat-icon>
                          <span>{{ disease }}</span>
                          @if (isDisabled(disease)) {
                            <span class="exclusive-hint">exclusivo</span>
                          }
                        </button>
                      }
                    </div>

                    <button
                      mat-flat-button
                      class="btn-submit-feedback"
                      [disabled]="!hasAnyFeedback()"
                      (click)="submitFeedback()"
                    >
                      <mat-icon>send</mat-icon>
                      Enviar Feedback
                    </button>
                  </div>
                }
              </div>
            } @else {
              <div class="feedback-success" @fadeSlideIn>
                <mat-icon>verified</mat-icon>
                <span>Obrigado pelo seu feedback m\xE9dico!</span>
              </div>
            }

          </div>
        }

        <!-- Error State -->
        @if (error() && !isAnalyzing()) {
          <div class="error-state" @fadeSlideIn>
            <mat-icon class="error-icon">cloud_off</mat-icon>
            <p class="error-title">Erro na an\xE1lise</p>
            <p class="error-msg">{{ error() }}</p>
          </div>
        }

        <!-- Empty State -->
        @if (!result() && !isAnalyzing() && !error()) {
          <div class="empty-state">
            <div class="empty-icon-wrap">
              <mat-icon>biotech</mat-icon>
            </div>
            <p class="empty-title">Aguardando imagem</p>
            <p class="empty-sub">
              Carregue uma imagem de raio-X e clique em<br />
              <strong>"Diagnosticar"</strong> para obter as probabilidades.
            </p>
          </div>
        }

      </div>
    </div>

  </div>
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/diagnostico/diagnostico.component.scss */\n.tab-content {\n  padding: 28px 32px;\n  max-width: 1280px;\n  margin: 0 auto;\n  min-height: calc(100vh - 120px);\n}\n.panel-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  align-items: start;\n}\n.panel {\n  background: var(--bg-surface);\n  border-radius: 14px;\n  border: 1px solid var(--border);\n  overflow: hidden;\n  transition: border-color 0.2s;\n}\n.panel:hover {\n  border-color: var(--border-bright);\n}\n.panel-header {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px 22px;\n  background: var(--bg-elevated);\n  border-bottom: 1px solid var(--border);\n  position: relative;\n}\n.panel-header::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--violet) 0%,\n      transparent 70%);\n}\n.panel-header .panel-icon {\n  font-size: 22px;\n  width: 22px;\n  height: 22px;\n  color: var(--violet);\n}\n.panel-header h2 {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1.2;\n}\n.panel-header p {\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  color: var(--text-secondary);\n  margin-top: 3px;\n  letter-spacing: 0.3px;\n}\n.panel-body {\n  padding: 22px;\n  min-height: 420px;\n  display: flex;\n  flex-direction: column;\n}\n.upload-zone {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  border: 1.5px dashed rgba(157, 111, 255, 0.25);\n  border-radius: 12px;\n  padding: 48px 24px;\n  cursor: pointer;\n  transition: all 0.25s ease;\n  background: var(--bg-overlay);\n  height: 300px;\n  max-height: 300px;\n  position: relative;\n}\n.upload-zone::before,\n.upload-zone::after {\n  content: "";\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  border-color: var(--violet-dim);\n  border-style: solid;\n  opacity: 0.4;\n  transition: opacity 0.25s;\n}\n.upload-zone::before {\n  top: 10px;\n  left: 10px;\n  border-width: 1.5px 0 0 1.5px;\n}\n.upload-zone::after {\n  bottom: 10px;\n  right: 10px;\n  border-width: 0 1.5px 1.5px 0;\n}\n.upload-zone:hover,\n.upload-zone.dragging {\n  border-color: var(--violet);\n  background: var(--violet-glow);\n  box-shadow: 0 0 24px var(--violet-glow-md), inset 0 0 24px var(--violet-glow);\n}\n.upload-zone:hover::before,\n.upload-zone:hover::after,\n.upload-zone.dragging::before,\n.upload-zone.dragging::after {\n  opacity: 1;\n}\n.upload-zone:hover .upload-icon-wrap,\n.upload-zone.dragging .upload-icon-wrap {\n  background: var(--violet-glow-md);\n  border-color: rgba(157, 111, 255, 0.4);\n  transform: scale(1.06);\n}\n.upload-zone:hover .upload-icon-wrap mat-icon,\n.upload-zone.dragging .upload-icon-wrap mat-icon {\n  color: var(--violet);\n}\n.upload-zone:hover .upload-title,\n.upload-zone.dragging .upload-title {\n  color: var(--violet);\n}\n.upload-icon-wrap {\n  width: 68px;\n  height: 68px;\n  background: var(--bg-elevated);\n  border: 1px solid var(--border-bright);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.25s ease;\n}\n.upload-icon-wrap mat-icon {\n  font-size: 30px;\n  width: 30px;\n  height: 30px;\n  color: var(--text-secondary);\n  transition: color 0.25s;\n}\n.upload-title {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--text-secondary);\n  transition: color 0.25s;\n}\n.upload-sub {\n  font-size: 0.82rem;\n  color: var(--text-muted);\n}\n.upload-sub .link {\n  color: var(--violet);\n  font-weight: 500;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n.upload-formats {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 4px;\n}\n.upload-formats span {\n  font-family: var(--font-mono);\n  font-size: 0.65rem;\n  background: var(--bg-elevated);\n  border: 1px solid var(--border-bright);\n  border-radius: 4px;\n  padding: 2px 7px;\n  color: var(--text-muted);\n  font-weight: 500;\n}\n.upload-formats .sep {\n  background: none;\n  border: none;\n  color: var(--text-muted);\n}\n.image-frame {\n  position: relative;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #000;\n  max-height: 300px;\n  flex-shrink: 0;\n  box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.05), inset 0 0 8px rgba(255, 255, 255, 0.08);\n}\n.image-wrapper {\n  overflow-x: hidden;\n  overflow-y: auto;\n  max-height: 300px;\n}\n.image-wrapper::-webkit-scrollbar {\n  width: 4px;\n}\n.image-wrapper::-webkit-scrollbar-track {\n  background: #0a0a0a;\n}\n.image-wrapper::-webkit-scrollbar-thumb {\n  background: #222;\n  border-radius: 3px;\n}\n.xray-image {\n  width: 100%;\n  height: auto;\n  display: block;\n  filter: contrast(1.05) brightness(0.98);\n}\n@keyframes scanBeam {\n  0% {\n    top: 0;\n  }\n  50% {\n    top: calc(100% - 3px);\n  }\n  100% {\n    top: 0;\n  }\n}\n.scan-beam {\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--violet),\n      #c8a0ff,\n      var(--violet),\n      transparent);\n  box-shadow:\n    0 0 18px var(--violet-glow-str),\n    0 0 6px rgba(200, 160, 255, 0.8),\n    0 0 40px var(--violet-glow-md);\n  animation: scanBeam 1.8s linear infinite;\n}\n.scan-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 10px;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(0, 0, 0, 0.65),\n      transparent);\n}\n.scan-label {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(157, 111, 255, 0.88);\n  color: #fff;\n  font-family: var(--font-mono);\n  font-size: 0.7rem;\n  font-weight: 600;\n  padding: 4px 12px;\n  border-radius: 20px;\n  letter-spacing: 0.5px;\n}\n.scan-label mat-icon {\n  font-size: 13px;\n  width: 13px;\n  height: 13px;\n  animation: spin 2s linear infinite;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.image-actions {\n  display: flex;\n  gap: 10px;\n  margin-top: 14px;\n  flex-wrap: wrap;\n}\n.image-actions .btn-secondary {\n  flex: 1;\n  min-width: 130px;\n  color: var(--text-secondary) !important;\n  border-color: var(--border-bright) !important;\n  background: var(--bg-elevated) !important;\n}\n.image-actions .btn-secondary:hover:not([disabled]) {\n  border-color: var(--violet) !important;\n  color: var(--violet) !important;\n  background: var(--violet-glow) !important;\n}\n.image-actions .btn-analyze {\n  flex: 1;\n  min-width: 150px;\n  background: var(--violet) !important;\n  color: #fff !important;\n  font-weight: 700 !important;\n  letter-spacing: 0.3px;\n  box-shadow: 0 0 18px var(--violet-glow-md);\n  transition: box-shadow 0.2s !important;\n}\n.image-actions .btn-analyze:hover {\n  background: #8b5cf6 !important;\n  box-shadow: 0 0 28px var(--violet-glow-str) !important;\n}\n.image-actions .btn-reset {\n  flex: 1;\n  color: var(--text-secondary) !important;\n  border-color: var(--border-bright) !important;\n  background: var(--bg-elevated) !important;\n}\n.image-actions .btn-reset:hover {\n  border-color: var(--border-bright) !important;\n  background: var(--bg-overlay) !important;\n}\n.loading-state {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  text-align: center;\n  padding: 24px;\n}\n.loading-state mat-progress-bar {\n  width: 100%;\n  max-width: 260px;\n  border-radius: 4px;\n  --mdc-linear-progress-active-indicator-color: var(--violet);\n  --mdc-linear-progress-track-color: var(--bg-overlay);\n}\n.pulse-container {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.pulse-ring {\n  position: absolute;\n  border-radius: 50%;\n  border: 1.5px solid var(--violet);\n  animation: pulseRing 2s ease-out infinite;\n}\n.pulse-ring.ring-1 {\n  width: 78px;\n  height: 78px;\n  animation-delay: 0s;\n}\n.pulse-ring.ring-2 {\n  width: 58px;\n  height: 58px;\n  animation-delay: 0.55s;\n}\n@keyframes pulseRing {\n  0% {\n    transform: scale(0.5);\n    opacity: 0.8;\n  }\n  100% {\n    transform: scale(1.2);\n    opacity: 0;\n  }\n}\n.loading-icon {\n  font-size: 34px;\n  width: 34px;\n  height: 34px;\n  color: var(--violet);\n  animation: spin 3s linear infinite;\n  position: relative;\n  z-index: 1;\n  filter: drop-shadow(0 0 6px var(--violet));\n}\n.loading-title {\n  font-family: var(--font-display);\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.loading-sub {\n  font-family: var(--font-mono);\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  margin-top: -8px;\n  letter-spacing: 0.3px;\n}\n.result-container {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.primary-banner {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 18px;\n  border-radius: 12px;\n  border: 1px solid;\n  position: relative;\n}\n.primary-banner.color-green {\n  background: var(--green-bg);\n  border-color: var(--green-border);\n  box-shadow: 0 0 18px rgba(0, 229, 160, 0.07);\n}\n.primary-banner.color-green .primary-icon-wrap {\n  background: rgba(0, 229, 160, 0.12);\n}\n.primary-banner.color-green .primary-icon-wrap mat-icon {\n  color: var(--green);\n  filter: drop-shadow(0 0 4px var(--green));\n}\n.primary-banner.color-green .primary-name {\n  color: var(--green);\n}\n.primary-banner.color-green .primary-prob {\n  color: var(--green);\n}\n.primary-banner.color-orange {\n  background: var(--orange-bg);\n  border-color: var(--orange-border);\n  box-shadow: 0 0 18px rgba(255, 126, 61, 0.07);\n}\n.primary-banner.color-orange .primary-icon-wrap {\n  background: rgba(255, 126, 61, 0.12);\n}\n.primary-banner.color-orange .primary-icon-wrap mat-icon {\n  color: var(--orange);\n  filter: drop-shadow(0 0 4px var(--orange));\n}\n.primary-banner.color-orange .primary-name {\n  color: var(--orange);\n}\n.primary-banner.color-orange .primary-prob {\n  color: var(--orange);\n}\n.primary-banner.color-red {\n  background: var(--red-bg);\n  border-color: var(--red-border);\n  box-shadow: 0 0 18px rgba(255, 70, 85, 0.07);\n}\n.primary-banner.color-red .primary-icon-wrap {\n  background: rgba(255, 70, 85, 0.12);\n}\n.primary-banner.color-red .primary-icon-wrap mat-icon {\n  color: var(--red);\n  filter: drop-shadow(0 0 4px var(--red));\n}\n.primary-banner.color-red .primary-name {\n  color: var(--red);\n}\n.primary-banner.color-red .primary-prob {\n  color: var(--red);\n}\n.primary-banner.color-purple {\n  background: var(--violet-glow);\n  border-color: rgba(157, 111, 255, 0.28);\n  box-shadow: 0 0 18px rgba(157, 111, 255, 0.07);\n}\n.primary-banner.color-purple .primary-icon-wrap {\n  background: var(--violet-glow-md);\n}\n.primary-banner.color-purple .primary-icon-wrap mat-icon {\n  color: var(--violet);\n  filter: drop-shadow(0 0 4px var(--violet));\n}\n.primary-banner.color-purple .primary-name {\n  color: var(--violet);\n}\n.primary-banner.color-purple .primary-prob {\n  color: var(--violet);\n}\n.primary-banner.color-cyan {\n  background: var(--cyan-glow);\n  border-color: rgba(0, 212, 239, 0.28);\n  box-shadow: 0 0 18px rgba(0, 212, 239, 0.07);\n}\n.primary-banner.color-cyan .primary-icon-wrap {\n  background: var(--cyan-glow-md);\n}\n.primary-banner.color-cyan .primary-icon-wrap mat-icon {\n  color: var(--cyan);\n  filter: drop-shadow(0 0 4px var(--cyan));\n}\n.primary-banner.color-cyan .primary-name {\n  color: var(--cyan);\n}\n.primary-banner.color-cyan .primary-prob {\n  color: var(--cyan);\n}\n.primary-icon-wrap {\n  width: 46px;\n  height: 46px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.primary-icon-wrap mat-icon {\n  font-size: 22px;\n  width: 22px;\n  height: 22px;\n}\n.primary-text {\n  flex: 1;\n}\n.primary-text .primary-label {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.62rem;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  font-weight: 600;\n  color: var(--text-muted);\n}\n.primary-text .primary-name {\n  display: block;\n  font-family: var(--font-display);\n  font-size: 1.3rem;\n  font-weight: 800;\n  letter-spacing: -0.3px;\n  line-height: 1.1;\n  margin-top: 4px;\n}\n.primary-meta {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 6px;\n}\n.primary-meta .primary-prob {\n  font-family: var(--font-mono);\n  font-size: 1.5rem;\n  font-weight: 700;\n  letter-spacing: -1px;\n  line-height: 1;\n}\n.primary-meta .severity-badge {\n  font-family: var(--font-mono);\n  font-size: 0.6rem;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.primary-meta .severity-badge.sev-none {\n  background: var(--green-bg);\n  color: var(--green);\n  border: 1px solid var(--green-border);\n}\n.primary-meta .severity-badge.sev-low {\n  background: var(--cyan-glow);\n  color: var(--cyan);\n  border: 1px solid rgba(0, 212, 239, 0.2);\n}\n.primary-meta .severity-badge.sev-moderate {\n  background: var(--amber-bg);\n  color: var(--amber);\n  border: 1px solid var(--amber-border);\n}\n.primary-meta .severity-badge.sev-high {\n  background: var(--red-bg);\n  color: var(--red);\n  border: 1px solid var(--red-border);\n}\n.prob-section {\n  background: var(--bg-overlay);\n  border-radius: 12px;\n  border: 1px solid var(--border);\n  padding: 16px;\n}\n.prob-title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--font-mono);\n  font-size: 0.65rem;\n  font-weight: 600;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.9px;\n  margin-bottom: 16px;\n}\n.prob-title mat-icon {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  color: var(--violet);\n}\n.prob-list {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.prob-item {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n}\n.prob-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.prob-name {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.82rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n}\n.prob-name .prob-icon {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.prob-name .prob-icon.icon-green {\n  color: var(--green);\n}\n.prob-name .prob-icon.icon-orange {\n  color: var(--orange);\n}\n.prob-name .prob-icon.icon-red {\n  color: var(--red);\n}\n.prob-name .prob-icon.icon-purple {\n  color: var(--violet);\n}\n.prob-name .prob-icon.icon-cyan {\n  color: var(--cyan);\n}\n.prob-value {\n  font-family: var(--font-mono);\n  font-size: 0.82rem;\n  font-weight: 700;\n}\n.prob-value.color-text-green {\n  color: var(--green);\n}\n.prob-value.color-text-orange {\n  color: var(--orange);\n}\n.prob-value.color-text-red {\n  color: var(--red);\n}\n.prob-value.color-text-purple {\n  color: var(--violet);\n}\n.prob-value.color-text-cyan {\n  color: var(--cyan);\n}\n.prob-bar-track {\n  width: 100%;\n  height: 8px;\n  background: var(--bg-elevated);\n  border-radius: 4px;\n  overflow: hidden;\n}\n.prob-bar-fill {\n  height: 100%;\n  border-radius: 4px;\n  transition: width 1.4s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.prob-bar-fill.fill-green {\n  background:\n    linear-gradient(\n      90deg,\n      var(--green-dim),\n      var(--green));\n  box-shadow: 0 0 6px rgba(0, 229, 160, 0.5);\n}\n.prob-bar-fill.fill-orange {\n  background:\n    linear-gradient(\n      90deg,\n      #cc5500,\n      var(--orange));\n  box-shadow: 0 0 6px rgba(255, 126, 61, 0.5);\n}\n.prob-bar-fill.fill-red {\n  background:\n    linear-gradient(\n      90deg,\n      var(--red-dim),\n      var(--red));\n  box-shadow: 0 0 6px rgba(255, 70, 85, 0.5);\n}\n.prob-bar-fill.fill-purple {\n  background:\n    linear-gradient(\n      90deg,\n      var(--violet-dim),\n      var(--violet));\n  box-shadow: 0 0 6px rgba(157, 111, 255, 0.5);\n}\n.prob-bar-fill.fill-cyan {\n  background:\n    linear-gradient(\n      90deg,\n      var(--cyan-dim),\n      var(--cyan));\n  box-shadow: 0 0 6px rgba(0, 212, 239, 0.5);\n}\n.detail-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.detail-item {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px 14px;\n  background: var(--bg-overlay);\n  border-radius: 10px;\n  border: 1px solid var(--border);\n}\n.detail-item mat-icon {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--text-muted);\n  margin-top: 3px;\n  flex-shrink: 0;\n}\n.detail-item .detail-label {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.62rem;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  font-weight: 600;\n}\n.detail-item .detail-value {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-top: 3px;\n}\n.warning-note {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px 14px;\n  background: var(--amber-bg);\n  border: 1px solid var(--amber-border);\n  border-radius: 10px;\n  font-size: 0.78rem;\n  color: var(--text-secondary);\n  line-height: 1.5;\n}\n.warning-note mat-icon {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--amber);\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.warning-note strong {\n  color: var(--amber);\n  font-weight: 600;\n}\n.feedback-section {\n  border-top: 1px solid var(--border);\n  padding-top: 14px;\n  margin-top: 4px;\n}\n.feedback-trigger {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 11px 16px;\n  background: var(--bg-overlay);\n  border: 1px dashed var(--border-bright);\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 0.82rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  transition: all 0.2s ease;\n  text-align: left;\n}\n.feedback-trigger mat-icon {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--text-muted);\n  transition: color 0.2s;\n}\n.feedback-trigger .chevron {\n  margin-left: auto;\n  color: var(--text-muted);\n  transition: color 0.2s;\n}\n.feedback-trigger:hover,\n.feedback-trigger.active {\n  border-color: var(--violet-dim);\n  background: var(--violet-glow);\n  color: var(--violet);\n}\n.feedback-trigger:hover mat-icon,\n.feedback-trigger.active mat-icon {\n  color: var(--violet);\n}\n.feedback-trigger:hover .chevron,\n.feedback-trigger.active .chevron {\n  color: var(--violet);\n}\n.feedback-panel {\n  margin-top: 10px;\n  padding: 16px;\n  background: var(--bg-overlay);\n  border-radius: 10px;\n  border: 1px solid var(--border-bright);\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.feedback-question {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.feedback-question strong {\n  color: var(--violet);\n}\n.feedback-hint {\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  color: var(--text-muted);\n  margin-top: -6px;\n  letter-spacing: 0.3px;\n}\n.disease-checkboxes {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.disease-check {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px;\n  border: 1px solid var(--border-bright);\n  border-radius: 8px;\n  background: var(--bg-elevated);\n  font-size: 0.82rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-align: left;\n  width: 100%;\n}\n.disease-check mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: var(--text-muted);\n  flex-shrink: 0;\n  transition: color 0.2s;\n}\n.disease-check:hover:not(.disabled) {\n  border-color: rgba(157, 111, 255, 0.4);\n  background: var(--violet-glow);\n  color: var(--violet);\n}\n.disease-check:hover:not(.disabled) mat-icon {\n  color: var(--violet);\n}\n.disease-check.checked {\n  border-color: rgba(157, 111, 255, 0.5);\n  background: var(--violet-glow-md);\n  color: var(--violet);\n  font-weight: 600;\n}\n.disease-check.checked mat-icon {\n  color: var(--violet);\n}\n.disease-check.disabled {\n  opacity: 0.28;\n  cursor: not-allowed;\n  pointer-events: none;\n  filter: grayscale(0.5);\n}\n.exclusive-hint {\n  margin-left: auto;\n  font-family: var(--font-mono);\n  font-size: 0.58rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: #fff;\n  background: rgba(255, 255, 255, 0.12);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.btn-submit-feedback {\n  background: var(--violet) !important;\n  color: #fff !important;\n  font-weight: 700 !important;\n  align-self: flex-end;\n  padding: 8px 20px;\n  box-shadow: 0 0 14px var(--violet-glow-md);\n  transition: box-shadow 0.2s !important;\n}\n.btn-submit-feedback:hover {\n  box-shadow: 0 0 22px var(--violet-glow-str) !important;\n}\n.btn-submit-feedback[disabled] {\n  background: var(--bg-elevated) !important;\n  color: var(--text-muted) !important;\n  box-shadow: none !important;\n}\n.feedback-success {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 16px;\n  background: var(--green-bg);\n  border: 1px solid var(--green-border);\n  border-radius: 10px;\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--green);\n  margin-top: 4px;\n}\n.feedback-success mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: var(--green);\n  filter: drop-shadow(0 0 4px var(--green));\n}\n.empty-state {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 14px;\n  text-align: center;\n  padding: 48px 24px;\n}\n.empty-icon-wrap {\n  width: 78px;\n  height: 78px;\n  background: var(--bg-overlay);\n  border: 1px solid var(--border-bright);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.empty-icon-wrap mat-icon {\n  font-size: 34px;\n  width: 34px;\n  height: 34px;\n  color: var(--text-muted);\n}\n.empty-title {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.empty-sub {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  line-height: 1.7;\n}\n.empty-sub strong {\n  color: var(--violet);\n  font-weight: 600;\n}\n.error-state {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  text-align: center;\n  padding: 48px 24px;\n}\n.error-state .error-icon {\n  font-size: 42px;\n  width: 42px;\n  height: 42px;\n  color: var(--red);\n  opacity: 0.7;\n}\n.error-state .error-title {\n  font-family: var(--font-display);\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--red);\n}\n.error-state .error-msg {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  line-height: 1.6;\n  max-width: 300px;\n}\n@media (max-width: 900px) {\n  .tab-content {\n    padding: 20px 16px;\n  }\n  .panel-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=diagnostico.component.css.map */\n'] }]
  }], () => [{ type: AnalysisService }], { fileInputRef: [{
    type: ViewChild,
    args: ["fileInput"]
  }], changeInputRef: [{
    type: ViewChild,
    args: ["changeInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DiagnosticoComponent, { className: "DiagnosticoComponent", filePath: "src/app/components/diagnostico/diagnostico.component.ts", lineNumber: 51 });
})();

// src/app/components/shell/shell.component.ts
function ShellComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 17);
    \u0275\u0275text(1, "document_scanner");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Triagem ");
  }
}
function ShellComponent_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 17);
    \u0275\u0275text(1, "biotech");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Diagn\xF3stico ");
  }
}
var _ShellComponent = class _ShellComponent {
  constructor() {
    this.auth = inject(AuthService);
  }
  logout() {
    this.auth.logout();
  }
};
_ShellComponent.\u0275fac = function ShellComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ShellComponent)();
};
_ShellComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShellComponent, selectors: [["app-shell"]], decls: 40, vars: 3, consts: [[1, "app-shell"], [1, "app-header"], [1, "header-inner"], [1, "brand"], [1, "brand-icon-wrap"], [1, "brand-text"], [1, "header-right"], [1, "user-chip"], [1, "user-icon"], [1, "user-info"], [1, "user-nome"], [1, "user-role"], ["matTooltip", "Sair", 1, "logout-btn", 3, "click"], [1, "app-main"], ["animationDuration", "250ms", 1, "main-tabs", 3, "disableRipple"], ["mat-tab-label", ""], [1, "app-footer"], [1, "tab-icon"]], template: function ShellComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "mat-icon");
    \u0275\u0275text(6, "radiology");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 5)(8, "h1");
    \u0275\u0275text(9, "Sistema de Diagn\xF3stico por Raio-X");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "An\xE1lise de imagens m\xE9dicas com intelig\xEAncia artificial");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 6)(13, "div", 7)(14, "mat-icon", 8);
    \u0275\u0275text(15, "account_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 9)(17, "span", 10);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 11);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "button", 12);
    \u0275\u0275listener("click", function ShellComponent_Template_button_click_21_listener() {
      return ctx.logout();
    });
    \u0275\u0275elementStart(22, "mat-icon");
    \u0275\u0275text(23, "logout");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(24, "main", 13)(25, "mat-tab-group", 14)(26, "mat-tab");
    \u0275\u0275template(27, ShellComponent_ng_template_27_Template, 3, 0, "ng-template", 15);
    \u0275\u0275element(28, "app-triagem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "mat-tab");
    \u0275\u0275template(30, ShellComponent_ng_template_30_Template, 3, 0, "ng-template", 15);
    \u0275\u0275element(31, "app-diagnostico");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "footer", 16)(33, "mat-icon");
    \u0275\u0275text(34, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span");
    \u0275\u0275text(36, " Sistema de uso ");
    \u0275\u0275elementStart(37, "strong");
    \u0275\u0275text(38, "cl\xEDnico assistido por IA");
    \u0275\u0275elementEnd();
    \u0275\u0275text(39, " \u2014 consulte sempre um profissional m\xE9dico qualificado. ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_0_0;
    let tmp_1_0;
    \u0275\u0275advance(18);
    \u0275\u0275textInterpolate((tmp_0_0 = ctx.auth.currentUser()) == null ? null : tmp_0_0.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx.auth.currentUser()) == null ? null : tmp_1_0.role);
    \u0275\u0275advance(5);
    \u0275\u0275property("disableRipple", false);
  }
}, dependencies: [MatTabsModule, MatTabLabel, MatTab, MatTabGroup, MatIconModule, MatIcon, MatButtonModule, MatTooltipModule, MatTooltip, TriagemComponent, DiagnosticoComponent], styles: ['@charset "UTF-8";\n\n\n\n.app-shell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background: var(--bg-void);\n}\n.app-header[_ngcontent-%COMP%] {\n  background: var(--bg-surface);\n  border-bottom: 1px solid var(--border);\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}\n.app-header[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0%,\n      var(--cyan) 30%,\n      var(--violet) 70%,\n      transparent 100%);\n  opacity: 0.45;\n}\n.header-inner[_ngcontent-%COMP%] {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 16px 32px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  position: relative;\n}\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.brand-icon-wrap[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  background: var(--cyan-glow);\n  border: 1px solid rgba(0, 212, 239, 0.25);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.brand-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  width: 22px;\n  height: 22px;\n  color: var(--cyan);\n}\n.brand-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1.1;\n  letter-spacing: -0.2px;\n}\n.brand-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  color: var(--text-secondary);\n  margin-top: 4px;\n  letter-spacing: 0.4px;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.user-chip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: rgba(0, 212, 239, 0.05);\n  border: 1px solid rgba(0, 212, 239, 0.15);\n  border-radius: 20px;\n  padding: 6px 14px 6px 10px;\n}\n.user-chip[_ngcontent-%COMP%]   .user-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: var(--cyan);\n  flex-shrink: 0;\n}\n.user-chip[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.2;\n}\n.user-chip[_ngcontent-%COMP%]   .user-nome[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.user-chip[_ngcontent-%COMP%]   .user-role[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.62rem;\n  color: var(--cyan);\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.logout-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: 1px solid var(--border-bright);\n  border-radius: 8px;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition:\n    background 0.2s,\n    color 0.2s,\n    border-color 0.2s;\n}\n.logout-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 70, 85, 0.08);\n  border-color: rgba(255, 70, 85, 0.3);\n  color: var(--red);\n}\n.app-main[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.app-main[_ngcontent-%COMP%]   .main-tabs[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.app-main[_ngcontent-%COMP%]   .main-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-header {\n  background: var(--bg-surface);\n  border-bottom: 1px solid var(--border);\n}\n.app-main[_ngcontent-%COMP%]   .main-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-label-container {\n  max-width: 1344px;\n  margin: 0 auto;\n  padding: 0 32px;\n  box-sizing: border-box;\n}\n.app-main[_ngcontent-%COMP%]   .main-tabs[_ngcontent-%COMP%]     .mdc-tab {\n  padding: 0 24px;\n  min-width: 140px;\n}\n.app-main[_ngcontent-%COMP%]   .main-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body-wrapper {\n  flex: 1;\n}\n.app-main[_ngcontent-%COMP%]   .main-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-body-content {\n  height: 100%;\n}\n.tab-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.app-footer[_ngcontent-%COMP%] {\n  background: var(--bg-surface);\n  border-top: 1px solid var(--border);\n  padding: 10px 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  color: var(--text-muted);\n  letter-spacing: 0.3px;\n}\n.app-footer[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  color: var(--amber);\n  opacity: 0.8;\n}\n.app-footer[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .header-inner[_ngcontent-%COMP%] {\n    padding: 14px 20px;\n    flex-wrap: wrap;\n    gap: 10px;\n  }\n  .brand-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n  .user-info[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=shell.component.css.map */'] });
var ShellComponent = _ShellComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShellComponent, [{
    type: Component,
    args: [{ selector: "app-shell", standalone: true, imports: [MatTabsModule, MatIconModule, MatButtonModule, MatTooltipModule, TriagemComponent, DiagnosticoComponent], template: '<div class="app-shell">\n\n  <!-- \u2500\u2500 Header \u2500\u2500 -->\n  <header class="app-header">\n    <div class="header-inner">\n      <div class="brand">\n        <div class="brand-icon-wrap">\n          <mat-icon>radiology</mat-icon>\n        </div>\n        <div class="brand-text">\n          <h1>Sistema de Diagn\xF3stico por Raio-X</h1>\n          <p>An\xE1lise de imagens m\xE9dicas com intelig\xEAncia artificial</p>\n        </div>\n      </div>\n\n      <div class="header-right">\n        <div class="user-chip">\n          <mat-icon class="user-icon">account_circle</mat-icon>\n          <div class="user-info">\n            <span class="user-nome">{{ auth.currentUser()?.nome }}</span>\n            <span class="user-role">{{ auth.currentUser()?.role }}</span>\n          </div>\n        </div>\n        <button class="logout-btn" (click)="logout()" matTooltip="Sair">\n          <mat-icon>logout</mat-icon>\n        </button>\n      </div>\n    </div>\n  </header>\n\n  <!-- \u2500\u2500 Main \u2500\u2500 -->\n  <main class="app-main">\n    <mat-tab-group class="main-tabs" animationDuration="250ms" [disableRipple]="false">\n\n      <mat-tab>\n        <ng-template mat-tab-label>\n          <mat-icon class="tab-icon">document_scanner</mat-icon>\n          Triagem\n        </ng-template>\n        <app-triagem />\n      </mat-tab>\n\n      <mat-tab>\n        <ng-template mat-tab-label>\n          <mat-icon class="tab-icon">biotech</mat-icon>\n          Diagn\xF3stico\n        </ng-template>\n        <app-diagnostico />\n      </mat-tab>\n\n    </mat-tab-group>\n  </main>\n\n  <!-- \u2500\u2500 Footer \u2500\u2500 -->\n  <footer class="app-footer">\n    <mat-icon>info</mat-icon>\n    <span>\n      Sistema de uso <strong>cl\xEDnico assistido por IA</strong> \u2014 consulte sempre um profissional m\xE9dico qualificado.\n    </span>\n  </footer>\n\n</div>\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shell/shell.component.scss */\n.app-shell {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background: var(--bg-void);\n}\n.app-header {\n  background: var(--bg-surface);\n  border-bottom: 1px solid var(--border);\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}\n.app-header::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0%,\n      var(--cyan) 30%,\n      var(--violet) 70%,\n      transparent 100%);\n  opacity: 0.45;\n}\n.header-inner {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 16px 32px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  position: relative;\n}\n.brand {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.brand-icon-wrap {\n  width: 42px;\n  height: 42px;\n  background: var(--cyan-glow);\n  border: 1px solid rgba(0, 212, 239, 0.25);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.brand-icon-wrap mat-icon {\n  font-size: 22px;\n  width: 22px;\n  height: 22px;\n  color: var(--cyan);\n}\n.brand-text h1 {\n  font-family: var(--font-display);\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1.1;\n  letter-spacing: -0.2px;\n}\n.brand-text p {\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  color: var(--text-secondary);\n  margin-top: 4px;\n  letter-spacing: 0.4px;\n}\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.user-chip {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: rgba(0, 212, 239, 0.05);\n  border: 1px solid rgba(0, 212, 239, 0.15);\n  border-radius: 20px;\n  padding: 6px 14px 6px 10px;\n}\n.user-chip .user-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: var(--cyan);\n  flex-shrink: 0;\n}\n.user-chip .user-info {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.2;\n}\n.user-chip .user-nome {\n  font-family: var(--font-body);\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.user-chip .user-role {\n  font-family: var(--font-mono);\n  font-size: 0.62rem;\n  color: var(--cyan);\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.logout-btn {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: 1px solid var(--border-bright);\n  border-radius: 8px;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition:\n    background 0.2s,\n    color 0.2s,\n    border-color 0.2s;\n}\n.logout-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.logout-btn:hover {\n  background: rgba(255, 70, 85, 0.08);\n  border-color: rgba(255, 70, 85, 0.3);\n  color: var(--red);\n}\n.app-main {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.app-main .main-tabs {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.app-main .main-tabs ::ng-deep .mat-mdc-tab-header {\n  background: var(--bg-surface);\n  border-bottom: 1px solid var(--border);\n}\n.app-main .main-tabs ::ng-deep .mat-mdc-tab-label-container {\n  max-width: 1344px;\n  margin: 0 auto;\n  padding: 0 32px;\n  box-sizing: border-box;\n}\n.app-main .main-tabs ::ng-deep .mdc-tab {\n  padding: 0 24px;\n  min-width: 140px;\n}\n.app-main .main-tabs ::ng-deep .mat-mdc-tab-body-wrapper {\n  flex: 1;\n}\n.app-main .main-tabs ::ng-deep .mat-mdc-tab-body-content {\n  height: 100%;\n}\n.tab-icon {\n  margin-right: 8px;\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.app-footer {\n  background: var(--bg-surface);\n  border-top: 1px solid var(--border);\n  padding: 10px 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  color: var(--text-muted);\n  letter-spacing: 0.3px;\n}\n.app-footer mat-icon {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  color: var(--amber);\n  opacity: 0.8;\n}\n.app-footer strong {\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .header-inner {\n    padding: 14px 20px;\n    flex-wrap: wrap;\n    gap: 10px;\n  }\n  .brand-text h1 {\n    font-size: 0.95rem;\n  }\n  .user-info {\n    display: none;\n  }\n}\n/*# sourceMappingURL=shell.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShellComponent, { className: "ShellComponent", filePath: "src/app/components/shell/shell.component.ts", lineNumber: 17 });
})();
export {
  ShellComponent
};
/*! Bundled license information:

@angular/animations/fesm2022/animations.mjs:
  (**
   * @license Angular v20.3.25
   * (c) 2010-2025 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-JE55MBVL.js.map
