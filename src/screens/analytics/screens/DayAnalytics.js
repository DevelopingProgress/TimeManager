import React, {useRef} from 'react';
import Chart from "../reusable/chart";
import {ScrollView} from "react-native";
import {styles} from "../../home";
import {useFocusEffect} from "@react-navigation/core";

const DayAnalytics = ({navigation}) => {
    const scrollRef = useRef();

    useFocusEffect(
        React.useCallback(() => {
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            })
        })
    )

    return (
        <ScrollView style={styles.mainContainer} ref={scrollRef}>
            <Chart day navigation={navigation}/>
        </ScrollView>
    );
};

export default DayAnalytics;
