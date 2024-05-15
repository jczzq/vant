import { defineComponent, Transition } from 'vue';

import { createNamespace } from '../utils';

const [name, bem] = createNamespace('route-transition');
const isiOSDevice = !!navigator.userAgent.match(
  /\(i[^;]+;( U;)? CPU.+Mac OS X/,
); // iOS终端

// 全局注册一次
let registed = false;

export const routeTransitionProps = {
  levelKey: {
    type: String,
    default: 'level',
  },
  routerIn: {
    type: String,
    default: bem('left'), // 'van-route-transition__left'
  },
  routerOut: {
    type: String,
    default: bem('right'), // 'van-route-transition__right',
  },
  // 禁用过渡
  disable: Boolean,
  // iOS设备手指触摸滑动返回时禁用过渡效果
  iosTouchBackDisbleTransition: {
    type: Boolean,
    default: true,
  },
};

export default defineComponent({
  name,

  props: routeTransitionProps,

  data() {
    return {
      direction: '',
    };
  },
  created() {
    this.initRouterBeforeEach();
  },
  mounted() {
    // iOS设备兼容性处理：手指触摸滑动返回时禁用过渡效果
    if (isiOSDevice && this.iosTouchBackDisbleTransition) {
      if (!registed) {
        document.addEventListener('touchmove', this.onTouchStart);
        registed = true;
      }
    }
  },
  activated() {
    this.initRouterBeforeEach();
  },
  deactivated() {
    this.destroyRouterBeforeEach();
  },
  beforeUnmount() {
    this.destroyRouterBeforeEach();
    if (isiOSDevice && this.iosTouchBackDisbleTransition) {
      document.removeEventListener('touchmove', this.onTouchStart);
      registed = false;
    }
  },
  methods: {
    initRouterBeforeEach() {
      if (!this._routerBeforeEachRegisted) {
        this._routerBeforeEachRegisted = true;
        this._destroyRouterBeforeEach = this.$router.beforeEach(
          (to, from, next) => {
            if (this.disable || this._disableTransition) {
              this.direction = '';
              return next();
            }
            const fromRouteLevel = from.meta[this.levelKey];
            const toRouteLevel = to.meta[this.levelKey];
            // 初始化路由变化不触发过渡效果
            // 同级路由不触发过渡效果
            if (fromRouteLevel === void 0 || fromRouteLevel === toRouteLevel) {
              this.direction = '';
              return next();
            }

            this.direction =
              toRouteLevel > fromRouteLevel ? this.routerIn : this.routerOut;
            next();
          },
        );
      }
    },
    destroyRouterBeforeEach() {
      this._routerBeforeEachRegisted = false;
      this._destroyRouterBeforeEach && this._destroyRouterBeforeEach();
    },
    onTouchStart() {
      if (this._touchstart) return;
      // console.log('onTouchStart');
      this._touchstart = true; // 手指触摸
      this._disableTransition = true; // 禁用路由过渡效果

      document.addEventListener('touchend', this.onTouchEnd);
    },
    onTouchEnd() {
      // console.log('onTouchEnd');
      this._touchstart = false;
      document.removeEventListener('touchend', this.onTouchEnd);
      // 松开手指的350ms内禁用路由过渡效果
      setTimeout(() => {
        this._disableTransition = false;
      }, 350);
    },
  },
  render() {
    const { direction, $attrs, $slots } = this;
    return (
      <Transition {...$attrs} name={direction} css={!!direction}>
        {$slots.default?.()}
      </Transition>
    );
  },
});
