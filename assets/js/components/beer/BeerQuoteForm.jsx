import React from 'react';
import styled from 'styled-components';
import Formsy from 'formsy-react';
import { connect } from 'react-redux';
import { FormsyText } from 'formsy-material-ui/lib';
import _ from 'lodash';
import Spinner from 'react-spinkit';

import PartialBorderButton from '../based_style_components/PartialBorderButton';
import { submitQuote } from '../../actions/quote';

class BeerQuoteForm extends React.Component {
  state = { validationErrors : {} };

  invalidateInput = (form_data, resetForm, invalidateForm) => {
    const validationErrors = _(form_data).reduce((errors, elm, key) => {
      if (elm !== '' && elm !== undefined) return errors;
      errors[key] = 'This field is required';

      return errors;
    }, {});

    this.setState({ validationErrors });
  };

  submit = (form_data) => {
    const { beer, dispatch } = this.props;
    const quote = _.assign(form_data, {
      beer: {
        id: beer.id,
        name: beer.name,
      },
    });

    dispatch(submitQuote(quote));
  };

  renderQuoteButton() {
    return PartialBorderButton.extend`
      background: transparent;
      margin-top: 20px;

      & > span {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .sk-spinner {
        margin-left: 10px;
      }
    `;
  }

  renderQuoteFormHeading () {
    return styled.h2`
      font-family: "Josefin Slab", serif;
      font-size: 48px;
    `;
  }

  renderQuoteForm() {
    return styled.div`
      margin-top: 100px;
      margin-bottom: 100px;
      padding: 40px;
      background-color: #fcfbcf;
    `;
  }

  render() {
    const { validationErrors } = this.state;
    const {
      quote = {},
      isError,
      isSubmitting,
    } = this.props;

    // Reset form if not error or submitting
    const {
      first_name = '',
      last_name = '',
      email_address = '',
      phone_number = ''
    } = (!isError && !isSubmitting) ? {} : quote ;

    const isSubmitted = !_(quote).isEmpty() && !isError && !isSubmitting

    const BeerQuoteForm = this.renderQuoteForm();
    const BeerQuoteForm__Heading = this.renderQuoteFormHeading();
    const BeerQuoteButton = this.renderQuoteButton();

    const BeerQuoteForm__Class = isSubmitting ? "is-submitting" : "";

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-sm-12">
            <BeerQuoteForm id="quoteForm" className={BeerQuoteForm__Class}>
              <BeerQuoteForm__Heading className="text-center">
                Shout out what you drink
              </BeerQuoteForm__Heading>
              <Formsy.Form ref="form" onValidSubmit={this.submit} onInvalidSubmit={this.invalidateInput} validationErrors={validationErrors}>
                <div className="row">
                  <div className="col col-sm-6">
                    <FormsyText
                      fullWidth={true}
                      name="first_name"
                      value={first_name}
                      floatingLabelText="First name"
                      validations="isAlpha"
                      validationError="First name is not valid"
                      required
                    />
                  </div>
                  <div className="col col-sm-6">
                    <FormsyText
                      fullWidth={true}
                      name="last_name"
                      value={last_name}
                      floatingLabelText="Last name"
                      validations="isAlpha"
                      validationError="Last name is not valid"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col col-sm-6">
                    <FormsyText
                      fullWidth={true}
                      name="email_address"
                      value={email_address}
                      floatingLabelText="Email address"
                      validations={{
                        isEmail: true,
                      }}
                      validationError="This is not a valid email"
                      required
                    />
                  </div>
                  <div className="col col-sm-6">
                    <FormsyText
                      fullWidth={true}
                      name="phone_number"
                      value={phone_number}
                      floatingLabelText="Phone number"
                      validations={{
                        matchRegexp: /^0[0-9]{8}/
                      }}
                      validationError="This is not a valid phone number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col col-sm-12 text-center">
                    <BeerQuoteButton type="submit" formNoValidate>
                      <span>
                        Send the quote
                        { isSubmitting && <Spinner name="ball-grid-pulse" color="#edb62b" /> }
                      </span>
                    </BeerQuoteButton>
                  </div>
                </div>
              </Formsy.Form>
              {isSubmitted &&
                <div className="text-center">Your quote has been submitted successfully</div>
              }
            </BeerQuoteForm>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { quote } = state;

  return quote;
};

export default connect(mapStateToProps)(BeerQuoteForm);
