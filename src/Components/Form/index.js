import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const FormExample = () => (
  <Form inverted>
    <h2>Create Account</h2>
    <Form.Group widths="equal">
      <Form.Field>
        <input placeholder="First Name" />
      </Form.Field>
      <Form.Field>
        <input placeholder="Last Name" />
      </Form.Field>
    </Form.Group>
    <Form.Field>
      <input placeholder="Email Address" />
    </Form.Field>
    <Form.Field>
      <input placeholder="Password" />
    </Form.Field>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        Already have an account?&nbsp;&nbsp;&nbsp;
        <span style={{ color: 'orange', fontWeight: 'bolder' }}>Sign In</span>
      </div>
      <Button
        type="submit"
        style={{
          borderRadius: 20,
          backgroundColor: 'orange',
          color: 'white',
          fontWeight: 'bolder',
        }}>
        Create Account
      </Button>
    </div>
  </Form>
)

export default FormExample
