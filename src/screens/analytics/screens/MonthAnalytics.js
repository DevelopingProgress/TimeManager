import React, {useRef} from 'react';
import Chart from "../reusable/chart";
import {styles} from "../../home";
import {ScrollView} from "react-native";
import {useFocusEffect} from "@react-navigation/core";

const MonthAnalytics = ({navigation}) => {
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
            <Chart month navigation={navigation}/>
        </ScrollView>
    );
};

export default MonthAnalytics;
