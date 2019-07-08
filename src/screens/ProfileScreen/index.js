import React from "react";
import { Alert, ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { Ionicons, Entypo } from '@expo/vector-icons';
import { AsyncStorage } from "react-native";

import List from "../../components/List"



class ProfileScreen extends React.Component {
    state = {

        profile: {},
        isLoading: true
    }

    logOut = () => {
        Alert.alert(
            "Log out", "Are you sure you want to log out?", [{ text: "Yes", onPress: () => this.logOutConfirmed() }, { text: "cancel", style: "cancel" }]
        )
    }

    logOutConfirmed = async () => {


        await AsyncStorage.removeItem("userToken")
        this.props.navigation.navigate('Login')

    }

    showRoom = (roomId) => {
        this.props.navigation.navigate({ routeName: "Room", params: roomId });
    }

    async componentDidMount() {
        userId = await AsyncStorage.getItem("userId")
        userToken = await AsyncStorage.getItem("userToken")
        const response = await axios.get(`https://airbnb-api.now.sh/api/user/${userId}`, { headers: { authorization: "Bearer " + userToken } })

        await this.setState({ profile: response.data, isLoading: false })
    }
    render() {
        if (this.state.isLoading) {
            return (<View>
                <ActivityIndicator />

            </View>)
        }
        return (<>

            <ScrollView contentContainerStyle={styles.container}>

                <TouchableOpacity style={styles.logOut} onPress={() => this.logOut()}><Ionicons name="ios-log-out" size={30} color="#006666" /></TouchableOpacity>
                <Image source={{ uri: this.state.profile.account.photos[0] }} style={styles.image} />
                <Text style={styles.name}>{this.state.profile.account.username}</Text>
                <Text style={styles.section}>About me</Text>
                <Text style={styles.description}>{this.state.profile.account.description}</Text>


                <Text style={styles.section}>My Rooms</Text>
                <View style={{ width: "100%" }}>
                    <List onPress={this.showRoom} rooms={this.state.profile.account.rooms} isLoading={this.state.isLoading} />
                </View>
                <Text style={styles.section}>Reviews</Text>


            </ScrollView>

        </>)

    }
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 150,
        borderRadius: 75,
        marginTop: 50
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        fontSize: 20
    },
    description: {
        fontSize: 18,
        textAlign: "justify",
        width: "90%",
        fontWeight: "100",
    },
    section: {
        fontSize: 20,
        alignSelf: "flex-start",
        padding: 20

    },
    logOut: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignSelf: "flex-end",
        marginTop: 25,
        marginRight: 20,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ProfileScreen