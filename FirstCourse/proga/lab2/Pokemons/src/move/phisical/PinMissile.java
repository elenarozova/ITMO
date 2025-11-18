package move.phisical;

import ru.ifmo.se.pokemon.PhysicalMove;
import ru.ifmo.se.pokemon.Type;

public class PinMissile extends PhysicalMove {
    public PinMissile(){
        super(Type.BUG,125,95,0,PinMissile.getHits());
    }

    private static int getHits() {
        double random = Math.random();
        if (random <= 3 / 8.0) {
            return 2;
        } else if (random <= 6 / 8.0) {
            return 3;
        } else if (random <= 7 / 8.0) {
            return 4;
        }
        return 5;
    }

    @Override
    protected String describe(){
        return "использует атаку Pin Missile";
    }
}
