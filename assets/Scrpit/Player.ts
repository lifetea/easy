import { _decorator, Component, Node, Vec3, Input, RigidBody, RigidBody2D, v2, v3, tween, input, EventKeyboard, KeyCode, math, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import { leftTarget} from './Left'
import { rightTarget} from './Right'
import { jumpTarget} from './Jump'

@ccclass('Player')
export class Player extends Component {
    @property
    moveSpeed: number = 20

    playerPos:Vec3 = null
    rigidBody:RigidBody2D = null;
    accLeft:boolean=false;
    isJump:boolean = false;
    jumpSpeed:number = 20;
    accRight:boolean= false;
    onLoad() {
        this.rigidBody = this.node.getComponent(RigidBody2D)
        //键盘事件
        input.on(Input.EventType.KEY_DOWN, this.keyDown, this);
        input.on(Input.EventType.KEY_UP, this.keyUp, this);  
        rightTarget.on(Input.EventType.TOUCH_START, ()=>this.touchStart('right'), this);
        rightTarget.on(Input.EventType.TOUCH_END, ()=>this.touchEnd('right'), this);
        leftTarget.on(Input.EventType.TOUCH_START, ()=>this.touchStart('left'), this);
        leftTarget.on(Input.EventType.TOUCH_END, ()=>this.touchEnd('left'), this);
        jumpTarget.on(Input.EventType.TOUCH_START, ()=>this.touchStart('up'), this);
        // jumpTarget.on(Input.EventType.TOUCH_END, ()=>this.touchEnd('up'), this);
        
    }
    keyDown(event: EventKeyboard) {
        //按下键盘事件
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                this.accLeft = true
                break;
            case KeyCode.KEY_D:
                this.accRight = true
                break;
        }
    }

    keyUp(event: EventKeyboard) {
        //按下键盘事件
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                this.accLeft = false
                break;
            case KeyCode.KEY_D:
                this.accRight = false
                break;
        }

    }
    touchStart(direction:string){
        const that = this
        if(direction == 'left'){
            that.accLeft = true
        }
        if(direction == 'right'){
            that.accRight = true
        }
        if(direction == 'up' && that.isJump !=true){
            that.isJump = true
            that.scheduleOnce(function(){
                that.isJump = false
                that.jumpSpeed = 20
            }, 0.5)
        }
    }
    touchEnd(direction:string){
        if(direction == 'left'){
            this.accLeft = false
        }
        if(direction == 'right'){
            this.accRight = false
        }
    }
    start() {
        this.playerPos = this.node.position
    }

    jump(){
        // if(this.global.isGameOver || this.global.isPause){
        //     return
        // }
        let pos = this.node.position
        // // {position:v3(pos.x, pos.y+ 100)} , {easing:'linear'}
        // tween(this.node).to(0.4, {position:v3(pos.x + 200, pos.y+ 150)}, {easing:'sineOut'}).start();
        
        if(this.isJump){
            this.jumpSpeed -= 0.2
            console.log(this.jumpSpeed)
            this.node.setPosition(v3(pos.x, pos.y + this.jumpSpeed))
            this.rigidBody.linearVelocity = v2(0, -this.jumpSpeed)
        }else{
            this.rigidBody.linearVelocity = v2(0, -6)
        }
        
        // let force = new math.Vec2(100000, 1210200)
        // this.rigidBody.applyForceToCenter(force, false)
        this.rigidBody.gravityScale = 2
        // this.audio.playOneShot(this.wingClip, 1);
        // regid.linearVelocity.y = 0
        // console.log(this.node.position);

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
        this.rigidBody.linearVelocity = v2(0, -4)
        this.rigidBody.gravityScale = 1
        // this.node.setPosition(this.heroPos.x, this.heroPos.y, this.heroPos.z)
    }
    onDestroy() {
        //销毁键盘事件
        input.off(Input.EventType.KEY_DOWN, this.keyDown, this);
        input.off(Input.EventType.KEY_UP, this.keyUp, this);
    }
    update(deltaTime: number) {
        this.move()
        this.jump()
        
    }
}

