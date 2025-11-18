package move.status;

import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Stat;
import ru.ifmo.se.pokemon.StatusMove;
import ru.ifmo.se.pokemon.Type;

public class CalMind extends StatusMove {
    public CalMind(){
        super(Type.PSYCHIC,0,1.0);
    }
    @Override
    protected void applySelfEffects(Pokemon p){
        p.setMod(Stat.SPECIAL_ATTACK,+1);
        p.setMod(Stat.SPECIAL_DEFENSE,+1);
    }

    @Override
    protected String describe(){
        return "использует атаку Calm Mind - Повышает свою Спец. Атаку и Спец. Защиту на одну ступень каждую";
    }
}
