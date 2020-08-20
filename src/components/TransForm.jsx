import React from "react";
import { connect } from "react-redux";
import { withFormik, Form, Field, Formik } from "formik";
import { Button, TextField, withStyles } from "@material-ui/core";
import { bindActionCreators } from "redux";
import * as actions from "../actions/transactionActions";
import * as Yup from "yup";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 400,
    },
    textAlign: "center",
  },
});

class TransForm extends React.Component {
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

  //   const {
  //     values,
  //     touched,
  //     errors,
  //     dirty,
  //     isSubmitting,
  //     handleInputChange,
  //     handleBlur,
  //     handleSubmit,
  //     handleReset,
  //   } = props;
  validationSchema = Yup.object({
    iFSC: Yup.string("Enter IFSC").required("IFSC is required"),
    bName: Yup.string("Enter Name").required(" Name is required"),
    amount: Yup.string("Enter amount")
      .matches(/^[0-9]{3}$/, "Must be exactly 5 digits")
      .required("Enter your amount"),
    bAccountNo: Yup.string("Enter a name").required("Name is required"),
  });
  render() {
    const { insertTransaction, updateTransaction, classes } = this.props;
    return (
      <Formik
        initialValues={this.state}
        validationSchema={this.validationSchema}
        onSubmit={(values, actions) => {
          insertTransaction(values);
          updateTransaction(values);
        }}
        render={({
          values,
          touched,
          handleChange,
          handleBlur,
          errors,
          dirty,
          isSubmitting,
        }) => (
          <Form className={classes.root}>
            <div>
              <TextField
                variant="outlined"
                name="bAccountNo"
                label="Account Number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bAccountNo}
                helperText={touched.bAccountNo ? errors.bAccountNo : ""}
                error={touched.bAccountNo && Boolean(errors.bAccountNo)}
              />

              <TextField
                variant="outlined"
                name="iFSC"
                label="IFSC"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.iFSC}
                helperText={touched.iFSC ? errors.iFSC : ""}
                error={touched.iFSC && Boolean(errors.iFSC)}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                name="bName"
                label="A/C Holder Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bName}
                helperText={touched.bName ? errors.bName : ""}
                error={touched.bName && Boolean(errors.bName)}
              />

              <TextField
                variant="outlined"
                name="amount"
                label="Amount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amount}
                helperText={touched.amount ? errors.amount : ""}
                error={touched.amount && Boolean(errors.amount)}
              />
            </div>
            <br />
            <Button type="submit" color="secondary" variant="contained">
              Submit
            </Button>
          </Form>
        )}
      />
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
)(withStyles(styles, { withTheme: true })(TransForm));
