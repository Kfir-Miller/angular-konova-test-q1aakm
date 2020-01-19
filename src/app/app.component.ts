import { Component, OnInit, ViewChild  } from '@angular/core';
import { Observable, of } from 'rxjs'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { KonvaComponent } from 'ng2-konva';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  implements OnInit {
  @ViewChild('stage') stage: KonvaComponent;
  @ViewChild('layer') layer: KonvaComponent;
  @ViewChild('dragLayer') dragLayer: KonvaComponent;
 
  public width = window.innerWidth;
  public height = window.innerHeight;
  public list: Array<any> = [];
 
  public configStage: Observable<any> = of({
    width: this.width,
    height: this.height
  });
 
  public handleDragstart(ngComponent: KonvaComponent) {
    const shape = ngComponent.getStage();
    const dragLayer = this.dragLayer.getStage();
    const stage = this.stage.getStage();
 
    // moving to another layer will improve dragging performance
    shape.moveTo(dragLayer);
    stage.draw();
 
    ngComponent.config.next({
      shadowOffsetX: 15,
      shadowOffsetY: 15,
      scaleX: ngComponent.getConfig().startScale * 1.2,
      scaleY: ngComponent.getConfig().startScale * 1.2,
    });
  }
 
  public handleDragend(ngComponent: KonvaComponent) {
    const shape = this.getStage();
    const layer = this.layer.getStage();
    const stage = this.stage.getStage();
 
    shape.moveTo(layer);
    stage.draw();
 
    shape.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: ngComponent.getConfig().startScale,
      scaleY: ngComponent.getConfig().startScale,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  }
 
  public ngOnInit() {
    for (let n = 0; n < 30; n++) {
      const scale = Math.random();
      this.list.push(
        new BehaviorSubject({
          x: Math.random() * 800,
          y: Math.random() * 200,
          rotation: Math.random() * 180,
          numPoints: 5,
          innerRadius: 30,
          outerRadius: 50,
          fill: '#89b717',
          opacity: 0.8,
          draggable: true,
          scaleX: scale,
          scaleY: scale,
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffsetX: 5,
          shadowOffsetY: 5,
          shadowOpacity: 0.6,
          startScale: scale
        })
      );
    }
  }
}