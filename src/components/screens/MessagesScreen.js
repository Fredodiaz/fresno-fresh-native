// Native Imports
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

// Icons
import { Ionicons } from '@expo/vector-icons'

const MessagesScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Messages Screen</Text>
            <Button onPress={() => navigation.navigate({routeName: 'DirectMessages'})} title="Go To DM's" />
        </View>
    )
}

MessagesScreen.navigationOptions = navData => {
    return {
        headerLeft: () => <Ionicons style={{marginLeft: 10}} size={34} color="black" name="ios-menu" onPress={()=>navData.navigation.openDrawer()}/>
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})

export default MessagesScreen;