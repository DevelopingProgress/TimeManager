import notifee from "@notifee/react-native";

async function onDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
            channelId,
            smallIcon: 'app_icon', // optional, defaults to 'ic_launcher'.
        },
    });
}

export default onDisplayNotification
