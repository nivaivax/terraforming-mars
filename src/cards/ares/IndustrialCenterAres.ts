import { CardName } from "../../CardName";
import { SpaceBonus } from "../../SpaceBonus";
import { IndustrialCenter } from "../IndustrialCenter";
import { IAdjacencyBonus } from "../../ares/AdjacencyBonus";

export class IndustrialCenterAres extends IndustrialCenter {
  public name: CardName = CardName.INDUSTRIAL_CENTER_ARES;
  public adjacencyBonus: IAdjacencyBonus = {bonus: [SpaceBonus.STEEL, SpaceBonus.STEEL]};
}