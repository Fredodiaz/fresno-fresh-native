// Native Imports
import React from 'react'
import { Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'

// Logo
import logoMin from '../../../assets/logo-min.png'

const HomeScreen = ({navigation}) => {
    return (
        <ImageBackground style={styles.container} source={{uri: 'https://cdn.glitch.com/ede46f42-b5b9-48ad-8d72-f38482566cde%2Ffresno.png?v=1567219235354'}}>
            <Text style={styles.bottomText}>Food That Delivers.</Text>
            <TouchableOpacity onPress={() => alert('Logged in')} style={styles.button}>
                <Text style={styles.buttonText}>Login/Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate({routeName: 'Listings'})} style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

HomeScreen.navigationOptions = () => {
    return {
        headerRight: () => <Image style={styles.logoImg} source={logoMin}/>,
    }
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: '#68a9f5'
    },

    topText: {
        fontSize: 100,
        textAlign: 'center',
        color: 'white',
        marginBottom: 30,
    },

    bottomText: {
        fontSize: 60,
        textAlign: 'center',
        color: 'white',
        marginVertical: 80,
    },

    button: {
        padding: 9,
        width: '70%',
        backgroundColor: '#f0f0f0',
        marginVertical: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 5,
    },

    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 17
    },

    logoImg: {
        width: 75,
        height: 50,
        resizeMode: 'stretch',
        marginRight: 15,
    },
});

export default HomeScreen