// Native Imports
import React from 'react'
import { Image } from 'react-native'

// React Navigation
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

// Screens
import HomeScreen from '../screens/HomeScreen'
import ListingsScreen from '../screens/ListingsScreen'
import AccountScreen from '../screens/AccountScreen'
import CreatePostScreen from '../screens/CreatePostScreen'
import MessagesScreen from '../screens/MessagesScreen'
import DirMessagesScreen from '../screens/DirMessagesScreen'
import FiltersScreen from '../screens/FiltersScreen'

// Assets
import logoMin from '../../../assets/logo-min.png'

// Navigation Options
export const navigationOptions = (title) => {
    return {
        headerTitle: title,
        headerStyle: {
            backgroundColor: '#2c6ab5',
        },
        headerTitleStyle: {
            color: 'white',
            fontSize: 26
        },
        headerRight: () => <Image source={logoMin} style={{ 
            width: 75, height: 50, resizeMode: 'stretch', marginRight: 15, 
         }} />,
    }
}

// Stack Navigation
const StackNavigation = createStackNavigator(
    {
        Home: HomeScreen,
        Listings: ListingsScreen,
        Account: AccountScreen,
        CreatePost: CreatePostScreen,
        Messages: MessagesScreen,
        DirectMessages: DirMessagesScreen,
        Filters: FiltersScreen,
    },
    {
        defaultNavigationOptions: navigationOptions('Fresno Fresh')
    }
)

// Drawer Navigation
const DrawerNavigation = createDrawerNavigator(
    {
        Home: {
            screen: StackNavigation,
            navigationOptions: () => {return {title: 'Fresno Fresh'}}
        },
        Listings: {
            screen: ListingsScreen,
            navigationOptions: () => {return {title: 'Listings'}}
        },
        Account: {
            screen: AccountScreen,
            navigationOptions: () => {return {title: 'My Account'}}
        },
        Messages: {
            screen: MessagesScreen,
            navigationOptions: () => {return {title: 'My Messages'}}
        },
        Filters: {
            screen: FiltersScreen,
            navigationOptions: () => {return {title: 'Filters'}}
        }
    },
    {
        contentOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            // inactiveTintColor: '#68a9f5',
            items: [],
            activeItemKey: 3
        },
        
        drawerWidth: '69%',
        drawerBackgroundColor: '#2c6ab5',
    },
)

export default createAppContainer(DrawerNavigation);