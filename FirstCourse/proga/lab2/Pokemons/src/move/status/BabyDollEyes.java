package move.status;

import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Stat;
import ru.ifmo.se.pokemon.StatusMove;
import ru.ifmo.se.pokemon.Type;

public class BabyDollEyes extends StatusMove {
    public BabyDollEyes(){
        super(Type.FAIRY,0,100,1,0);
    }

    @Override
    protected void applyOppEffects(Pokemon p){
        p.setMod(Stat.ATTACK,-1);
    }

    @Override
    protected String describe(){
        return "использует атаку Baby-Doll eyes - снижает атаку на одну ступень у противника, а также имет повышенный приоритет";
    }
}
