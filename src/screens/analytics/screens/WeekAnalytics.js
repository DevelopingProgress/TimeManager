import React from 'react';
import Chart from "../reusable/chart";
import {styles} from "../../home";
import {ScrollView} from "react-native";

const WeekAnalytics = () => {
    return (
        <ScrollView style={styles.mainContainer}>
            <Chart week/>
        </ScrollView>
    );
};

export default WeekAnalytics;
