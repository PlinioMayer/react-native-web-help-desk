# About

This project came from the need to integrate the Zendesk help desk to an Expo app. There's no support to Expo or
React Native from Zendesk dev team and the native APIs they made couldn't be used unless we ejected the project.
Since we would like to keep the managed workflow, we thought of using the web API. It was of great help the gist
found in [https://gist.github.com/hetmann/bda29c335da8bb51f8e2e2d520edf3b6](https://gist.github.com/hetmann/bda29c335da8bb51f8e2e2d520edf3b6),
it was this project's main inspiration.

***

# Installing

You will need to install two peer dependencies in your project:

* react-native-safe-area-context: ^3.3.2
* react-native-webview: ^11.15.0

**Yarn:**

`yarn add react-native-safe-area-context@^3.3.2 react-native-webview@^11.15.0`

**Npm:**

`npm install --save react-native-safe-area-context@^3.3.2 react-native-webview@^11.15.0`

Then install this package.

**Yarn:**

`yarn add react-native-web-help-desk`

**Npm:**

`npm install --save react-native-web-help-desk`

***

# Getting started

The first thing you will need is a html page containing the cdn script for your help desk. This can be either a real
website, maybe an IP address like `https://171.68.22.118/help-desk`, or a html file accessible from the device filesystem.

**HTML example:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat</title>
    <script src="<url to load your help desk widget>"></script>

    <style>
        <!-- This will allow using the native activity indicator in the background of the webview -->
        body {
            background-color: transparent;
        }
    </style>

</head>
<body>
<script>
    <!-- If you need any extra code to be executed, you can try putting it here -->
</script>
</body>
</html>
```

## Importing from the filesystem (expo)

The easiest way to get a uri from a local file using expo is using
[expo-asset](https://docs.expo.dev/versions/latest/sdk/asset/). Let's say you created a `chat.html` file in the folder
`assets`, the you can get its uri this way:

```tsx
import React from 'react';
import {WebHelpDeskProvider} from 'react-native-web-help-desk';
import {Text, TouchableOpacity} from "react-native";

const WebHelpDeskInitializer: React.FC = ({children}) => {
    const webHelpDesk = useWebHelpDesk();
    const [assets] = useAssets(require('./assets/chat.html'));

    return (
        <SafeAreaView style={{flex: 1}}>
            {children}
            {webHelpDesk.ready &&
                <TouchableOpacity
                    onPress={() => webHelpDesk.open()}
                    style={{position: 'absolute', right: 20, bottom: 20, backgroundColor: 'blue'}}
                >
                    <Text>Open</Text>
                </TouchableOpacity>
            }
        </SafeAreaView>
    )
}

export default function App() {
    
    return (
        <WebHelpDeskProvider
            uri={assets ? assets[0].localUri! : ''}
            initScript="helpDesk.open();"
        >
            {children}
        </WebHelpDeskProvider>
    );
}
```

***

# Reference

**Don't panic**, I also hate when there is a package that seems really nice, but there's almost none documentation about
it, so this time you can relax and read all you need to know about this project in the
[wiki](https://github.com/PlinioMayer/react-native-web-help-desk/wiki).

***

# Contribute
This is a small project based on a gist. There's no "guide" for contributing and all help is welcome. Feel free to make
a pull request, open as many issues as you need (I'll do my best to answer) and even contact me at
[pctmayer@gmail.com](mailto:pctmayer@gmail.com).