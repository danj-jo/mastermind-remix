import Player from "./player.ts";
import EasyGame from "../game-modes/easyGame.ts";
import MediumGame from "../game-modes/mediumGame.ts";
import HardGame from "../game-modes/hardGame.ts";
import SinglePlayerGameConfiguration from "./SinglePlayerGameConfiguration.ts";
export const gameFactory = (player: Player, difficulty: string): SinglePlayerGameConfiguration => {
    switch(difficulty){
        case 'easy':
            return new EasyGame(player)
        case 'medium':
            return new MediumGame(player)
        case 'hard':
            return new HardGame(player)
        default:
            return new EasyGame(player)
    }
}
/* since I made modifications to the game interface and was able to make better modifications to the inheritance model, I will use a factory method instead of a builder class.
I will default to an easy game just to eliminate the chances of returning undefined
*/
