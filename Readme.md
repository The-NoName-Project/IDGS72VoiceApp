Para poder correr el proyecto necesitas generar el apk para poder tener la funcionalidad de la api del microfono, para esto debes seguir los siguientes pasos:

1. Instalar Android Studio
2. Tener los SDK de Android instalados correspondientes a la versión de tu celular
3. Instalar el NDK para generar la apk de forma correcta
4. Verificar si contamos con la utilidad de keytool para generar la llave de firma de la apk dicha utilidad se encuentra en la carpeta bin del jdk instalado
5. Generar la llave de firma con el siguiente comando:
   keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
6. Copiar la llave de firma en la carpeta android/app
7. Ejecutamos el comando para obtener un apk
   eas build -p android --profile development --local
