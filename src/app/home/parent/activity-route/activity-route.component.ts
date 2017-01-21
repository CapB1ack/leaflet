import {IComponentController, IComponentOptions} from 'angular';

import './activity-route.scss';
import {any} from "angular-ui-router/commonjs/ng1";

class ActivityRouteController implements IComponentController {
    private data;
    private pureCoordinates;
    private geoCoordinates;
    private paths;
    private select;
    private leafletData;
    private selectCoordinates;
    private startTimeSt;
    private stopTimeSt;
    private layers;
    private layerEnabled;
    private defaults;
    private zoomEnabled;
    private markers;

    constructor(leafletData) {
        this.leafletData = leafletData;
        this.paths = {};
        this.pureCoordinates = [];
        this.geoCoordinates = [];
        this.selectCoordinates = [];
        this.layers = {};
        this.markers = {};

    }

    $onInit() {
        //если передан отрезок для выделения - запоминаю его начало и конец
        if (this.select.length) {
            [this.startTimeSt, this.stopTimeSt] = this.select;
        }
        // показывать или нет панель зума
        this.defaults = {
            zoomControl: this.zoomEnabled ? true : false
        };
        // маркеры для начальной и конечной точек маршрута
        this.markers.m1 = {
            lat: this.data[0][1],
            lng: this.data[0][14],
            message: "Начало маршрута",
            focus: false,
            icon: {
                iconUrl: 'assets/images/power-button.svg',
                iconSize:     [20, 20], // size of the icon
                iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
            }
        };
        this.markers.m2 = {
            lat: this.data[this.data.length-1][1],
            lng: this.data[this.data.length-1][14],
            message: "Конец маршрута",
            focus: false,
            icon: {
                iconUrl: 'assets/images/racing.svg',
                iconSize:     [20, 20], // size of the icon
                iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
            }
        };
        this.rawDataParser();
        this.buildPaths();
        this.buildTools();
        this.centerJSON();
    }

    rawDataParser() {
        // выбираю из массива даннных широту и долготу, формирую 2 массива по индексам:
        // pureCoordinates - [[широта, долгота], ...]
        // geoCoordinates - [{ "lat": долгота, "lng": широта }, ...]

        for (let currentPair of this.data) {
            let p = {lng: any, lat: any};
            p.lng = currentPair[14];
            p.lat = currentPair[1];
            this.geoCoordinates.push(p);
            this.pureCoordinates.push([currentPair[14], currentPair[1]]);
            if ((currentPair[6] >= this.startTimeSt) && (currentPair[6] <= this.stopTimeSt)) {
                this.selectCoordinates.push(p);
            }

        }
    }

    buildPaths() {
        // формирую основной маршрут для карты.
        this.paths.mainPath = {
            "color": "#f81a2b",
            "weight": 2,
            "latlngs": this.geoCoordinates,
            "message": "<h3>Основной маршрут</h3>"
        };

        // формирую выбранный отрезок на карте
        if (this.select.length) {
            console.log('building second route');
            this.paths.selectedPath = {
                "color": "#bb39db",
                "weight": 3,
                "latlngs": this.selectCoordinates,
                "message": "<h3>Выбранный маршрут</h3>"
            };
        }

    }

    centerJSON() {
        // центрирую карту по основному маршруту
        this.leafletData.getMap().then((map) => {
            let latlngs = [];
            for (let i in this.pureCoordinates) {
                latlngs.push(L.GeoJSON.coordsToLatLng(this.pureCoordinates[i]));
            }
            map.fitBounds(latlngs);
            map.invalidateSize();
        });
    };

    buildTools() {
        // контент меню слоев
        if (this.layerEnabled) {
            this.layers = {
                baselayers: {
                    xyz: {
                        name: 'OpenStreetMap (XYZ)',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        type: 'xyz'
                    }
                },
                overlays: {
                    wms: {
                        name: 'EEUU States (WMS)',
                        type: 'wms',
                        visible: true,
                        url: 'http://suite.opengeo.org/geoserver/usa/wms',
                        layerParams: {
                            layers: 'usa:states',
                            format: 'image/png',
                            transparent: true
                        }
                    }
                }
            };
        }

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