import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  main: {
    backgroundColor: 'pink',
    border: '3px solid teal',
    '& h1': {
      color: 'white'
    }
  },
  secondary: {
    backgroundColor: 'blue'
  }
};
function MiniPalette(props) {
  const { classes } = props;
  return (
    <div className={classes.main}>
      <h1>mini palette</h1>
      <section className={classes.secondary}>mini palette</section>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
