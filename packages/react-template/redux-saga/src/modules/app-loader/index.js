import React, {
    Component
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createAppLoaderSelector } from '@redux/selectors/app-loader';
import './index.scss';

class AppLoader extends Component {
    state = {
        completed: 0,
    };

    componentDidMount() {
        this.timer = setInterval(this.progress, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        const {
            completed
        } = this.state;

        let progress = 0;
        if(completed !== 100) {
            const diff = Math.random() * 10;
            progress = Math.min(completed + diff, 100);
        }

        this.setState({
            completed: progress
        });
    };

    renderLoader() {
        return (
            <LinearProgress color="secondary"
                            variant="determinate"
                            value={this.state.completed}/>
        )
    }

    render() {
        const {
            appLoaderData
        } = this.props;

        const shouldRenderLoader = appLoaderData && appLoaderData.visible;

        return (
            <div className="AppLoader">
                {shouldRenderLoader ? this.renderLoader() : null}
            </div>
        );
    }
}

AppLoader.propTypes = {
    appLoaderData: PropTypes.object.isRequired
};

const mapStateToProps = () => {
    const selectAppLoaderData = createAppLoaderSelector();
    return state => ({
        appLoaderData: selectAppLoaderData(state)
    });
};

export default connect(mapStateToProps, {})(AppLoader);
