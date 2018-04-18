import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};



class CoinChip extends React.Component {

    render() {
        let chipToRender = null;
        if (this.props.sym === 'BTC') {
            chipToRender = (<Chip
                style={styles.chip}>
                <Avatar src={this.props.source} />
                {this.props.coin}
            </Chip>)
        } else {
            chipToRender = (<Chip
                onRequestDelete={() => this.props.onDeleteClick(this.props.sym)}
                style={styles.chip}>
                <Avatar src={this.props.source} />
                {this.props.coin}
            </Chip>)
        }
        return chipToRender
    }
}

export default CoinChip