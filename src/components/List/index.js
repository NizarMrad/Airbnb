import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, StatusBar, ImageBackground } from "react-native";
import { Ionicons } from '@expo/vector-icons';



class List extends React.Component {




    render() {
        console.log(this.props.rooms)
        if (this.props.isLoading === true) {
            return (<View>
                <ActivityIndicator />

            </View>)

        } else if (this.props.isLoading === false) {

            return <View>
                <StatusBar barStyle="light-content" />

                <FlatList horizontal={this.props.horizontal ? true : false} data={this.props.rooms} keyExtractor={item => String(item._id)} renderItem={({ item }) => {

                    return (<TouchableOpacity style={styles.box} onPress={() => this.props.onPress(item._id)}>

                        <ImageBackground source={{ uri: item.photos[0] }} style={styles.image}>
                            <Text style={styles.price}>{item.price} € </Text>
                        </ImageBackground>

                        <View style={styles.rowWrapper}>
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1} style={styles.description}>{item.title}</Text>
                                <View style={styles.star}>
                                    <Ionicons name="md-star" color={item.ratingValue >= 1 ? "#ffcc00" : "grey"} size={25} />
                                    <Ionicons name="md-star" color={item.ratingValue >= 2 ? "#ffcc00" : "grey"} size={25} />
                                    <Ionicons name="md-star" color={item.ratingValue >= 3 ? "#ffcc00" : "grey"} size={25} />
                                    <Ionicons name="md-star" color={item.ratingValue >= 4 ? "#ffcc00" : "grey"} size={25} />
                                    <Ionicons name="md-star" color={item.ratingValue === 5 ? "#ffcc00" : "grey"} size={25} />
                                    <Text style={styles.review}> {item.reviews} Reviews</Text></View></View>
                            <Image source={{ uri: item.user.account ? item.user.account.photos[0] : "none" }} style={styles.profilePicture} />
                        </View></TouchableOpacity>)
                }} />

            </View>;

        }

    }
}

const styles = StyleSheet.create({

    box: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderStyle: "solid",
        borderBottomColor: "#bfbfbf",
        width: "90%",
        alignSelf: "center",
        paddingTop: 20,
        paddingBottom: 10
    },
    image: {
        height: 200,
        width: "100%",

    },

    description: {
        fontSize: 25
    },

    star: {
        flexDirection: "row",
        alignSelf: "flex-start",
        alignItems: "center",
    },
    profilePicture: {
        height: 70,
        width: 70,
        borderRadius: 35,
        flex: 1
    },
    rowWrapper: {
        flexDirection: "row",
        width: "100%",
        flex: 1,
        paddingTop: 10,

    },
    review: {
        color: "#bfbfbf",
        fontSize: 20
    },
    price: {
        fontSize: 30,
        color: "white",
        marginTop: 150,
        width: 90,
        padding: 5,
        backgroundColor: "black"
    }
})


export default List;