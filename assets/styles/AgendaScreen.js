import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollViewContent: {
      // flexGrow: 1,
      justifyContent: 'center',
    },
    contLT: {
      justifyContent: 'space-around',
      position: 'absolute',
      alignItems: 'center',
      flexDirection: 'row',
      top: '11%',
      width: '90%',
      padding: 10,
    },
    icon: {
      width: 61,
      height: 61,
      borderRadius: 35,
    },
    contName: {
      width: '70%',
    },
    name: {
      color: 'white',
      fontSize: 24,
    },
    contAgenda: {
      alignItems: 'center',
    },
    calendar: {
      width: width * 0.9,
      marginBottom: 20,
    },
    section: {
      width: width * 0.9,
      marginBottom: 20,
    },
    sectionTitle: {
      alignSelf: 'center',
      fontSize: 18,
      // fontWeight: 'bold',
      marginBottom: 10,
    },
    subTitle: {
      fontSize: 16,
      // fontWeight: 'bold',
      marginBottom: 10,
    },
    contHorarios: {
      marginBottom: 15,
    },
    timeSlotsContainer: {
      alignSelf: 'center',
    },
    timeSlot: {
      padding: 25,
      borderWidth: 0.5,
      borderColor: '#ccc',
      borderRadius: 5,
      marginRight: 15,
    },
    selectedTimeSlot: {
      // borderWidth: 3,
      backgroundColor: '#308CFF',
      borderColor: '#308CFF',
    },
    selectedTimeText: {
      color: 'white',
    },
    contCartaC: {
      alignItems: 'center',
      marginBottom: 15,
    },
    textCartaC: {
      textAlign: 'center',
      width: '60%',
    },
    contAviso: {
      flexDirection: 'row',
    },
    aviso: {
        marginTop: 10,
    },
    linkR: {
      textDecorationLine: 'underline',
      color: '#63A9FF',
    },
  
    //Estilos del modal
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 25,
      elevation: 5,
    },
    modalText: {
      textAlign: 'center',
      marginBottom: 15,
      fontSize: 20,
    },
    modalText2: {
      marginBottom: 20,
      fontSize: 16,
    },
    btnModal: {
      alignItems: 'flex-end',
    },
    buttonCloseM: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      width: '30%',
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  
    buttonContainer: {
      alignItems: 'center',
    },
    // contHorarios: {
    //   width: '100%',
    //   // borderWidth: 2, 
    //   // borderColor: 'blue',
    //   marginBottom: 10,
    // },
    // timeSlotsContainer: {
    //   alignSelf: 'center',
    //   // borderWidth: 2, 
    // },
    // timeSlot: {
    //   // width: '40%',
    //   padding: 10,
    //   borderWidth: 0.5,
    //   borderColor: '#ccc',
    //   borderRadius: 10,
    //   marginRight: 15,
    // },
});

export default styles;