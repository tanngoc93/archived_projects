import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ProfileForm } from './components/ProfileForm';
import { getProfile } from '../../services/actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100vh',
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Profile extends React.Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { classes, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <Redirect to='/' />;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={7} />
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <ProfileForm userData={this.props.userData} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { session, user } = state;
  const { isAuthenticated } = session;
  const { userData, message, fetching } = user;

  return {
    message,
    fetching,
    userData,
    isAuthenticated,
  }
}

const connectProfile = compose(
  withStyles(styles),
  connect(mapStateToProps, { getProfile })
)(Profile);
export { connectProfile as Profile };