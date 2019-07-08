import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import HomeScreen from "../HomeScreen"
import MessagesScreen from "../MessagesScreen";
import ProfileScreen from "../ProfileScreen";
import FavoriteScreen from "../FavoriteScreen";
import { Entypo } from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeScreen,
        Saved: FavoriteScreen,
        Profile: ProfileScreen,
        Messages: MessagesScreen,

    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;

                switch (routeName) {
                    case "Home":
                        iconName = "home";

                        break;
                    case "Messages":
                        iconName = "message";

                        break;
                    case "Profile":
                        iconName = "user";

                        break;
                    case "Saved":
                        iconName = "heart-outlined";
                        break;
                    default:
                        iconName = null;
                }

                return <Entypo name={iconName} size={25} color={tintColor} />;
            }
        }),
        tabBarOptions: {
            activeTintColor: "#FF5B5E",
            inactiveTintColor: "gray"
        }
    }
);

TabNavigator.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    let headerTitle;
    let headerStyle;
    let headerTitleStyle;
    let headerBackTitle;



    switch (routeName) {
        case "Home":

            headerTitle = "My AirBnB";
            headerStyle = { backgroundColor: "#FF5B5E" }
            headerTitleStyle = { color: "white", fontSize: 25, fontWeight: "300" };
            headerBackTitle = null;


            break;
        case "Settings":
            headerTitle = "Settings";
            headerStyle = { backgroundColor: "#FF5B5E" }
            headerTitleStyle = { color: "white", fontSize: 25, fontWeight: "300" }

            break;

        case "Profile":
            headerTitle = "My Profile";
            headerStyle = { backgroundColor: "#FF5B5E" }
            headerTitleStyle = { color: "white", fontSize: 25, fontWeight: "300" }

            break;

        case "Saved":
            headerTitle = "My Favorites";
            headerStyle = { backgroundColor: "#FF5B5E" }
            headerTitleStyle = { color: "white", fontSize: 25, fontWeight: "300" }

            break;
        default:
            headerTitle = routeName;
            headerStyle = { backgroundColor: "#FF5B5E" }
            headerTitleStyle = { color: "white", fontSize: 25, fontWeight: "300" }
    }

    return {
        headerTitle, headerStyle, headerTitleStyle, headerBackTitle
    };
};

export default TabNavigator;
