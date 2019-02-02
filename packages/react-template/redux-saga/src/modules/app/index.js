import React, {
    Component
} from 'react';
import StartPage from '@modules/start-page';
import AppSnackbar from '@modules/app-snackbar';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <StartPage />
                <AppSnackbar />
            </React.Fragment>
        );
    }
}

export default App;
