import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import React from "react";

export default function ErrorScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Upps!, Al parecer no salio algo bien
          </Text>
        </View>
        <Image source={require("../images/bugs.png")} style={styles.image} />
        <View style={styles.body}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Al parecer nos ha sido imposible procesar su peticion, intente
              nuevamente
            </Text>
            <Text>{"     "}</Text>
            <Text style={styles.cardTitleError}>No hay datos 🚫 </Text>
          </View>
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
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 30,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "justify",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    width: "100%",
    padding: 20,
    alignSelf: "center",
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
    fontWeight: "bold",
    textAlign: "justify",
    marginHorizontal: 20,
  },
  cardTitleError: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    textAlign: "justify",
    marginHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 100,
  },
});
