package move.status;

import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Stat;
import ru.ifmo.se.pokemon.StatusMove;
import ru.ifmo.se.pokemon.Type;

public class WorkUp extends StatusMove {
    public WorkUp(){
        super(Type.NORMAL,0,1.0);
    }
    @Override
    protected String describe(){
        return "использует атаку Work up - повышает Атаку и Спец. Атаку использующего на одну ступень каждую";
    }

    @Override
    protected void applySelfEffects(Pokemon p){
        p.setMod(Stat.ATTACK,+1);
        p.setMod(Stat.SPECIAL_ATTACK,+1);
    }

}
