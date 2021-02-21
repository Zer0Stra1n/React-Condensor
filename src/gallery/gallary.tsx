import React from 'react';

export class Gallery extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        }
    }

    componentDidMount() {
        fetch('https://gtrtoph0d7.execute-api.us-east-1.amazonaws.com/dev/media')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
                }, error => {
                    this.setState({
                        error: error,
                        isLoaded: true
                    })
                }
            )
    }

    render () {
        return (
            <div>
                <input type="text"></input>
            </div>
        );
    }
}