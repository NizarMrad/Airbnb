import React from "react";
import { StyleSheet, Text, View, ActivityIndicator, ImageBackground, ScrollView, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import { MapView } from "expo";

class RoomScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {

        return ({ headerStyle: { backgroundColor: "#FF5B5E" }, headerTitle: "Room", headerTitleStyle: { color: "white", fontSize: 25, fontWeight: "300" }, headerTintColor: "white" })
    }

    state = {
        room: {},
        isLoading: true,
        seeMore: false
    }

    async componentDidMount() {
        const response = await axios.get(`https://airbnb-api.now.sh/api/room/${this.props.navigation.state.params}`)
        await this.setState({ room: response.data, isLoading: false })
    }

    renderImageSwiper = () => {
        const image = [];

        for (let i = 0; i < this.state.room.photos.length; i++) {
            image.push(<ImageBackground key={i} index={i} source={{ uri: this.state.room.photos[i] }} style={styles.image} />)
        }

        return image;

    }

    renderPagination = (index, total) => {

        return (
            <View style={styles.paginationStyle}>
                <Text style={{ color: 'black' }}>
                    <Text style={styles.paginationText}>{index + 1}</Text>/{total}
                </Text>
            </View>
        )
    }



    render() {
        if (this.state.isLoading) {
            return (<View>
                <ActivityIndicator />

            </View>)
        }

        return (
            <ScrollView>

                <Swiper style={styles.wrapper} renderPagination={(index) => this.renderPagination(index, this.state.room.photos.length)}
                    loop={false}>{this.renderImageSwiper()}</Swiper>
                <View style={styles.column}>
                    <View style={styles.box}>
                        <View style={{ flex: 4 }}>
                            <Text numberOfLines={1} style={styles.description}>{this.state.room.title}</Text>
                            <View style={styles.star}>
                                <Ionicons name="md-star" color={this.state.room.ratingValue >= 1 ? "#ffcc00" : "grey"} size={25} />
                                <Ionicons name="md-star" color={this.state.room.ratingValue >= 2 ? "#ffcc00" : "grey"} size={25} />
                                <Ionicons name="md-star" color={this.state.room.ratingValue >= 3 ? "#ffcc00" : "grey"} size={25} />
                                <Ionicons name="md-star" color={this.state.room.ratingValue >= 4 ? "#ffcc00" : "grey"} size={25} />
                                <Ionicons name="md-star" color={this.state.room.ratingValue === 5 ? "#ffcc00" : "grey"} size={25} />
                                <Text style={styles.review}> {this.state.room.reviews} Reviews</Text></View></View>
                        <Image source={{ uri: this.state.room.user.account.photos[0] }} style={styles.profilePicture} />

                    </View>
                    <View ><Text numberOfLines={this.state.seeMore ? 100 : 3} style={styles.description}>{this.state.room.description}</Text><TouchableOpacity onPress={() => this.setState({ seeMore: this.state.seeMore ? false : true })}><Text style={{ color: "blue" }}>{this.state.seeMore ? "Hide" : "See more"}</Text></TouchableOpacity></View>
                    <MapView
                        initialRegion={{
                            latitude: this.state.room.loc[1],
                            longitude: this.state.room.loc[0],
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.009

                        }}
                        style={styles.map}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: this.state.room.loc[1],
                                longitude: this.state.room.loc[0],
                            }}

                        />
                    </MapView>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    },
    map: {
        height: 200,
        width: "100%",
        marginTop: 20
    },
    column: {
        flexDirection: "column",
        width: "90%",
        alignSelf: "center",

    },
    review: {
        color: "#bfbfbf",
        fontSize: 20
    },


    paginationStyle: {
        position: 'absolute',
        top: 220,
        right: 10
    },
    paginationText: {
        color: 'black',
        fontSize: 20
    },
    image: {
        height: 250,
        width: "100%",

    },

    description: {
        fontSize: 25,
        fontWeight: "200"
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
    wrapper: {
        padding: 0,
        height: 250
    },
});

export default RoomScreen;
