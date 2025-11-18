package pokemon;

import move.phisical.PinMissile;
import ru.ifmo.se.pokemon.Type;

public final class Jolteon extends Eevee{
    public Jolteon(String name, int level) {
        super(name, level);
        setType(Type.ELECTRIC);
        setStats(65,65,60,110,95,130);
        addMove(new PinMissile());
    }
}
