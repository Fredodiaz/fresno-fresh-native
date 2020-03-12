// Native Imports
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const DirMessagesScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Direct Messages Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})

export default DirMessagesScreen