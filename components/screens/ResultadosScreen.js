import { Text, View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";

//recibe la data desde home screen
export default function ResultadosScreen({ navigation }) {
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      let data = await AsyncStorage.getItem("data");
      data = JSON.parse(data);
      // console.log("info: ", data);
      if (data) {
        setData(data);
      }
    } catch (e) {
      console.log("error al obtener data", e);
    }
  };

  // const speakText = () => {
  //   const options = {
  //     language: "es-MX",
  //     pitch: 1,
  //     silenceLength: 0.5,
  //     silenceLengthEnd: 1,
  //   };

  //   const welcome = `los resultados son: ${data.map(
  //     (item) =>
  //       `Nombre: ${item.user_id.name} ${item.user_id.app} ${
  //         item.user_id.apm
  //       }, Estatus: ${
  //         item.user_id.status === 1 ? "Inactivo" : "Activo"
  //       }, Escuela: ${item.user_id.school_id.name}, Grado: ${
  //         item.user_id.level_id.name
  //       }`
  //   )}
  //   resultado final`;
  //   Speech.speak(welcome, options);
  // };

  useEffect(() => {
    getData();
    // speakText();
  }, []);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Resultados</Text>
        </View>
        <View style={styles.body}>
          {data.length === undefined ? (
            <View style={styles.card}>
              <Text style={styles.cardTitleError}>No hay datos 🚫 </Text>
            </View>
          ) : (
            <>
              <Text style={styles.cardTitle}>Los datos encontrados son: </Text>
              {data.map((item, index) => (
                <View style={styles.card} key={index}>
                  <Text style={styles.cardText}>
                    Nombre: {item.user_id.name} {item.user_id.app}{" "}
                    {item.user_id.apm}
                  </Text>
                  <Text style={styles.cardText}>
                    Estatus:
                    {item.user_id.status === 1 ? "Inactivo" : "Activo"}
                  </Text>
                  <Text style={styles.cardText}>
                    Escuela: {item.user_id.school_id.name}
                  </Text>
                  <Text style={styles.cardText}>
                    Grado: {item.user_id.level_id.name}
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
});
