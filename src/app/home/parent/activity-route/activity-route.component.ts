import {IComponentController, IComponentOptions} from 'angular';

import './activity-route.scss';
import ActivityRouteDataController from './activityRouteData.controller';

class ActivityRouteController implements IComponentController {
    private data;
    private select;
    private leafletData;
    private defaults;
    private zoomEnabled;
    private ModelData;

    constructor(leafletData) {
        this.leafletData = leafletData;
    }

    $onInit() {
        this.ModelData = new ActivityRouteDataController(this.data, this.select);
        // показывать или нет панель зума
        this.defaults = {
            zoomControl: this.zoomEnabled ? true : false
        };
        // центрирую карту по основному маршруту
        this.leafletData.getMap().then((map) => {
            map.fitBounds(this.ModelData.coordinates.map((elem) => L.GeoJSON.coordsToLatLng(elem.reverse())));
            map.invalidateSize();
        });
    }

}

const ActivityRouteComponent:IComponentOptions = {

    controller: ActivityRouteController,
    template: require('./activity-route.component.html') as string,
    bindings: {
        data: '<',
        select: '<',
        zoomEnabled: '<',
        layerEnabled: '<'
    }
};

export default ActivityRouteComponent;