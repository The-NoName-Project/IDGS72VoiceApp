import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";
import Icon from "react-native-vector-icons/FontAwesome";

export default function HomeScreen({ navigation }) {
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);
  const [info, setInfo] = useState(null);
  // const [color, setColor] = useState(false);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = async () => {
    await Voice.start("es-MX");
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result) => {
    setResults(result.value);
    //guarda los resultados en el async storage
    const results = result.value;
    const data = JSON.stringify(results);
    AsyncStorage.setItem("results", data);
    console.warn(results);
  };

  const onSpeechError = (error) => {
    console.log(error);
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        marginTop: 20,
        alignContent: "center",
        alignSelf: "center",
      }}
    >
      {/* <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setColor(!color);
          }}
        >
          <Icon
            name={ "moon-o" : "sun-o"}
            size={30}
            color={color ? "black" : "white"}
            style={{
              alignSelf: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          />
        </TouchableOpacity>
      </View> */}
      <View style={styles.container}>
        <Text style={styles.title}>Busqueda por reconocimiento de Voz</Text>
        <StatusBar style="dark" backgroundColor={"#4169E1"} />
        <TouchableOpacity
          style={
            started //si esta activo el boton cambia a rojo
              ? styles.buttonStop
              : styles.button
          }
          onPress={started ? stopSpeechToText : startSpeechToText}
        >
          <Text style={styles.buttonText}>
            {started ? "Finalizar la Escucha" : "Pulsa para hablar"}
          </Text>
          <Text>{"  "}</Text>
          <Icon
            name={started ? "microphone-slash" : "microphone"}
            size={30}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.hr} />
        <Text style={styles.title}>Busqueda por escrito</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Escribe aquí"
          onChangeText={(text) => setInfo(text)}
          value={info}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (info === null) {
              navigation.navigate("ErrorScreen");
            } else {
              navigation.navigate("Resultados");
            }
          }}
        >
          <Text style={styles.buttonText}>Buscar</Text>
          <Icon name="search" size={30} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>Resultados de la busqueda por voz</Text>
          <Text style={styles.text}>
            {results.map((result, index) => {
              return `${result}`;
            })}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 20,
  },
  hrBlack: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 20,
  },
  scroll: {
    padding: 20,
    marginTop: 35,
    backgroundColor: "#fff",
  },
  scrollBlack: {
    padding: 20,
    marginTop: 35,
    backgroundColor: "#000",
  },
  contentContainer: {
    paddingTop: 30,
  },
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  containerData: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  cardTextName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardLabel: {
    fontSize: 17,
    fontWeight: "300",
    fontStyle: "italic",
  },
  cardBlack: {
    backgroundColor: "#000",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  title: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "bold",
    marginBottom: 30,
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  titleBlack: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "bold",
    marginBottom: 30,
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    color: "#fff",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    marginRight: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  textBlack: {
    fontSize: 18,
    marginBottom: 10,
    marginRight: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  button: {
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#4169E1",
  },
  buttonBlack: {
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#B8860B",
  },
  buttonStop: {
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "tomato",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 10,
    width: 30,
    height: 30,
    color: "#fff",
    alignContent: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  spinnerTextStyle: {
    color: "gray",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
