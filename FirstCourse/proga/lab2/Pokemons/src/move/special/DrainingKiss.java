package move.special;

import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.SpecialMove;
import ru.ifmo.se.pokemon.Stat;
import ru.ifmo.se.pokemon.Type;

public class DrainingKiss extends SpecialMove {
    public DrainingKiss(){
        super(Type.FAIRY,50,100);
    }
    @Override
    protected void applySelfEffects(Pokemon p){
        p.setMod(Stat.HP,-(int)(0.75 * (p.getStat(Stat.HP)-p.getHP())));
    }
    @Override
    protected String describe(){
        return "использует атаку Draining Kiss - наносит урон, а использующий его восстанавливает 75% потерянного HP";
    }
}
