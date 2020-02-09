import {gql} from 'apollo-boost';

export const FORMS_LIST = gql(`
{
    forms {
      _id
      title
    }
}  
`);

export const FORM_DATA = gql(`
query FormData($id: ID!){
  form(_id: $id) {
    _id
    title
    fields {
      name
      title
      type
      required
      options {
        label
        value {
          ...on FormFieldOptionValueText {
            textValue
          }
          ...on FormFieldOptionValueNumber {
            numberValue
          }
          ...on FormFieldOptionValuePoint {
            pointValue {
              lat
              long
            }
          }
          ...on FormFieldOptionValueDate {
            dateValue
          }
        }
      }
    }
  }
}
`);

export const SUBMIT_FORM = gql(`
mutation CreateFormAnswer($formId: ID!, $value: JSONObject!) {
  createFormAnswer(formAnswerInput: {formId: $formId, value: $value}) {
    _id
    value
  }
}
`);
