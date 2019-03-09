
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SelectCard } from "../inputs/SelectCard";

export class Predators implements IProjectCard {
    public cost: number = 14;
    public tags: Array<Tags> = [Tags.ANIMAL];
    public name: string = "Predator";
    public cardType: CardType = CardType.ACTIVE;
    public animals: number = 0;
    public actionText: string = "Remove 1 animal from any card and add it to this card";
    public text: string = "Requires 11% oxygen. Gain 1 victory point per animal on this card.";
    public description: string = "Lions and tigers and bears, oh my.";
    public play(player: Player, game: Game) {
        if (game.getOxygenLevel() < 11) {
            throw "Requires 11% oxygen";
        }
        game.addGameEndListener(() => {
            player.victoryPoints += this.animals;
        });
        return undefined;
    }
    public action(_player: Player, game: Game) {
        const animalCards: Array<IProjectCard> = game.getPlayedCardsWithAnimals()
            .filter((card) => card.animals !== undefined && card.animals > 0);
        return new SelectCard(this.name, "Select card to remove animal from", animalCards, (foundCards: Array<IProjectCard>) => {
            const foundCard = foundCards[0];
            if (foundCard.animals === undefined) {
                throw "Card does not have animals";
            }
            if (foundCard.animals < 1) {
                throw "No animals to remove from card";
            }
            foundCard.animals--;
            this.animals++;
            return undefined;
        });
    }
}