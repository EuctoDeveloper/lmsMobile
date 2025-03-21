import { StyleSheet } from 'react-native';

export const Loginstyles = StyleSheet.create({
    sptext:{
      textAlign: 'center',
      marginBottom: 20,
    },
    text: {
      fontSize: 18,
      color: '#333',
      textAlign: 'left',
      marginBottom: 10,
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
    input: {
      height: 35,
      marginBottom: 10,
      paddingBottom: 5,
      borderWidth: 1,
      borderColor: '#c1c1c1',
    },
    button: {
      marginTop: 20,
      borderRadius: 10,
      backgroundColor: '#F18551'
    },
    loadingButton: {
      marginTop: 20,
      borderRadius: 10,
      backgroundColor: "#E6E6E6",
      color: "black",
    },
    container: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: '#FFFBF4',
        padding: 40,
    },
    image: {
        width: 300,
        height: 175,
        marginBottom: 20,
    },
    illusImage: {
        width: "100%",
        height: 140,
        marginBottom: 20,
        backgroundColor: '#FFFBF4',
    },
  });