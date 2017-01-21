import { module } from 'angular';

import Child from './child/child.module';
import ChildOne from './child-one/child-one.module';
import ChildTwo from './child-two/child-two.module';
import ActivityRoute from './activity-route/activity-route.module';
import parentConfigure from './parent.config';

const Sample = module('parent', [Child, ChildOne, ChildTwo, ActivityRoute])
    .config(parentConfigure)
    .name;

export default Sample;