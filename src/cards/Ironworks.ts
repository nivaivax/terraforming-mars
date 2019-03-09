
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class Ironworks implements IProjectCard {
    public cost: number = 11;
    public tags: Array<Tags> = [Tags.STEEL];
    public name: string = "Ironworks";
    public cardType: CardType = CardType.ACTIVE;
    public actionText: string = "Spend 4 energy to gain 1 steel and increase oxygen 1 step";
    public text: string = "";
    public description: string = "Electrolysis of Martian soil yields both iron and oxygen, making it an important part of terraforming.";
    public play(_player: Player, _game: Game) {
        return undefined;
    }
    public action(player: Player, game: Game) {
        if (player.energy < 4) {
            throw "Need 4 energy to spend";
        }
        player.energy -= 4;
        player.steel++;
        return game.increaseOxygenLevel(player, 1);
    }
}