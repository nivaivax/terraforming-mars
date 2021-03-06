
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Resources } from '../Resources';
import { CardName } from '../CardName';

export class Satellites implements IProjectCard {
    public cost: number = 10;
    public cardType: CardType = CardType.AUTOMATED;
    public tags: Array<Tags> = [Tags.SPACE];
    public name: CardName = CardName.SATELLITES;

    public play(player: Player) {
        player.setProduction(Resources.MEGACREDITS, 1 + player.getTagCount(Tags.SPACE));
        return undefined;
    }
}
