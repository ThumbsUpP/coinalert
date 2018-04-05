import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import  currenciesList from '../../assets/CurrenciesList'
// friendOptions = [
//   {
//     text: 'ETH',
//     value: 'Jenny Hess',
//     image: { avatar: true, src: '/assets/images/avatar/small/jenny.jpg' },
//   },
//  ...
// ]


const DropdownCurrency = (props) => (
  <Dropdown placeholder='Select Currency' fluid selection options={currenciesList} onChange={props.clicked} />
)
export default DropdownCurrency
