import { withInstall } from '../utils';
import _routeTransition from './RouteTransition';

export const RouteTransition = withInstall(_routeTransition);
export default RouteTransition;
export { routeTransitionProps } from './RouteTransition';
export type { RouteTransitionThemeVars } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    VanRouteTransition: typeof RouteTransition;
  }
}
