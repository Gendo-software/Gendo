import React, { Component } from 'react'

export default class MainView extends Component {

    componentDidMount(){
        document.title = "Home - Gendo"
    }
    render() {
        return (


            <div className="container mt-5">
                {/* <div class="alert alert-primary" role="alert">
A simple primary alert—check it out!
</div> */}
                {/* <div class="jumbotron">
<h1 class="display-4">Hello, world!</h1>
<p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
  featured content or information.</p>
<hr class="my-4">
<p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
<a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
</div> */}
                {/* Templates*/}
                <div className="row">
                    <div className="col offset-lg-2">
                        <h4>Templates</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-auto col-lg-5 offset-lg-2 mt-2">
                        <table className="table table-hover table-borderless tamplatesTable border">
                            <tbody>
                                <tr>
                                    <td> 1. Seeling Car</td>
                                    <td><button type="button" className="btn btn-outline-primary btn-sm px-md-3">Create</button></td>
                                </tr>
                                <tr>
                                    <td>2. Selling a flat</td>
                                    <td><button type="button" className="btn btn-outline-primary btn-sm px-md-3">Create</button></td>
                                </tr>
                                <tr>
                                    <td>3. Company starting</td>
                                    <td><button type="button" className="btn btn-outline-primary btn-sm px-md-3">Create</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Templates*/}
                <div className="mt-5 mb-5">
                    <div className="row">
                        <div className="col offset-lg-2">
                            <h4>My documents</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-auto col-lg-5 offset-lg-2 mt-2">
                            <div className="border py-3">
                                <table className="table table-hover table-borderless tamplatesTable my-0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                1. Volkswagen Passat
                <span className="d-block text-right border-top text-muted font-italic">Seeling Car</span>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-outline-primary btn-sm my-1 my-md-0 px-md-3">Open</button>{' '}
                                                <button type="button" className="btn btn-outline-danger btn-sm px-md-3"><b>×</b></button>{' '}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2. Opel Astra
                <span className="d-block text-right border-top text-muted font-italic">Seeling Car</span>
                                            </td>
                                            <td><button type="button" className="btn btn-outline-primary btn-sm px-md-3 my-1 my-md-0">Open</button>{' '}
                                                <button type="button" className="btn btn-outline-danger btn-sm px-md-3"><b>×</b></button>{' '}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3. BMW X5
                <span className="d-block text-right border-top text-muted font-italic">Seeling Car</span>
                                            </td>
                                            <td><button type="button" className="btn btn-outline-primary btn-sm px-md-3 my-1 my-md-0">Open</button>{' '}
                                                <button type="button" className="btn btn-outline-danger btn-sm px-md-3"><b>×</b></button>{' '}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
