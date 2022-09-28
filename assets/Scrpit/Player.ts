import { _decorator, Component, Node, Vec3, Input, RigidBody, RigidBody2D, v2, v3, tween, input, EventKeyboard, KeyCode, math, Vec2, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

import { leftTarget} from './Left'
import { rightTarget} from './Right'
import { jumpTarget} from './Jump'

@ccclass('Player')
export class Player extends Component {
    @property
    moveSpeed: number = 4
    @property
    jumpSpeed:number = 20;
    @property
    jumpMax:number = 140;
    jumpHeight:number = 0;
    jumpDuring:number = 0;
    playerPos:Vec3 = null
    rigidBody:RigidBody2D = null;
    accLeft:boolean=false;
    accUp:boolean=false;
    isJump:boolean = false;

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

        //注册单个碰撞回调  
        let colliders = this.getComponents(Collider2D);
        colliders.map(d=>{
            d.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            d.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        })
        
    }

    
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // if(otherCollider.tag == 2 && selfCollider.tag == 8 && this.targetEnemy == null){
        //     // console.log("检测到敌人进入");
        //     // this.node.destroy();
        // }

        // if(otherCollider.tag == 2 && selfCollider.tag == 1){
        //     // console.log("收到到敌人攻击");
        //     // this.node.destroy();
        // }

        if(otherCollider.tag == 0){
            if(selfCollider.worldAABB.y > otherCollider.worldAABB.y){
                this.isJump = false
            }else{

            }
            // console.log(otherCollider.worldAABB.y)
            // console.log("碰到墙壁了");
            // this.node.destroy();
        }
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // if(otherCollider.tag == 2 && selfCollider.tag == 8 && this.targetEnemy && this.targetEnemy.uuid == otherCollider.node.uuid){
        //     // console.log("检测到敌人退出");
        //     // this.node.destroy();
        // }

        // if(otherCollider.tag == 0){
        //     // console.log("检测离开墙壁了");
        //     // this.node.destroy();
        // }
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
            case KeyCode.ARROW_UP:
                this.accUp = true
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
            case KeyCode.ARROW_UP:
                this.accUp = false
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
        if(direction == 'up' && that.accUp !=true && that.isJump !=true){
            that.accUp = true
            that.isJump = true
            that.scheduleOnce(function(){
                that.accUp = false
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

    jump(deltaTime: number){
        // if(this.global.isGameOver || this.global.isPause){
        //     return
        // }
        let pos = this.node.position
        // // {position:v3(pos.x, pos.y+ 100)} , {easing:'linear'}
        // tween(this.node).to(0.4, {position:v3(pos.x + 200, pos.y+ 150)}, {easing:'sineOut'}).start();
        
        if(this.accUp){
            this.jumpSpeed -= 0.8
            // console.log(this.jumpSpeed)
            this.jumpDuring += deltaTime
            this.node.setPosition(v3(pos.x, pos.y + this.jumpSpeed))
            // console.log(this.jumpDuring)
            // this.rigidBody.linearVelocity = v2(0, -this.jumpSpeed)
        }else{
            this.rigidBody.linearVelocity = v2(0, -10)
        }

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
        this.jump(deltaTime)
        
    }
}

