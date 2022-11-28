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

  // console.warn(data);
  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("results");
  //     setData(jsonValue != null ? JSON.parse(jsonValue) : null);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // //si el async storage tiene datos, los guarda en la variable data
  // useEffect(() => {
  //   getData();
  //   //si data tiene datos ejecuta la funcion
  //   if (data) {
  //     sendToApi();
  //   }
  // }, []);

  // //manda los datos a la api
  // const sendToApi = async () => {
  //   try {
  //     const response = await fetch("https://duf23.systems/api/blogs/", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         data,
  //       }),
  //     });
  //     const json = await response.json();
  //     console.log(json);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  // useEffect(() => {
  //   getData();
  //   // speakText();
  // }, []);

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
              <Text style={styles.cardTitle}>Los datos encontrados son: </Text>
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
