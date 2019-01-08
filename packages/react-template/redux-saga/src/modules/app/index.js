import React, {
    Component
} from 'react';
import StartPage from '../start-page';
import AppSnackbar from '../app-snackbar';

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
