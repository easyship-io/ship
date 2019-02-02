import React, {
    Component
} from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import {
    hideSnackbar,
    SNACKBAR_TYPES
} from '@redux/actions/app-snackbar';
import { createAppSnackbarDataSelector } from '@redux/selectors/app-snackbar';

const iconType = {
    success: CheckCircleIcon,
    error: ErrorIcon,
    warning: WarningIcon,
    info: InfoIcon
};

class AppSnackbar extends Component {
    handleClose = () => this.props.appSnackbarData.visible && this.props.hideSnackbar();

    render() {
        const {
            appSnackbarData
        } = this.props;

        const {
            type,
            visible,
            message,
            autoHideDuration
        } = Object.assign({
            type: SNACKBAR_TYPES.success
        }, appSnackbarData);

        const Icon = iconType[type];

        return (
            <Snackbar className="AppSnackbar"
                      open={visible}
                      anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                      }}
                      autoHideDuration={autoHideDuration}
                      onClose={this.handleClose}>
                <SnackbarContent className={ `AppSnackbar-${type}Content` }
                                 message={
                                     <span className="AppSnackbar-message">
                                         <Icon className="AppSnackbar-icon iconType" />
                                         {message}
                                     </span>
                                 }
                                 action={[
                                     <IconButton key="close"
                                                 aria-label="Close"
                                                 color="inherit"
                                                 onClick={this.handleClose}>
                                         <CloseIcon className="AppSnackbar-icon" />
                                     </IconButton>
                                 ]}/>
            </Snackbar>
        );
    }
}

AppSnackbar.propTypes = {
    appSnackbarData: PropTypes.object.isRequired
};

const mapStateToProps = () => {
    const selectAppSnackbarData = createAppSnackbarDataSelector();
    return state => ({
        appSnackbarData: selectAppSnackbarData(state)
    });
};

export default connect(mapStateToProps, {
    hideSnackbar
})(AppSnackbar);
