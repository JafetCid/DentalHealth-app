import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cont: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    alignContent: 'center',
  },
  stepContent: {
    
  },
  context: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
      fontSize: 20,
  },
  label:{
    fontSize: 16,
    marginHorizontal:5,
    marginTop:10
  },
  input: {
    height: 55,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F7F7F7',
    color: 'black',
  },
  // button: {
  //     paddingHorizontal: 2,
  //     marginHorizontal: -30,
  //     borderColor: 'red',
  //     borderWidth: 2,
  // },
});

export default styles;