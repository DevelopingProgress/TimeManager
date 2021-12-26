import React from 'react';
import Chart from "../reusable/chart";
import {styles} from "../../home";
import {ScrollView} from "react-native";

const MonthAnalytics = () => {
    return (
        <ScrollView style={styles.mainContainer}>
            <Chart month/>
        </ScrollView>
    );
};

export default MonthAnalytics;
