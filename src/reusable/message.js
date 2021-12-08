import React from 'react';

import AwesomeAlert from "react-native-awesome-alerts";
import {Colors} from "./tools";

const Message = (props) => {
    return (
        <AwesomeAlert
            show={props.showAlert}
            message={props.message}
            messageStyle={{color: Colors.blue, fontSize: 18}}
            showProgress={false}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            onDismiss={props.handleDismiss}
        />
    );
};

export default Message;
