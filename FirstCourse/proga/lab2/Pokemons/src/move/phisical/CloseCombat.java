package move.phisical;

import ru.ifmo.se.pokemon.PhysicalMove;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Stat;
import ru.ifmo.se.pokemon.Type;

public class CloseCombat extends PhysicalMove {
    public CloseCombat(){
        super(Type.FIGHTING,120,100);
    }
    @Override
    protected void applySelfEffects(Pokemon p){
        p.setMod(Stat.DEFENSE,-1);
        p.setMod(Stat.SPECIAL_DEFENSE,-1);
    }
    @Override
    protected String describe(){
        return "использует атаку Close Combat - наносит урон, но снижает «Защиту» и «Специальную защиту» пользователя на одну ступень после атаки";
    }
}
