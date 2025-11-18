package pokemon;

import move.special.Confusion;
import move.special.Rest;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Type;

public class Ralts extends Pokemon {
    public Ralts(java.lang.String name, int level){
        super(name,level);
        setType(Type.PSYCHIC,Type.FAIRY);
        setStats(28,25,25,45,35,40);
        setMove(new Confusion(),new Rest());
    }
}