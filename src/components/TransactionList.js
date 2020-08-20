import React, { Component } from "react";
import TransactionForm from "./TransactionForm";
import { connect } from "react-redux";
import * as actions from "../actions/transactionActions";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { bindActionCreators } from "redux";
// import ClassNames from "classnames";
import {
  Button,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  withStyles,
} from "@material-ui/core";
import { Table } from "@material-ui/core";
// import TransForm from "./TransForm";
import TransForm from "./TransForm";

const styles = (theme) => ({
  tabBorder: {
    border: "1px solid #e0e0e0",
  },
  table: {
    "& .MuiTable-root": {
      width: 850,
      margin: theme.spacing(1),
    },
    display: "flex",
    justifyContent: "center",
  },
  buttons: {
    textAlign: "center",
    marginLeft: "10px",
  },
});

class TransactionList extends Component {
  handleEdit = (index) => {
    this.props.updateTransactionIndex(index);
  };

  handleDelete = (index) => {
    this.props.deleteTransaction(index);
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        {/* <TransactionForm /> */}
        <TransForm />
        {/* <InputForm /> */}
        {/* <Login /> */}
        {/* <FormikTransactionApp /> */}
        <div className={classes.table}>
          <Table className={classes.tabBorder}>
            <TableHead>
              <TableRow>
                <TableCell>Account Number</TableCell>
                <TableCell align="center">A/C Holder Name&nbsp;</TableCell>
                <TableCell align="center">IFSC</TableCell>
                <TableCell align="center">Amount&nbsp;</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.list.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.bAccountNo}</TableCell>
                    <TableCell align="center">{item.bName}</TableCell>
                    <TableCell align="center">{item.iFSC}</TableCell>
                    <TableCell align="center">{item.amount}</TableCell>
                    <TableCell align="center" className={classes.buttons}>
                      <Button
                        color="primary"
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => {
                          this.handleEdit(index);
                        }}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        color="secondary"
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => this.handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateTransactionIndex: actions.updateIndex,
      deleteTransaction: actions.Delete,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(TransactionList));
