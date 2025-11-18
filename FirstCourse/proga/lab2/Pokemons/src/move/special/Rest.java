package move.special;

import ru.ifmo.se.pokemon.*;

public class Rest extends StatusMove {
    public Rest() {
        super(Type.PSYCHIC,0,1.0);
    }
    @Override
    protected void applySelfEffects(Pokemon p){
        p.setMod(Stat.HP,-((int)p.getStat(Stat.HP)-(int)p.getHP()));
        Effect e= new Effect();
        e.condition(Status.SLEEP).turns(2);
    }
    @Override
    protected String describe(){
        return "использует атаку Rest - Покемон полностью вылечивает себя и засыпает на два хода";
    }
}
