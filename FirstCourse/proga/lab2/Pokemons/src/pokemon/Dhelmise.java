package pokemon;

import move.phisical.ShadowClaw;
import move.special.Twister;
import move.status.CalMind;
import move.status.WorkUp;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Type;

public final class Dhelmise extends Pokemon {
    public Dhelmise(java.lang.String name, int level){
        super(name,level);
        setType(Type.GHOST,Type.GRASS);
        setStats(70,131,100,86,90,40);
        setMove(new WorkUp(), new Twister(),new CalMind(), new ShadowClaw());
    }
}

