package move.special;

import ru.ifmo.se.pokemon.Effect;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.SpecialMove;
import ru.ifmo.se.pokemon.Type;

public class Twister extends SpecialMove {
    public Twister(){
        super(Type.DRAGON,40,1.0);
    }
    @Override
    protected void applySelfEffects(Pokemon p){
        if (Math.random()<=0.2) {
            Effect.flinch(p);
        }
    }
    @Override
    protected String describe(){
        return "использует атаку Twister - Вызывает торнадо для атаки";
    }
}
