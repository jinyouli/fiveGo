import { GobangBoard } from "./GobangBoard";
import { NONE, BLACK, WHITE } from "./GobangConstants";
import { GobangAI } from "./GobangAI";
import Alert2 = require('./Alert2');

const { ccclass, property } = cc._decorator;

@ccclass
export class GobangScene extends cc.Component {

    @property(GobangBoard)
    private board: GobangBoard = null;

    private ai: GobangAI = null;
    private state = NONE;

    @property({type:cc.AudioClip})
    public audio: cc.AudioClip = null;

    start() {
        this.board.init(this);
        this.ai = new GobangAI(this.board);
        this.startGame();
        cc.audioEngine.playEffect(this.audio, true);
    }

    startGame() {
        this.state = BLACK;
        this.board.reset();
        //this.showTip("你是黑棋你先走");
        
    }

    overGame() {
        if(this.state === BLACK) {
            cc.log("黑棋胜");
            Alert2.show("黑棋胜");
           
            this.state = NONE;
            // this.showMaskMessage("你赢了阿尔法二狗！",
            //     { label: "朕知道了", cb: () => { }, target: this });
        }else if(this.state === WHITE) {
            
            cc.log("白旗胜");
            Alert2.show("白棋胜");
            // this.showMaskMessage("你输给了阿尔法二狗！",
            // { label: "服了", cb: () => { }, target: this },
            // { label: "不服", cb: () => { }, target: this });
            this.state = NONE;
        }
    }

    onBtnReturn() {
        //G.returnHall();
    }

    onBtnRestart() {
        this.startGame();
    }

    onBoardTouched(coor: cc.Vec2) {
        switch (this.state) {
            case NONE:
            
            break;
            case BLACK:
                let piece = this.board.getPieceByCoor(coor);
                if (piece.color !== NONE) {
                    //G.gameRoot.showTip("这里有子了，你是不是傻");
                    return;
                }
                this.board.placeBlack(coor);
                if (this.board.judgeWin()) {
                    this.overGame();
                } else {
                    this.state = WHITE;
                    this.scheduleOnce(() => {
                        this.board.placeWhite(this.ai.getNextCoor());
                        if (this.board.judgeWin()) {
                            this.overGame();
                        } else {
                            this.state = BLACK;
                        }
                    }, 1);
                }
                break;
            case WHITE:
                // this.board.placeWhite(coor);
                // if(this.board.judgeWin()) {
                //     cc.log("白棋胜");
                // }else {
                //     this.state = BLACK;
                // }
                break;
            default: break;
        }
    }

}
