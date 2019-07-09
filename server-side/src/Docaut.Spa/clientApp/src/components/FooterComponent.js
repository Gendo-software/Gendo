import React, { Component } from 'react'

export default class FooterComponent extends Component {
    render() {
        return (            
            <div>
                <div className="pt-3" />
                <footer className="footer">
                    <div className="container text-center">
                        <span className="text-muted">Broonx software © 2019 </span>
                    </div>
                </footer>
            </div>
        )
    }
}
