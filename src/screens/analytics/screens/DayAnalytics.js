import React from 'react';
import Chart from "../reusable/chart";
import {ScrollView} from "react-native";
import {styles} from "../../home";

const DayAnalytics = () => {
    return (
        <ScrollView style={styles.mainContainer}>
            <Chart day/>
        </ScrollView>
    );
};

export default DayAnalytics;
