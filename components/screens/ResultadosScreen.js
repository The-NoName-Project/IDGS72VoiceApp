import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";

//recibe la data desde home screen
export default function ResultadosScreen({}) {
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("apiData");
      // console.warn(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  const createdAtFormatted = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    return `${month}`;
  };

  const speakText = () => {
    const options = {
      language: "es-MX",
      pitch: 1,
      silenceLength: 0.5,
      silenceLengthEnd: 1,
    };

    //si data es diferente de undefined entonces habla
    if (data.length !== undefined) {
      const welcome = `los resultados son: ${data.map(
        (item) =>
          `#${item.number}, Nombre del Caso: ${item.name}, Descripcion: ${item.description}
        `
      )}`;
      Speech.speak(welcome, options);
    }
  };

  useEffect(() => {
    // getData();
    speakText();
  }, []);

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor={"#4169E1"} />
      <View style={styles.container}>
        <View style={styles.body}>
          {data.length === undefined ? (
            <View style={styles.card}>
              <Text style={styles.cardTitleError}>No hay datos 🚫 </Text>
            </View>
          ) : (
            <>
              <Text style={styles.cardTitle}>
                Los resultados encontrados son:{" "}
              </Text>
              {data.map((item, index) => (
                <View style={styles.card} key={index}>
                  <Text style={styles.cardNumber}>
                    Numero de control: # {item.number}
                  </Text>
                  <Text style={styles.cardName}>Problema: {item.name}</Text>
                  <Text style={styles.cardDescription}>
                    Descripción: {item.description}
                  </Text>
                  <Text style={styles.cardCreatedAt}>
                    Fecha de creación: {createdAtFormatted(item.created_at)}
                  </Text>
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    marginTop: 33,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    width: Dimensions.get("window").width - 80,
    //varea dependiendo el tamano del contenido
    height: "auto",
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
  cardTitle: {
    fontSize: 20,
    color: "#000",
  },
  cardTitleError: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
  },
  cardText: {
    fontSize: 18,
    color: "#000",
  },
  cardNumber: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  cardName: {
    fontSize: 20,
    color: "#000",
  },
  cardDescription: {
    fontSize: 16,
    color: "#000",
    textAlign: "justify",
  },
  cardCreatedAt: {
    fontSize: 16,
    fontWeight: "italic",
  },
});
