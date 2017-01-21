import { IComponentController, IComponentOptions } from 'angular';
import './child.component.scss';

class ChildController implements IComponentController {
    private zoomEnabled;
    private layerEnabled;
    private select;
    private data;

    constructor() {
        
        // пример данных с трекера
        this.data = require('./data.json');
        // интервал выбранного отрезка в timestamp (для примера взял значения сам)
        this.select = [1484134109000, 1484138072000];
        // отображать меню зума
        this.zoomEnabled = true;
        //отображать меню слоев
        this.layerEnabled = true;

    }


}

const childComponent: IComponentOptions = {

    controller: ChildController,
    template: require('./child.component.html') as string
};

export default childComponent;