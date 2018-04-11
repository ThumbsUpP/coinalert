import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  container: {
    position: 'relative',
    display :'flex'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    backgroundColor: 'rgb(255, 255, 255, 0.1)',
    transform : 'none',
    left: '0',
    top: '200px'
  },
};

const Loading = () => (
  <div style={style.container}>
    <RefreshIndicator
      size={70}
      left={70}
      top={0}
      loadingColor="#52D3E7"
      status="loading"
      style={style.refresh}
    />
  </div>
);

export default Loading;