package pokemon;

import move.phisical.QuickAttack;
import move.phisical.Tackle;
import move.status.BabyDollEyes;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Type;

public class Eevee extends Pokemon {
    public Eevee(java.lang.String name, int level){
        super(name,level);
        setType(Type.NORMAL);
        setStats(55,55,50,45,65,55);
        setMove(new BabyDollEyes(), new QuickAttack(), new Tackle());
    }
}
