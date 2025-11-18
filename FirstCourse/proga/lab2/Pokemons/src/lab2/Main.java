package lab2;


import pokemon.*;
import  ru.ifmo.se.pokemon.*;

public class Main {
    public static void main(String[] args) {
        Battle b = new Battle();

        Dhelmise dhelmise = new Dhelmise("Дхелмис",1);
        Eevee eevee = new Eevee("Иви",1);
        Jolteon jolteon = new Jolteon("Джолтеон",1);
        Ralts ralts = new Ralts("Ральтс",1);
        Kirlia kirlia = new Kirlia("Кирлия",1);
        Gallade gallade = new Gallade("Галлейд",1);

        // first team
        b.addAlly(dhelmise);
        b.addAlly(eevee);
        b.addAlly(jolteon);

        // second team
        b.addFoe(ralts);
        b.addFoe(kirlia);
        b.addFoe(gallade);

        b.go();
    }
}
