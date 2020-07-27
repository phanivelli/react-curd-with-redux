import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/transactionActions";
import { bindActionCreators } from "redux";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 400,
    },
    textAlign: "center",
  },
});

class TransactionForm extends Component {
  state = {
    ...this.returnStateObject(),
  };

  returnStateObject() {
    if (this.props.currentIndex == -1)
      return {
        bAccountNo: "",
        iFSC: "",
        bName: "",
        amount: "",
      };
    else return this.props.list[this.props.currentIndex];
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentIndex != this.props.currentIndex ||
      prevProps.list.length != this.props.list.length
    ) {
      this.setState({ ...this.returnStateObject() });
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.currentIndex == -1) this.props.insertTransaction(this.state);
    else this.props.updateTransaction(this.state);
  };
  render() {
    const { classes } = this.props;
    return (
      <form
        className={classes.root}
        onSubmit={this.handleSubmit}
        autoComplete="off"
      >
        <div>
          <TextField
            variant="outlined"
            name="bAccountNo"
            label="Account Number"
            onChange={this.handleInputChange}
            value={this.state.bAccountNo}
          />

          <TextField
            variant="outlined"
            name="iFSC"
            label="IFSC"
            onChange={this.handleInputChange}
            value={this.state.iFSC}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            name="bName"
            label="A/C Holder Name"
            onChange={this.handleInputChange}
            value={this.state.bName}
          />

          <TextField
            variant="outlined"
            name="amount"
            label="Amount"
            onChange={this.handleInputChange}
            value={this.state.amount}
          />
        </div>
        <br />
        <Button type="submit" color="secondary" variant="contained">
          Submit
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
    currentIndex: state.currentIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      insertTransaction: actions.insert,
      updateTransaction: actions.update,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(TransactionForm));
