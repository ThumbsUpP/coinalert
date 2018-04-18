import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import fullCoinList from '../../../utils/fullCoinList'


const AutoCompleteCoin = (props) => (
    <AutoComplete
    hintText="Add to watchlist"
    filter={AutoComplete.fuzzyFilter}
    dataSource={Object.keys(fullCoinList)}
    maxSearchResults={5}
    listStyle = {{width : '163px'}}
    targetOrigin = {{ vertical: 'top', horizontal: 'left',}}
    onNewRequest = {props.onCoinAdd}
  />
);

export default AutoCompleteCoin;