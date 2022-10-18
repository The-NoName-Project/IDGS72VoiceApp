import { Text, View } from "react-native";

//recibe la data desde home screen
export default function ResultadosScreen({data}){
    //guarda los resultados en una variable
    let text = data.map((result, index) => {
        return result;
    });
    return (
        <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        </View>
    );
}