import React, {
    Component
} from 'react';
import StartPage from '@modules/start-page';
import { Snackbar } from '@markomatic/react-snackbar';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <StartPage />
                <Snackbar />
            </React.Fragment>
        );
    }
}

export default App;
