import * as PropTypes from 'prop-types';
import React, {
    Component
} from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import connect from 'react-redux/es/connect/connect';
import {
    decrement,
    increment
} from '../redux/actions/counter';
import PageContent from '../page-content';
import PageHeader from '../page-header';
import PageRoot from '../page-root';
import { translate } from '../i18n';
import './index.scss';
import { createCurrentSelector } from '../redux/selectors/counter';

const translationContext = 'component.startPage';

class StartPage extends Component {
    render() {
        const {
            increment,
            decrement,
            current
        } = this.props;

        return (
            <PageRoot>
              <PageHeader title={translate(translationContext, 'headerTitle')}/>
                <PageContent className="StartPage">
                    <Paper className="StartPage-container"
                           elevation={1}>
                        <div className="StartPage-current">
                            {translate(translationContext, 'currentPlaceholder', { interpolation: { current } })}
                        </div>
                        <div className="StartPage-buttons">
                            <Button variant="outlined"
                                    size="small"
                                    onClick={decrement}>
                                {translate(translationContext, 'decrement')}
                            </Button>
                            <Button variant="outlined"
                                    size="small"
                                    onClick={increment}>
                                {translate(translationContext, 'increment')}
                            </Button>
                        </div>
                    </Paper>
                </PageContent>
            </PageRoot>
        );
    }
}

StartPage.propTypes = {
    current: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
};

const mapStateToProps = () => {
    const selectCurrent = createCurrentSelector();
    return state => ({
        current: selectCurrent(state)
    });
};

export default connect(mapStateToProps, {
    increment,
    decrement
})(StartPage);
