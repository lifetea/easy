import { _decorator, Component, Node, Vec3, Input } from 'cc';
const { ccclass, property } = _decorator;

import { leftTarget} from './Left'
import { rightTarget} from './Right'

@ccclass('Player')
export class Player extends Component {
    @property
    moveSpeed: number = 2

    playerPos:Vec3 = null

    accLeft:boolean=false;
    accRight:boolean= false;
    onLoad() {
        rightTarget.on(Input.EventType.TOUCH_START, this.rightStart, this);
        rightTarget.on(Input.EventType.TOUCH_END, this.rightEnd, this);
        leftTarget.on(Input.EventType.TOUCH_START, this.leftStart, this);
        leftTarget.on(Input.EventType.TOUCH_END, this.leftEnd, this);
    }
    leftStart(){
        this.accLeft = true
    }
    leftEnd(){
        this.accLeft = false
    }
    rightStart(){
        this.accRight = true
    }
    rightEnd(){
        this.accRight = false
    }
    start() {
        this.playerPos = this.node.position
    }

    move() {
        if (this.accLeft) {
            this.playerPos.x -= this.moveSpeed
            this.node.setPosition(this.playerPos.x, this.playerPos.y, this.playerPos.z)
        }
        if(this.accRight){
            this.playerPos.x += this.moveSpeed
            this.node.setPosition(this.playerPos.x, this.playerPos.y, this.playerPos.z)
        }
        // this.node.setPosition(this.heroPos.x, this.heroPos.y, this.heroPos.z)
    }

    update(deltaTime: number) {
        this.move()
        
    }
}

