import { _decorator, Component, Node, Input, EventTouch, EventTarget } from 'cc';
const { ccclass, property } = _decorator;

  /**
 * 全局事件监听实例
 */
export const jumpTarget:EventTarget = new EventTarget();

@ccclass('Jump')
export class Jump extends Component {
    start() {

    }
    onLoad() {
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        // this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onTouchStart(event: EventTouch) {
        // instance.emit(SystemEventType.TOUCH_START, event);
    
        // const location = event.getUILocation();
        // const touchPos = event.getUILocation()
    
        // this.stickPos = this.ring.getWorldPosition();
        // // 相对中心的向量
        // const moveVec = touchPos.subtract(new Vec2(this.stickPos.x, this.stickPos.y));
        // // 触摸点与圆圈中心的距离
        // const distance = moveVec.length();
  
        // // 手指在圆圈内触摸,控杆跟随触摸点
        // if (this.radius > distance) {
        //   this.dot.setPosition(moveVec.x, moveVec.y);
        // }
        jumpTarget.emit(Input.EventType.TOUCH_START, {
            //   speedType: SpeedType.STOP,
        });
    }

    onTouchEnd() {

        // this.dot.setPosition(new Vec3());
        // // if (this.joystickType === JoystickType.FOLLOW) {
        // //   this.node.getComponent(UIOpacity)!.opacity = 0;
        // // }
    
        jumpTarget.emit(Input.EventType.TOUCH_END, {
        //   speedType: SpeedType.STOP,
        });
    }

    update(deltaTime: number) {
        
    }
}

