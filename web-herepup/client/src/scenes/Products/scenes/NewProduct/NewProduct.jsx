import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ProductForm } from './components/ProductForm';

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

class NewProduct extends React.Component {
  render() {
    const { classes, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <Redirect to='/' />;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <ProductForm />
            </Paper>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </div>
    );
  }
}

NewProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { session } = state;
  const { isAuthenticated } = session;

  return {
    isAuthenticated,
  }
}

const connectNewProduct = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(NewProduct);
export { connectNewProduct as NewProduct };