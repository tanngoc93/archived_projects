import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';  
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { signinUser } from '../../../../services/session/actions';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        email: '',
        password: ''
      }
    }
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return !this.props.fetching
      && this.state.credentials.email.length > 0
      && this.state.credentials.password.length >= 6;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signinUser(this.state.credentials);
  }

  render() {
    const { classes, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to='/' />;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant='headline'>Sign in</Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <br />
              <Typography color='error' align='center'>
                {this.props.message}
              </Typography>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='email'>Email Address</InputLabel>
                <Input 
                  name='email'
                  label='email'
                  value={this.state.credentials.email}
                  onChange={this.onChange} autoComplete='email' autoFocus
                 />
              </FormControl>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input
                  name='password'
                  label='password'
                  type='password'
                  value={this.state.credentials.password}
                  onChange={this.onChange}
                />
              </FormControl>
              <Button
                type='submit'
                fullWidth
                variant='raised'
                color='primary'
                className={classes.submit}
                disabled={!this.validateForm()}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { session } = state;
  const { fetching, isAuthenticated, message } = session;

  return {
  	message,
  	fetching,
  	isAuthenticated,
  }
}

const connectedSignIn = compose(
  withStyles(styles),
  connect(mapStateToProps, { signinUser })
)(SignIn);
export { connectedSignIn as SignIn };
