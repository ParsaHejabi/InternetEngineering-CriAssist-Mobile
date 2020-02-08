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
  form(_id: $id){
    _id
    title
    fields{
      name
      title
      required
      type
      options{
        label
        value{
          __typename
          ... on FormFieldOptionValueText{
            textValue
          }
          ... on FormFieldOptionValueDate{
            dateValue
          }
          ... on FormFieldOptionValuePoint{
            lat
            long
          }
          ... on FormFieldOptionValueNumber{
            numberValue
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
