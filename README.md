# Salesforce Wizard Component

<img src="screenshots/create-account-flow.gif" alt="Flow Example"/>

````xml
<template>
    <lightning-wizard header="My Account Wizard" variant="base" current-step="step-1">
        <lightning-wizard-step label="Enter Account" name="step-1">
            <lightning-input label="Account Name"></lightning-input>
            <lightning-input label="Account Type"></lightning-input>
        </lightning-wizard-step>
        <lightning-wizard-step label="Add Contact" name="step-2" before-change={validate} hide-next-button="false">
            <lightning-input label="Name"></lightning-input>
            <lightning-input label="Title"></lightning-input>

            <lightning-button slot="actions" label="Skip" onclick={skipCreateContact}>
        </lightning-wizard-step>
        <template if:true={shouldSync}>
            <lightning-wizard-step label="Sync with another system" name="step-3">
            </lightning-wizard-step>
        </template>
    </lightning-wizard>
</template>
````

## About

This Web Component is a Web Component built from [Lightning Wizard](https://github.com/jmpisson/lightning-wizard) intended to use within a Lightning Web Component OSS Project.

It aims to provide a way to programatically build flows with Salesforce Flow styles and functionality, having full control of the wizard behavior in any scenario.

### Features

* Define wizard with Lightning Web components declaratively.
* Override standard Navigation buttons definining specific step actions.
* Customize flow using JavaScript function for step validation and post-processing.
* Modify the flow steps using standard LWC templates.


## Description
A `lightning-wizard` display a guided flow with multiple steps, only one is visible at a time. The progress is shown on the header along with a current step indicator.


## Usage

As referenced on last LWC RFC, include the npm reference within your `lwc.config.json` or directly on your `package.json`.

> At this moment, `lightning-wizard` does not work with native Shadow DOM. It requires Synthetic Shadow DOM. Import `@lwc/synthetic-shadow` before using the component.

_package.json example_
````
{
    "lwc": {
        "modules": [
            { 
                "npm": "lightning-wizard-oss" 
            }
        ]
    }
}
````
lwc.config.json example_
````
{
    "modules": [
        { 
            "npm": "lightning-wizard-oss" 
        }
    ]
}
````
Check the `examples` folder for implementation details.

## Specification

### lightning-wizard

#### Attributes

|       Name      |  Type  | Access | Required |  Default | Description                                                                                 |
|:---------------:|:------:|:------:|:--------:|:--------:|---------------------------------------------------------------------------------------------|
|      variant    | string | global |          |   base   | Wizard style. Valid values are base, base-shaded and path.                                  |
|  previous-label | string | global |          | Previous | Previous button label.                                                                      |
| next-label      | string | global |          | Next     | Next button label.                                                                          |
| finish-label    | string | global |          | Finish   | Finish button label.                                                                        |
|      header     | string | global |          |          | Header text shown on wizard. Leave blank for not displaying header.                         |
|  current-step   | string | global |          |          | Sets the current step of the wizard. Defaults to first lightning-wizard-step on the markup if null. |

#### Slots

|       Name      |  Description    |                                             
|:---------------:|:---------------:|
|      header     | Placeholder for wizard header. Overrides the header attribute set on the component.|
|      default     | Placeholder for lightning-wizard-step. Defines the wizard flow.|

#### Custom Events

##### change

The event fired when the wizard advances or goes back following the configured step flow. An external change by setting the attribute current-step does not emit this event.
 
The change event returns the following parameters.

|Parameter      |  Type  | Description |
|:------:|:--------:|:--------:|
| currentStep | string | The step name the wizard is moving to.|
| oldStep | string 	| The step name the wizard is moving from|

The change event properties are as follows.

|Property      |  Value  | Description|
|:------:|:--------:|:--------:|
|bubbles|false|This event does not bubble up through the DOM.|
|cancelable|false|This event has no default behavior that can be canceled. You can't call preventDefault() on this event.|
|composed|false|This event does not propagate outside of the component in which it was dispatched.|

##### complete

The event fired when the wizard finishes and the user clicks on Finish button.

The complete event properties are as follows.

|Property      |  Value  | Description |
|:------:|:--------:|:--------:|
|bubbles|false|This event does not bubble up through the DOM.|
|cancelable|false|This event has no default behavior that can be canceled. You can't call preventDefault() on this event.|
|composed|false|This event does not propagate outside of the component in which it was dispatched.|

### lightning-wizard-step

#### Attributes

|       Name      |  Type  | Access | Required |  Default | Description                                                                                 |
|:---------------:|:------:|:------:|:--------:|:--------:|---------------------------------------------------------------------------------------------|
|      name    | string | global |   true       |      | Step unique name. Identifies the step.                                  |
|  label | string | global |    true      |  | Step label shown on wizard progress.                                                                     |
| hide-previous-button     | Boolean | global |          | false     |Hides the Previous button on this step.                                                           |
| hide-next-button     | string | global |          | false   | Hides the Next/Finish button on this step.                                                                        |
| before-change     | function | global |          |    | Custom function to execute to perform post-processing action before advancing to the next step. It should return a promise with a true/false; if resolved with a falsy value, the wizard will mark the step as error and will not advance to the next step.

#### Slots

|       Name      |  Description    |                                             
|:---------------:|:---------------:|
|      actions     | Placeholder for actionable components on the step such as lightning-button. The components are positioned next to Next button. Overrides the header attribute set on the component.|
|      default     | Placeholder for step content.|