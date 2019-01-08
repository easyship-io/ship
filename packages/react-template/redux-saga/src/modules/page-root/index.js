import React, {
    Component
} from 'react';

class PageRoot extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default PageRoot;
