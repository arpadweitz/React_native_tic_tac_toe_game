import { StyleSheet, Text, View, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";

export default function Home({ navigation }) {
  return (

    <View style={styles.container}>
      <Text style={{ fontSize: 35, fontWeight: "900", paddingBottom: 30 }}>TicTacToe</Text>
      <Image style={{ width: 90, height: 90, paddingTop: 20, paddingBottom: 40 }} source={require('./assets/welcomeicon.png')} />
      <TouchableOpacity onPress={() => navigation.navigate('Play')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Let's play</Text>
        </View>
      </TouchableOpacity>
      <Text style={{ fontSize: 50 }}> 𖠌 </Text>
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8dc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 30,
    marginTop: 30,
    width: 110,
    alignItems: 'center',
    backgroundColor: '#000',
    borderColor: 'yellow',
    borderWidth: 3,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: "500",
  },
});

