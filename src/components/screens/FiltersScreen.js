// Native Imports
import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch, Button } from 'react-native'

// Icons
import { Ionicons } from '@expo/vector-icons'

const FiltersScreen = () => {
    const [ isGlutenFree, setIsGlutenFree ] = useState(false)
    const [ isLactoseFree, setIsLactoseFree ] = useState(false)
    const [ isVegan, setIsVegan ] = useState(false)
    const [ isVegetarian, setIsVegetarian ] = useState(false)

    const renderSwitch = (func, val) => {
        return (
            <Switch 
            trackColor={{true: '#2c6ab5'}}
            thumbColor={{true: '#2c6ab5'}}
            value={val}
            onValueChange={newVal => func(newVal)}
            />
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.alignedTitle}>Available Filters / Restricitons</Text>
            <View style={styles.filterContainer}>
                <Text style={styles.filterText}>Gluten-free</Text>
                {renderSwitch(setIsGlutenFree, isGlutenFree)}
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.filterText}>Lactose-free</Text>
                {renderSwitch(setIsLactoseFree, isLactoseFree)}
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.filterText}>Vegan</Text>
                {renderSwitch(setIsVegan, isVegan)}
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.filterText}>Vegetarian</Text>
                {renderSwitch(setIsVegetarian, isVegetarian)}
            </View>
            <View style={{marginTop: 30}}></View>
            <Button onPress={() => alert("Preferences Saved")} title="Save Filters"/>
        </View>
    )
}

FiltersScreen.navigationOptions = navData => {
    return {
        headerLeft: () => <Ionicons style={{marginLeft: 10}} size={34} color="black" name="ios-menu" onPress={()=>navData.navigation.openDrawer()}/>
    }
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    alignedTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 20,
    },
    filterContainer: {
        width: 270,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    filterText: {
        fontSize: 18,
    }
})

export default FiltersScreen