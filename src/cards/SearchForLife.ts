
import { IActionCard, IResourceCard } from "./ICard";
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { ResourceType } from "../ResourceType";
import { CardName } from "../CardName";
import { LogMessageType } from "../LogMessageType";
import { LogMessageData } from "../LogMessageData";
import { LogMessageDataType } from "../LogMessageDataType";

export class SearchForLife implements IActionCard, IProjectCard, IResourceCard {
    public cost: number = 3;
    public tags: Array<Tags> = [Tags.SCIENCE];
    public cardType: CardType = CardType.ACTIVE;
    public resourceType: ResourceType = ResourceType.SCIENCE;
    public resourceCount: number = 0;
    public name: CardName = CardName.SEARCH_FOR_LIFE;
    public canPlay(player: Player, game: Game): boolean { 
        return game.getOxygenLevel() <= 6 + player.getRequirementsBonus(game);
    }
    
    public getVictoryPoints() {
        if (this.resourceCount > 0) {
            return  3;
        }
        return 0;
    }
    public play() {     
        return undefined;
    }
    public canAct(player: Player): boolean {
        return player.canAfford(1);
    }
    public action(player: Player, game: Game) {
        const topCard = game.dealer.dealCard();
        if (topCard.tags.indexOf(Tags.MICROBES) !== -1) {
            this.resourceCount++; 
            game.log(
                LogMessageType.DEFAULT,
                "${0} found life!",
                new LogMessageData(LogMessageDataType.PLAYER, player.id)
            );
        }

        game.log(
            LogMessageType.DEFAULT,
            "${0} revealed and discarded ${1}",
            new LogMessageData(LogMessageDataType.PLAYER, player.id),
            new LogMessageData(LogMessageDataType.CARD, topCard.name)
        );
        
        game.dealer.discard(topCard);
        game.addSelectHowToPayInterrupt(player, 1, false, false, "Select how to pay for action");
        return undefined;
    }
}
