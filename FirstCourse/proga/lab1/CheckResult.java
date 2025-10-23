//Вариант 27771
public class CheckResult {
    public static void main(String[] args) {
        long[] w = {4,6,8,10,12,14,16};
        float[] x = new float[15];
        for (int i = 0; i < x.length; i++) {
            x[i] = (float)(Math.random()*17 - 2);
        }
        double[][] s = new double[7][15];
        for (int i = 0; i < 7; i++) {
            for (int j = 0; j < 15; j++) {
                if (w[i] == 8) {
                    s[i][j] = considerFirst(x[j]);
                } else if (w[i] == 4 || w[i] == 10 || w[i] == 14) {
                    s[i][j] = considerSecond(x[j]);
                } else {
                    s[i][j] = considerThird(x[j]);
                }
            }
        }
        printMassive(s);
    }
    public static double considerFirst(double x) {
       return  Math.atan(Math.pow(Math.pow((x + 6.5)/17,2),2));
    }
    public static double considerSecond(double x) {
        return Math.log(3/Math.acos((x + 6.5)/17));
    }
    public static double considerThird(double x) {
        double e1 = Math.exp(Math.cbrt(Math.pow(x,x*(1-x))));
        double e2 = Math.pow(e1,Math.cbrt(x));
        double e3 = Math.pow(e2,Math.pow(2.0/x, 3));
        return e3;
    }
    public static void printMassive(double[][] s) {
        for (int i = 0; i < 7; i++) {
            for (int j = 0; j < 15; j++) {
                System.out.printf("%12.4g", s[i][j]);
            }
            System.out.println("\t");
        }
    }
}

