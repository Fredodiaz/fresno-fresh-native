// React Navigation
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// Screens
import HomeScreen from '../screens/HomeScreen'
import ListingsScreen from '../screens/ListingsScreen'

// Navigation Options
const navigationOptions = (title) => {
    return {
        headerTitle: title,
        headerStyle: {
            backgroundColor: '#2c6ab5',
            
        },
        headerTitleStyle: {
            color: 'white',
            fontSize: 26
        },
    }
}

// Stack Navigation
const StackNavigation = createStackNavigator(
    {
        Home: HomeScreen,
        Listings: ListingsScreen
    },
    {
        defaultNavigationOptions: navigationOptions('Fresno Fresh')
    }
)

export default createAppContainer(StackNavigation);