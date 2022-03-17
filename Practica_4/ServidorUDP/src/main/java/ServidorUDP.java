import java.io.*;
import java.net.*;

class ServidorUDP {
    public static void main(String[] args) {
        try {
            InetAddress ipADevolver = null;
            String uheErrorString = "No es un dominio valido, por favor vuelva a lanzar el cliente\n" +
                    "y asegurese de escribir un dominio valido" +
                    " Ej: www.google.com ";
            var socketUDP = new DatagramSocket(9876);
            var bufferRecepcion = new byte[1024];
            var bufferEmision = new byte[1024];
            System.out.println("Servidor esperando");
            while (true) {
                var paqueteRecepcion = new DatagramPacket(
                        bufferRecepcion, bufferRecepcion.length);
                socketUDP.receive(paqueteRecepcion);
                var IPCliente = paqueteRecepcion.getAddress();
                var PuertoCliente = paqueteRecepcion.getPort();
                var cadena = new String(paqueteRecepcion.getData());
                try {
                    ipADevolver = java.net.InetAddress.getByName(cadena);
                } catch (UnknownHostException u1) {
                    bufferEmision = uheErrorString.getBytes();
                    var paqueteEnvio = new DatagramPacket(
                            bufferEmision, bufferEmision.length,
                            IPCliente, PuertoCliente);
                    socketUDP.send(paqueteEnvio);
                }
                if (ipADevolver != null) {
                    var adress = ipADevolver.getHostAddress();
                    bufferEmision = adress.getBytes();
                    var paqueteEnvio = new DatagramPacket(
                            bufferEmision, bufferEmision.length,
                            IPCliente, PuertoCliente);
                    socketUDP.send(paqueteEnvio);
                }
            }
        } catch (IOException IO) {
            IO.printStackTrace();
        }
    }
}

