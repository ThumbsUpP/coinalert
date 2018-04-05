import React from 'react'
import { Input } from 'semantic-ui-react'

const InputIcon = (props) => (
  <Input icon='alarm' iconPosition='left' placeholder='alert price' onChange={props.changed} />
)

export default InputIcon