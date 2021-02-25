import React, { Component } from 'react';
// import { companies } from './fake-data';
import { loadCompany } from './requests';
import { JobList } from './JobList';

export class CompanyDetail extends Component {
    constructor(props) {
        super(props);
        const { companyId } = this.props.match.params;
        this.state = { company: null };
    }

    async componentDidMount() {
        const { companyId } = this.props.match.params;
        const company = await loadCompany(companyId);

        this.setState({ company });
    }

    render() {
        const { company } = this.state;

        if (!company) {
            return null;
        }

        return ( <
            div >
            <
            h1 className = "title" > { company.name } < /h1> <
            div className = "box" > { company.description } < /div> <
            h4 className = "title is-4" > Jobs at { company.name } < /h4>   <
            JobList jobs = { company.jobs }
            /> < /
            div >
        );
    }
}