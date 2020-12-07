import { LightningElement } from 'lwc';


export default class UserRegistrationWizard extends LightningElement {

    /**
     * Takes the filled form and registers a user
     * @author jmpisson
     */
    register() {

        // 1 - Get current form inputs
        let inputs = this.template.querySelectorAll('lightning-input');

        // 2 - Loop the input list and get every input value and assign it to the desired field
        //     The field name is set on every input dataset as the attribute "field"
        inputs.forEach(input => {
            user[input.dataset.fieldName] = input.value;
        });

        // 3 - Register the user on user/register endpoint
        fetch('/user/register', {
            method: 'POST',
            body: JSON.stringify(user)
        }).then( result => {
            // Do something
        }).catch(error => {
            // Handle errors
        });
    }

    /**
     * Validates the form, checking for lightning-input errors and
     * controlling that wizard should advance to the next step
     * 
     * @author jmpisson
     */
    validate() {
        // 1 - Takes all the inputs from the step - "this" is bind to wizard-step component
        const allValid = [...this.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputCmp) => {
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);

        // 2 - Returns true/false; if the validation were asynchronous, it should return a Promise instead
        return allValid;
    }
}