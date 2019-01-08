import React, {
    Component
} from 'react';
import './index.scss';

class PageContent extends Component {
    render() {
        const {
            props
        } = this;

        return (
            <main className={`PageContent ${props.className || ''}`}>
                {this.props.children}
            </main>
        );
    }
}

export default PageContent;
