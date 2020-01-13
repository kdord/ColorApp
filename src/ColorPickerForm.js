import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);

    this.state = { newColorName: '', currentColor: 'teal' };

    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddNewColor = this.handleAddNewColor.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }
  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex });
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  handleAddNewColor() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: '' });
  }

  render() {
    const { paletteIsFull, classes } = this.props;
    const { newColorName, currentColor } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={newColor => this.updateCurrentColor(newColor)}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleAddNewColor}>
          <TextValidator
            value={newColorName}
            className={classes.colorNameInput}
            name='newColorName'
            placeholder='Color Name'
            variant='filled'
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Enter a color name',
              'Color name must be unique',
              'Color already used'
            ]}
          />
          <Button
            style={{
              backgroundColor: paletteIsFull ? 'silver' : currentColor
            }}
            type='submit'
            variant='contained'
            color='primary'
            disabled={paletteIsFull}
            className={classes.addColor}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
