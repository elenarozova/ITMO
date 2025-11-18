package move.special;

import ru.ifmo.se.pokemon.Effect;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.SpecialMove;
import ru.ifmo.se.pokemon.Type;

public class Confusion extends SpecialMove {
    public Confusion(){
        super(Type.PSYCHIC,50,100);
    }
    @Override
    protected void applyOppEffects(Pokemon p){
        if (Math.random()<=0.1) {
            Effect.confuse(p);
        }
    }

    @Override
    protected String describe(){
        return "использует атаку Confusion - наносит урон и с вероятностью 10% может сбить цель с толку";
    }
}
