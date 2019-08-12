import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { newProduct } from '../../../../services/actions';

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

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],

      product: {
        title: '',
        vendor: '',
        options: [],
        variants: [],
        body_html: '',
      },

      variant: {
        sku: '',
        barcode: '',
        weight: '',
        price: '',
        compare_at_price: '',
        inventory_management: '',
        inventory_quantity: '',
        metafields_global_harmonized_system_code: ''
      }
    }

    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onChangeVariant = this.onChangeVariant.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return true;
  }

  onChangeProduct(event) {
    const field = event.target.name;
    const product = this.state.product;
    product[field] = event.target.value;
    return this.setState({product: product});
  }

  onChangeVariant(event) {
    const field = event.target.name;
    const variant = this.state.variant;
    variant[field] = event.target.value;
    return this.setState({variant: variant});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.newProduct(this.state.product);
  }

  handleChange(i, event) {
    let values = [...this.state.values];
    values[i] = event.target.value;
  }

  createUI(){
    return this.state.values.map((el, i) => 
      <div key={i}>
        <input type="text" value={el || ''} onChange={this.handleChange.bind(this, i)} />
        <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
      </div>          
    )
  }

  addClick(){
    this.setState(prevState => ({ values: [...prevState.values, '']}))
  }

  removeClick(i){
     let values = [...this.state.values];
     values.splice(i,1);
     this.setState({ values });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} onSubmit={this.handleSubmit} autoComplete='off'>
          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='title'>Product's title</InputLabel>
            <Input
              name='title'
              label='title'
              onChange={this.onChangeProduct}
             />
          </FormControl>
          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='vendor'>Product's vendor</InputLabel>
            <Input
              name='vendor'
              label='vendor'
              onChange={this.onChangeProduct}
             />
          </FormControl>
          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='description'>Product's description</InputLabel>
            <Input
              rows={3}
              multiline={true}
              name='body_html'
              label='description'
              onChange={this.onChangeProduct}
             />
          </FormControl>
          <Divider />
          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='sku'>SKU (stock keeping unit)</InputLabel>
            <Input
              name='sku'
              label='sku'
              onChange={this.onChangeVariant}
             />
          </FormControl>
          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='barcode'>Barcode (ISBN, UPC, GTIN, etc.)</InputLabel>
            <Input
              name='barcode'
              label='barcode'
              onChange={this.onChangeVariant}
             />
          </FormControl>
          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='price'>Price</InputLabel>
            <Input
              name='price'
              label='price'
              onChange={this.onChangeVariant}
             />
          </FormControl>
          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='compare_at_price'>Compare at price</InputLabel>
            <Input
              name='compare_at_price'
              label='compare_at_price'
              onChange={this.onChangeVariant}
             />
          </FormControl>
          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='inventory_quantity'>Quantity</InputLabel>
            <Input
              name='inventory_quantity'
              label='inventory_quantity'
              onChange={this.onChangeVariant}
             />
          </FormControl>
          
          <Button
            size='large'
            type='submit'
            fullWidth
            variant='raised'
            color='primary'
            className={classes.submit}
          >
            Submit
          </Button>
        </form>

        {/*<form onSubmit={this.handleSubmit}>
          {this.createUI()}
          <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
          <input type="submit" value="Submit" />
        </form>*/}
      </div>
    );
  }
}

ProductForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const connectProductForm = compose(
  withStyles(styles),
  connect(null, { newProduct })
)(ProductForm);
export { connectProductForm as ProductForm };