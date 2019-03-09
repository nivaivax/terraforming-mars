
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { TileType } from "../TileType";
import { SelectSpace } from "../inputs/SelectSpace";
import { ISpace } from "../ISpace";

export class RestrictedArea implements IProjectCard {
    public cost: number = 11;
    public tags: Array<Tags> = [Tags.SCIENCE];
    public cardType: CardType = CardType.ACTIVE;
    public name: string = "Restricted Area";
    public actionText: string = "Spend 2 mega credit to draw a card";
    public text: string = "Place a special tile";
    public description: string = "A place to conduct secret research, preventing the wrong people from getting in. Or out";
    public play(player: Player, game: Game) {
        return new SelectSpace(this.name, "Select space for tile", game.getAvailableSpacesOnLand(player), (foundSpace: ISpace) => {
            game.addTile(player, foundSpace.spaceType, foundSpace, { tileType: TileType.SPECIAL });
            return undefined;
        });
    }
    public action(player: Player, game: Game) {
        if (player.megaCredits < 2) {
            throw "Must have 2 mega credits";
        }
        player.megaCredits -= 2;
        player.cardsInHand.push(game.dealer.getCards(1)[0]);
        return undefined;
    }
}