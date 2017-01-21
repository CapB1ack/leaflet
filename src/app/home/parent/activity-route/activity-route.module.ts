import { module } from 'angular';

import activityRouteComponent from './activity-route.component';

const activityRoute = module('activity-route', [])
    .component('activityRoute', activityRouteComponent)
    .run(($timeout, leafletData)=> {
        $timeout(()=> {
            leafletData.getMap().then((map) => {
                map.invalidateSize();
            });
        });
    })
    .name;

export default activityRoute;