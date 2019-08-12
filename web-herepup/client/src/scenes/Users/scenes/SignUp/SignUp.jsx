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
import { signupUser } from '../../services/actions';

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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return !this.props.fetching
      && this.state.user.first_name.length > 0
      && this.state.user.last_name.length > 0
      && this.state.user.username.length > 0
      && this.state.user.email.length > 0
      && this.state.user.password.length >= 6
      && this.state.user.password_confirmation.length >= 6;
  }

  onChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signupUser(this.state.user);
  }

  render() {
    const { classes, isAuthenticated, message } = this.props;

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
            <Typography variant='headline'>Create your new account</Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <br />
              <Typography color='error' align='center'>
                { message }
              </Typography>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='first_name'>Enter your first name</InputLabel>
                <Input
                  name='first_name'
                  label='first_name'
                  value={this.state.user.first_name}
                  onChange={this.onChange} autoComplete='first_name' autoFocus
                 />
              </FormControl>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='last_name'>Enter your last name</InputLabel>
                <Input
                  name='last_name'
                  label='last_name'
                  value={this.state.user.last_name}
                  onChange={this.onChange} autoComplete='last_name'
                 />
              </FormControl>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='username'>Enter your username</InputLabel>
                <Input
                  name='username'
                  label='username'
                  value={this.state.user.username}
                  onChange={this.onChange}
                 />
              </FormControl>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='email'>Email Address</InputLabel>
                <Input
                  name='email'
                  label='email'
                  value={this.state.user.email}
                  onChange={this.onChange} autoComplete='email'
                 />
              </FormControl>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input
                  name='password'
                  label='password'
                  type='password'
                  value={this.state.user.password}
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='password_confirmation'>Password confirmation</InputLabel>
                <Input
                  name='password_confirmation'
                  label='password_confirmation'
                  type='password'
                  value={this.state.user.password_confirmation}
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
                Sign Up
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  message: PropTypes.string
}

function mapStateToProps(state) {
  const { session, user } = state;
  const { isAuthenticated } = session;
  const { fetching, message } = user;

  return {
    message,
    fetching,
    isAuthenticated,
  }
}

const connectedSignUP = compose(
  withStyles(styles),
  connect(mapStateToProps, { signupUser })
)(SignUp);
export { connectedSignUP as SignUp };
