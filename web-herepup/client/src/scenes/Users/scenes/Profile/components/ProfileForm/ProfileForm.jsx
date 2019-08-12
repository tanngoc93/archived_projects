import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { updateProfile } from '../../../../services/actions';

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

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        phone_number: '',
      }
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userData !== this.props.userData ) {
      if (nextProps.userData) {
        this.setState({ user: nextProps.userData });
      }
    }
  }

  validateForm() {
    return this.state.user.first_name.length > 0
      && this.state.user.last_name.length > 0;
  }

  onChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateProfile(this.state.user);
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} onSubmit={this.handleSubmit} autoComplete='off'>
        <FormControl margin='normal' fullWidth>
          <InputLabel htmlFor='email'>Your email</InputLabel>
          <Input
            name='email'
            label='email'
            value={this.state.user.email}
            disabled
           />
        </FormControl>
        <FormControl margin='normal' fullWidth>
          <InputLabel htmlFor='username'>Your username</InputLabel>
          <Input
            name='username'
            label='username'
            value={this.state.user.username || ''}
            onChange={this.onChange}
           />
        </FormControl>
        <FormControl margin='normal' fullWidth>
          <InputLabel htmlFor='first_name'>Change your first name</InputLabel>
          <Input
            name='first_name'
            label='first_name'
            value={this.state.user.first_name || ''}
            onChange={this.onChange}
           />
        </FormControl>
        <FormControl margin='normal' fullWidth>
          <InputLabel htmlFor='last_name'>Change your last name</InputLabel>
          <Input
            name='last_name'
            label='last_name'
            value={this.state.user.last_name || ''}
            onChange={this.onChange}
           />
        </FormControl>
        <FormControl margin='normal' fullWidth>
          <InputLabel htmlFor='phone_number'>Change your phone number</InputLabel>
          <Input
            name='phone_number'
            label='phone_number'
            value={this.state.user.phone_number || ''}
            onChange={this.onChange}
           />
        </FormControl>
        <Divider />
        <Button
          size='large'
          type='submit'
          fullWidth
          variant='raised'
          color='primary'
          disabled={!this.validateForm()}
          className={classes.submit}
        >
          Update
        </Button>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const connectProfileForm = compose(
  withStyles(styles),
  connect(null, { updateProfile })
)(ProfileForm);
export { connectProfileForm as ProfileForm };