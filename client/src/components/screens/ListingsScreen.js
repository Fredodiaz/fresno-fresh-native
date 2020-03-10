// Native Imports
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ListingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Listings Screen</Text>
        </View>
    );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListingsScreen