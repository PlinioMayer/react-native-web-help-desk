import {WebHelpDesk, WebHelpDeskError} from './types';

export const WEB_HELP_DESK_INITIAL_VALUE: WebHelpDesk = {
    open: () => { throw new WebHelpDeskError('WebHelpDesk not initialized'); },
    close: () => { throw new WebHelpDeskError('WebHelpDesk not initialized'); },
    injectJavaScript: undefined,
    isOpened: false,
    ready: false,
    webViewLoaded: false,
};
