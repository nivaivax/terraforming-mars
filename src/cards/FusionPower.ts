
import {IProjectCard} from './IProjectCard';
import {Tags} from './Tags';
import {CardType} from './CardType';
import {Player} from '../Player';
import { Resources } from '../Resources';
import { CardName } from '../CardName';

export class FusionPower implements IProjectCard {
  public cost: number = 14;
  public tags: Array<Tags> = [Tags.SCIENCE, Tags.ENERGY, Tags.STEEL];
  public cardType: CardType = CardType.AUTOMATED;
  public name: CardName = CardName.FUSION_POWER;
  public canPlay(player: Player): boolean {
    return player.getTagCount(Tags.ENERGY) >= 2;
  }
  public play(player: Player) {
    player.setProduction(Resources.ENERGY,3);
    return undefined;
  }
}

