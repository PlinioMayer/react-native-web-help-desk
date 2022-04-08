import {ActivityIndicatorProps, ModalProps} from 'react-native';
import WebView, {WebViewProps} from 'react-native-webview';
import {Dispatch, MutableRefObject, SetStateAction} from 'react';

export type WebHelpDesk = {
    open: () => void;
    close: () => void;
    isOpened: boolean;
    injectJavaScript?: (script: string) => void;
    webViewLoaded: boolean;
    ready: boolean;
}

export type WebHelpDeskConfig = AbsoluteWebHelpDeskConfig | ModalWebHelpDeskConfig;

export type CommonWebHelpDeskConfig = {
    uri: string;
    activityIndicatorEnabled?: boolean;
    activityIndicatorProps?: ActivityIndicatorProps;
    webViewProps?: WebViewProps;
    initScript?: string;
}

export type AbsoluteWebHelpDeskConfig = CommonWebHelpDeskConfig & {
    useModal: false;
    openScript?: string;
    closeScript?: string;
}

export type ModalWebHelpDeskConfig = CommonWebHelpDeskConfig & {
    useModal?: true;
    modalProps?: ModalProps;
}

export type AbsoluteWebHelpDeskComponentProps = AbsoluteWebHelpDeskConfig & {
    webViewRef: MutableRefObject<WebView | null>,
    setWebHelpDeskContextValue: Dispatch<SetStateAction<WebHelpDesk>>
}

export type ModaleWebHelpDeskComponentProps = ModalWebHelpDeskConfig & {
    webViewRef: MutableRefObject<WebView | null>,
    setWebHelpDeskContextValue: Dispatch<SetStateAction<WebHelpDesk>>
}

export class WebHelpDeskError extends Error {}
