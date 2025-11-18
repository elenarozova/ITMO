package move.phisical;


import ru.ifmo.se.pokemon.*;

public class ShadowClaw extends PhysicalMove {
    public ShadowClaw(){
        super(Type.GHOST,70,100);
    }

    @Override
    protected double calcCriticalHit(Pokemon var1, Pokemon var2){
        if (var1.getStat(Stat.SPEED) / (double)(512.0F/3)> Math.random()) {
            System.out.println("Критический удар!");
            return (double)2.0F;
        } else {
            return (double)1.0F;
        }
    }

    @Override
    protected String describe(){
        return "использует атаку Shadow claw - Шанс критического удара на одну ступень выше обычного";
    }
}
