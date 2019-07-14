import React, { Component } from 'react'

import Section from '../components/CreateTemplate/SectionComponent';


export default class CreateTemplateView extends Component {

    componentDidMount(){        
        document.title = "Create template - Gendo"
        // var Main_simplemde = new SimpleMDE({ element: $("#main-text-area")[0] });
        // var Optional_1_simplemde = new SimpleMDE({ element: $("#aditional-1-text-area")[0] });

    }

    handleChange = value => {
        console.log(value);
        //this.setState({ mdeValue: value });
      };

      OptionalHandleChange = value => {
        console.log("*" + value);
      }


  render() {
    return (
        <div className="container mt-5">
        {/*Header*/}      
        <div className="row mb-5 align-items-center justify-content-center">
          <div className="col-md-5 col-12">
            <input type="text" className="form-control" placeholder="Template name" />
          </div>
        </div>

        <Section name="Main section" isOptional={false}></Section>

        <Section name="Optional Section:" isOptional={true}></Section>

        {/*Buttons*/}
        <div className="row my-5 text-right">
          <div className="col-10 mx-auto">
            <button type="button" className="btn btn-outline-primary btn-sm px-md-3">Save</button>{' '}
            <button type="button" className="btn btn-outline-danger btn-sm px-md-3">Exit</button>
          </div>
        </div>
      </div>      
    )
  }
}
