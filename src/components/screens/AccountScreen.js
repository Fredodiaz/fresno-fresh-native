// Native Imports
import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

// Icons
import { Ionicons } from '@expo/vector-icons'

const AccountScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Account Screen</Text>
            <Button onPress={() => navigation.navigate({routeName: 'CreatePost'})} title="Create a Post"/>
        </View>
    );
}

AccountScreen.navigationOptions = navData => {
    return {
        headerLeft: () => <Ionicons style={{marginLeft: 10}} size={34} color="black" name="ios-menu" onPress={()=>navData.navigation.openDrawer()}/>
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AccountScreen