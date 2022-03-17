import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

class ClienteUDP {

    public static void main(String[] args) {
        try {
            Scanner in = new Scanner(System.in);
            var socketUDP = new DatagramSocket();
            var bufferRecepcion = new byte[1024];
            var bufferEmision = new byte[1024];
            //input ip address from server to make a connection when requested from client
            var IPServidor = InetAddress.getByName("127.0.1.1");
            var PuertoServidor = 9876;
            System.out.println("Introduzca la direccion web de la que desea conocer su ip");
            var direccionIp = in.nextLine();
            bufferEmision = direccionIp.getBytes();
            var paqueteEnvio = new DatagramPacket(
                    bufferEmision, bufferEmision.length,
                    IPServidor, PuertoServidor);
            socketUDP.send(paqueteEnvio);
            var paqueteRecepcion = new DatagramPacket(
                    bufferRecepcion, bufferRecepcion.length);
            socketUDP.receive(paqueteRecepcion);
            /*Estabamos escribiendo muchos espacios en blanco al usar print
            por lo que hemos utilizado un constructor de String diferente para
            escribir en consola unicamente la direccion ip, y no todo el datagrampacket*/
            direccionIp = new String(paqueteRecepcion.getData(),
                    0, paqueteRecepcion.getLength(), StandardCharsets.UTF_8).trim();
            System.out.print(direccionIp+"\n");
            socketUDP.close();
        } catch (IOException IO) {
            IO.printStackTrace();
        }
    }
}
