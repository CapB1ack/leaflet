import {IComponentController, IComponentOptions} from 'angular';
import {MapOptions} from 'leaflet';
import './activity-route.scss';
import ActivityRouteDataController from './activityRouteData';

class ActivityRouteController implements IComponentController {
    private data;
    private select: Array<{start: number, end: number}>;
    private defaults: MapOptions ={};
    private zoomEnabled: boolean;
    private modelData;
    
    static $inject = ['leafletData'];
    constructor(private leafletData: any) {
        this.leafletData = leafletData;
    }

    $onInit() {
        this.modelData = new ActivityRouteDataController(this.data, this.select);
        // показывать или нет панель зума
        this.defaults.zoomControl = this.zoomEnabled;
        // центрирую карту по основному маршруту
        this.leafletData.getMap().then((map) => {
            map.fitBounds(this.modelData.coordinates.map((elem) => L.GeoJSON.coordsToLatLng(elem.reverse())));
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