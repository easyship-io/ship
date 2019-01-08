import React, {
    Component
} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../../assets/react-icon.png';
import PropTypes from 'prop-types';
import AppLoader from '../app-loader';
import './index.scss';

class PageHeader extends Component {
    render() {
        const { title } = this.props;

        return (
            <AppBar position="static"
                    className="PageHeader">
                <Toolbar variant="dense">
                    <div className="PageHeader-left">
                        <img src={logo}
                             className="PageHeader-logo"
                             alt="logo"/>
                        <Typography variant="h6"
                                    color="inherit"
                                    noWrap
                                    className="PageHeader-title">
                            {title}
                        </Typography>
                    </div>
                    <div className="PageHeader-right">
                        <span>Test Right</span>
                    </div>
                </Toolbar>
                <AppLoader />
            </AppBar>
        );
    }
}

PageHeader.propTypes = {
    title: PropTypes.string
};

export default PageHeader;
