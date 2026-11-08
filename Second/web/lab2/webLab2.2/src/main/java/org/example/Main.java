package org.example;
import com.fastcgi.FCGIInterface;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {

        FCGIInterface fcgiInterface = new FCGIInterface();
        //System.out.println("Java-сервер FastCGI запущен и ждет запросов...");

        while (fcgiInterface.FCGIaccept()>=0){

            System.err.println("иду");
            try {
                long startTime = System.nanoTime();
                String queryString = System.getProperties().getProperty("QUERY_STRING");
                String jsonResponse;

                if (queryString != null && !queryString.isEmpty()) {
                    System.err.println("Java успешно поймала GET-данные: " + queryString);
                    boolean isValidate = false;
                    int x = 0;
                    double y = 0;
                    double z = 0;
                    int r = 0;
                    boolean hasX = false, hasY = false, hasR = false, hasZ = false;
                    try {
                        String[] body = queryString.split("&");
                        for (String pair : body) {
                            String[] keyValue = pair.split("=");
                            if (keyValue.length == 2) {
                                String key = keyValue[0];
                                String value = keyValue[1];

                                if (value.isEmpty()) {
                                    continue;
                                }
                                if (key.equals("x")) {
                                    x = Integer.parseInt(value);
                                    hasX= true;
                                } else if (key.equals("y")) {
                                    y = Double.parseDouble(value);
                                    hasY = true;
                                } else if (key.equals("z")) { // Парсим Z
                                    z = Double.parseDouble(value);
                                    hasZ = true;
                                } else if (key.equals("r")) {
                                    r = Integer.parseInt(value);
                                    hasR = true;
                                }
                            }

                        }
                        if (hasX && hasY && hasZ && hasR){
                            isValidate = validate(x,y,z,r);
                        }

                        boolean isHit= calculate(x,y,z,r);
                        long endTime = System.nanoTime();
                        double scriptTime = (endTime-startTime)/1000000.0;
                        String currentTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
                        if (isValidate){

                            jsonResponse = String.format(
                                    "{\"x\":%d,\"y\":%.4f,\"z\":%.4f,\"r\":%d,\"hit\":%b,\"currentTime\":\"%s\",\"scriptTime\":\"%.3f\"}",
                                    x, y, z, r, isHit, currentTime, scriptTime
                            );
                        }else {
                            jsonResponse = String.format(
                                    "{\"error\":\"Невалидные данные\",\"currentTime\":\"%s\",\"scriptTime\":\"%.3f\"}", currentTime, scriptTime
                            );
                        }
                        //System.out.print("HTTP/1.1 200 OK\r\n");
                        System.out.print("Content-Type: application/json; charset=UTF-8\r\n");
                        System.out.print("Content-Length: " + jsonResponse.getBytes(StandardCharsets.UTF_8).length + "\r\n");
                        System.out.print("\r\n");

                        System.out.print(jsonResponse + "\n");
                        System.out.flush();


                    } catch (Exception e) {
                        isValidate = false;
                        System.err.println("Пришла какая-то фигня");
                    }
                }
            } catch (Exception e) {
                System.err.println("ббебебебеб");
            }
        }

    }

    private static boolean calculate(int x, double y, double z, int r) {
        double rHalf = r / 2.0;

        if (z < -rHalf || z > rHalf) {
            return false;
        }

        if (x >= 0 && x <= r && y >= 0 && y <= rHalf) {
            return true;
        }

        if (x >= 0 && y <= 0 && (y >= x - rHalf)) {
            return true;
        }

        if (x <= 0 && y <= 0 && ((Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow(r, 2))) {
            return true;
        }

        return false;
    }

    private static boolean validate(int x, double y, double z, int r) {
        if (Arrays.asList(new Integer[]{-4, -3, -2, -1, 0, 1, 2, 3, 4}).contains(x)) {
            if (y >= -3 && y <= 3) {
                if (z >= -3 && z <= 3) { // Валидируем Z
                    return Arrays.asList(new Integer[]{1, 2, 3, 4, 5}).contains(r);
                }
            }
        }
        return false;
    }


}