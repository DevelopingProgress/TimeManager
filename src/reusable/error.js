import React from 'react';

import AwesomeAlert from "react-native-awesome-alerts";
import {Colors} from "./tools";

const Error = (props) => {
    return (
        <AwesomeAlert
            show={props.showAlert}
            message={props.error}
            messageStyle={{color: Colors.red, fontSize: 18}}
            showProgress={false}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            onDismiss={props.handleDismiss}
        />
    );
};

export default Error;
