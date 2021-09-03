import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 2,
    borderRadius: 3,
    height: 40,
    fontSize: 15,
    paddingLeft: 80,
    paddingRight: 80,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 5,
    textAlign: "center",
  },

  buttonContainer: {
    // margin: 5,
  },
  inputContainer: {
    flexDirection: "row",
  },
  logo: {
    height: 300,
    width: 300,
  },
  button: {
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 3,
    color: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: "#669BBC",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  headerText: {
    fontSize: 45,
  },
});
