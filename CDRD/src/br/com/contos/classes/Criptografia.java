package br.com.contos.classes;

import java.security.MessageDigest;

public class Criptografia {
    
    public static String criptografaSenha(String senha){
        //salt
        senha += "C0n7osDi57aNte$";
        
        String senhaCriptografada = "";
        try{
            MessageDigest algorithim = MessageDigest.getInstance("MD5");
            byte messageDigest[] = algorithim.digest(senha.getBytes("UTF-8"));
            
            StringBuilder hexString = new StringBuilder();
            for (byte b : messageDigest) {
              hexString.append(String.format("%02X", 0xFF & b));
            }
            
            senhaCriptografada = hexString.toString();
            
        } catch (Exception e) {
                    e.printStackTrace();
            }
            return senhaCriptografada;
    }
   }
